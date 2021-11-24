import { InferGetStaticPropsType } from 'next';
import Image from "next/image"
import React from 'react'
import { getNewsPage } from '../../lib/contentful/pages/news';

export async function getStaticProps({ preview = false }) {
    return {
      props: { preview, ...(await getNewsPage(preview)) },
      revalidate: 60,
    };
  }

  export default function NewsPage({
    articles,
    featuredArticles,
    preview,
  }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
      <div>
          {articles.map(({title, author, coverImage, slug}) => (
              <div key={slug} className="m-8">

                  <h1>{title}</h1>
                  <h2 className="mb-4">{author?.name}</h2>
                  <Image src={coverImage.url} alt={title} objectFit="cover" width="200" height="200" />
              </div>
          ))}
      </div>
    );
  }
  
