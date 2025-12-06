import Image from "next/legacy/image";
import NextImage from "next/image";
import Link from "next/link";
import React from "react";
import {
  RichText,
  type JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import type {
  DefaultNodeTypes,
  SerializedBlockNode,
} from "@payloadcms/richtext-lexical";
import cn from "classnames";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Block, Inline, BLOCKS, INLINES } from "@contentful/rich-text-types";
import { Asset, Content, Entry } from "@/types/shared";
import ImageBlock from "@/components/ImageBlock";
import type { Media } from "@/payload-types";

const getAssetById = (id: string, assets: Asset[]) =>
  assets.filter((asset) => asset.sys.id === id).pop();

const getEntryById = (id: string, entries: Entry[]) =>
  entries.filter((entry) => entry.sys.id === id).pop();

// Type for the ImageGrid block embedded in rich text
type ImageGridBlockData = {
  images?: Array<{
    image: Media | number;
    id?: string | null;
  }> | null;
  blockType: "imageGrid";
};

// Type for nodes including our custom block
type NodeTypes = DefaultNodeTypes | SerializedBlockNode<ImageGridBlockData>;

// Component for rendering the image grid from Payload
function PayloadImageGridBlock({ data }: { data: ImageGridBlockData }) {
  const images = data.images || [];
  if (images.length === 0) return null;

  const isFourLayout = images.length === 4;

  return (
    <section
      className={cn("image-block grid grid-cols-2 pb-6", {
        "md:grid-cols-3": !isFourLayout,
      })}
    >
      {images.map((item, idx) => {
        const image = typeof item.image === "object" ? item.image : null;
        if (!image) return null;

        const imageUrl = image.sizes?.["small-full"]?.url || image.url;

        if (isFourLayout) {
          return (
            <NextImage
              key={image.id ?? idx}
              className={cn(
                "object-cover h-full w-full border-black border-t-2",
                {
                  "md:border-b-2": idx >= 2,
                  "border-b-2": idx >= 2,
                  "border-r-2": idx % 2 === 0,
                },
              )}
              src={imageUrl || ""}
              alt={image.title || ""}
              width={image.width || 600}
              height={image.height || 400}
            />
          );
        }

        return (
          <NextImage
            key={image.id ?? idx}
            className={cn(
              "object-cover h-full w-full border-black border-t-2",
              {
                "border-b-2": idx >= 4,
                "md:border-b-2": idx >= 3,
                "border-r-2 md:border-r-0": idx % 2 === 0,
                "md:border-l-2": idx !== 0 && idx !== 3,
              },
            )}
            src={imageUrl || ""}
            alt={image.title || ""}
            width={image.width || 600}
            height={image.height || 400}
          />
        );
      })}
    </section>
  );
}

// Custom JSX converters for Payload rich text
const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  blocks: {
    imageGrid: ({ node }) => <PayloadImageGridBlock data={node.fields} />,
  },
});

export function renderPayloadRichText(data: SerializedEditorState) {
  return (
    <RichText
      className="activation-content"
      data={data}
      converters={jsxConverters}
    />
  );
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
