import { getPayload } from "payload";
import config from "@payload-config";
import exportData from "../contentful-data/export.json" with { type: "json" };
import fs from "fs";

const LIMIT = 5000; // Start with 1 for testing
const PROGRESS_FILE = "./progress-fix-pages-hyperlinks.json";

// Get all page entries from Contentful data
const pageEntries = exportData.entries.filter(
  (entry) => entry.sys?.contentType?.sys?.id === "page",
);

console.log(`Found ${pageEntries.length} page entries in Contentful data`);

function loadProgress() {
  try {
    if (fs.existsSync(PROGRESS_FILE)) {
      return JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf-8"));
    }
  } catch (error) {
    console.log("No progress file found, starting from beginning");
  }
  return {
    processedCount: 0,
    successful: 0,
    failed: 0,
    skipped: 0,
    failedIds: [],
  };
}

function saveProgress(progress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

// Extract all hyperlinks from Contentful rich text recursively
function extractHyperlinksFromContentful(node, links = []) {
  if (!node) return links;

  if (node.nodeType === "hyperlink" && node.data?.uri) {
    const linkText = extractTextFromNode(node);
    links.push({
      text: linkText,
      url: node.data.uri,
    });
  }

  if (node.content && Array.isArray(node.content)) {
    for (const child of node.content) {
      extractHyperlinksFromContentful(child, links);
    }
  }

  return links;
}

// Extract text from a node and its children
function extractTextFromNode(node) {
  if (node.nodeType === "text") {
    return node.value || "";
  }

  if (node.content && Array.isArray(node.content)) {
    return node.content.map((child) => extractTextFromNode(child)).join("");
  }

  return "";
}

// Fix broken links in Lexical content
function fixLinksInLexicalContent(lexicalContent, contentfulLinks) {
  if (!lexicalContent || !lexicalContent.root) return lexicalContent;

  let fixedCount = 0;

  // Recursive function to process nodes
  function processNode(node) {
    if (!node) return;

    // Check if this is a link node with broken URL
    if (node.type === "link" && node.fields?.url === "https") {
      // Extract the text from the link's children
      const linkText = extractLexicalNodeText(node);

      // Find matching link in Contentful data
      const matchingLink = contentfulLinks.find((link) => {
        // Try exact match first
        if (link.text === linkText) return true;
        // Try trimmed match
        if (link.text.trim() === linkText.trim()) return true;
        // Try partial match for cases where text might be slightly different
        if (linkText && link.text.includes(linkText)) return true;
        if (linkText && linkText.includes(link.text)) return true;
        // Check if the link text contains the URL (common pattern)
        if (link.url && linkText.includes(link.url)) return true;
        return false;
      });

      if (matchingLink) {
        console.log(`  ✓ Fixed link: "${linkText}" -> ${matchingLink.url}`);
        node.fields.url = matchingLink.url;
        fixedCount++;
      } else {
        console.log(`  ⚠ Could not find match for link: "${linkText}"`);
      }
    }

    // Process children recursively
    if (node.children && Array.isArray(node.children)) {
      for (const child of node.children) {
        processNode(child);
      }
    }
  }

  // Start processing from root
  processNode(lexicalContent.root);

  console.log(`  Fixed ${fixedCount} links in this page`);
  return lexicalContent;
}

// Extract text from Lexical node
function extractLexicalNodeText(node) {
  if (!node) return "";

  if (node.text) {
    return node.text;
  }

  if (node.children && Array.isArray(node.children)) {
    return node.children.map((child) => extractLexicalNodeText(child)).join("");
  }

  return "";
}

async function fixPageHyperlinks() {
  const payload = await getPayload({ config });
  const progress = loadProgress();

  console.log("Querying pages with contentfulId...");

  // Query pages that have a contentfulId, sorted by ID ascending
  const pages = await payload.find({
    collection: "pages",
    where: {
      contentfulId: {
        exists: true,
      },
    },
    limit: LIMIT,
    sort: "id",
    depth: 0, // We don't need relationships
  });

  console.log(
    `Found ${pages.docs.length} pages to process (Total: ${pages.totalDocs})`,
  );

  for (const page of pages.docs) {
    console.log(
      `\nProcessing page: ${page.title} (ID: ${page.id}, Contentful: ${page.contentfulId})`,
    );

    try {
      // Find the corresponding Contentful entry
      const contentfulEntry = pageEntries.find(
        (entry) => entry.sys.id === page.contentfulId,
      );

      if (!contentfulEntry) {
        console.log(
          `  ⚠ Contentful entry not found for ID: ${page.contentfulId}`,
        );
        progress.skipped++;
        continue;
      }

      // Extract hyperlinks from Contentful content
      const contentfulContent = contentfulEntry.fields?.content?.["en-US"];
      if (!contentfulContent) {
        console.log(`  ⚠ No content field in Contentful data`);
        progress.skipped++;
        continue;
      }

      const contentfulLinks =
        extractHyperlinksFromContentful(contentfulContent);
      console.log(`  Found ${contentfulLinks.length} links in Contentful data`);

      if (contentfulLinks.length === 0) {
        console.log(`  ℹ No links to fix`);
        progress.skipped++;
        continue;
      }

      // Log the links we found for debugging
      contentfulLinks.forEach((link) => {
        console.log(`    - "${link.text}" -> ${link.url}`);
      });

      // Check if the page has content to fix
      if (!page.content) {
        console.log(`  ⚠ Page has no content field`);
        progress.skipped++;
        continue;
      }

      // Fix the links in the Lexical content
      const fixedContent = fixLinksInLexicalContent(
        page.content,
        contentfulLinks,
      );

      // Update the page with fixed content
      await payload.update({
        collection: "pages",
        id: page.id,
        data: {
          content: fixedContent,
        },
      });

      progress.successful++;
      console.log(`  ✅ Successfully updated page: ${page.title}`);
    } catch (error) {
      progress.failed++;
      progress.failedIds.push(page.contentfulId);
      console.error(`  ❌ Error processing page ${page.title}:`, error.message);
    }

    progress.processedCount++;
  }

  saveProgress(progress);

  console.log("\n=== Summary ===");
  console.log(`Processed: ${progress.processedCount} pages`);
  console.log(`Successful: ${progress.successful}`);
  console.log(`Failed: ${progress.failed}`);
  console.log(`Skipped: ${progress.skipped}`);

  if (progress.failedIds.length > 0) {
    console.log(`Failed IDs: ${progress.failedIds.join(", ")}`);
  }

  if (LIMIT === 1) {
    console.log(
      "\n🔍 Test run complete! Check the first page to verify the fix worked.",
    );
    console.log(
      "If successful, change LIMIT in the script to process all pages.",
    );
  }

  process.exit(0);
}

await fixPageHyperlinks().catch(console.error);