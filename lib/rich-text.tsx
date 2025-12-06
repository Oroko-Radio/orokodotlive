import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Block, Inline, BLOCKS, INLINES } from "@contentful/rich-text-types";
import { Asset, Content, Entry } from "@/types/shared";
import ImageBlock from "@/components/ImageBlock";

const getAssetById = (id: string, assets: Asset[]) =>
  assets.filter((asset) => asset.sys.id === id).pop();

const getEntryById = (id: string, entries: Entry[]) =>
  entries.filter((entry) => entry.sys.id === id).pop();

export function renderPayloadRichText(data: SerializedEditorState) {
  return <RichText data={data} />;
}

export function renderRichTextWithImages(content: Content) {
  if (content.links) {
    const blockAssets = content.links.assets?.block || [];
    const entryAssets = content.links.entries?.block || [];

    return documentToReactComponents(content.json, {
      renderNode: {
        [INLINES.HYPERLINK]: function InlineHyperlink(
          node: Block | Inline,
          children,
        ) {
          const uri = node.data.uri as string;

          if (uri.includes("mixcloud.com/widget")) {
            return <iframe width="100%" height="120" src={uri} />;
          }

          if (uri.includes("oroko.live")) {
            return (
              <Link href={uri.replace("https://oroko.live", "")}>
                {children}
              </Link>
            );
          }

          return (
            <a target="_blank" rel="noopener nofollow noreferrer" href={uri}>
              {children}
            </a>
          );
        },
        [BLOCKS.EMBEDDED_ASSET]: function EmbeddedAsset(node: Block | Inline) {
          const id = node.data.target.sys.id;

          const asset = getAssetById(id, blockAssets);

          if (asset?.contentType.includes("image")) {
            return (
              <div className="mb-6">
                <Image
                  quality={50}
                  src={asset.url}
                  alt={asset.title}
                  width={asset.width}
                  height={asset.height}
                  layout="responsive"
                />
              </div>
            );
          }

          if (asset?.contentType.includes("video")) {
            return <video src={asset.url} autoPlay muted loop />;
          }

          return null;
        },
        [BLOCKS.EMBEDDED_ENTRY]: (node: Block | Inline) => {
          const entry = getEntryById(node.data.target.sys.id, entryAssets);

          if (entry && entry.__typename === "YouTubeEmbed" && entry.shareLink) {
            return (
              <div className="youtube-iframe-container">
                <iframe
                  src={`https://www.youtube.com/embed/${entry.shareLink.slice(
                    -11,
                  )}`}
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                />
              </div>
            );
          }

          if (entry?.__typename === "ImageBlock") {
            return <ImageBlock images={entry.imagesCollection?.items || []} />;
          }
        },
      },
    });
  }

  return documentToReactComponents(content.json);
}
