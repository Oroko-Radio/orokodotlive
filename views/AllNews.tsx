import React from "react";
import Card from "../components/Card";

const AllNews = ({ articles }) => {
  return (
    <>
      <h1 className="font-serif text-6xl m-8">All News</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 m-8">
        {articles.map((article, idx) => (
          <div key={idx} className="border-black border-2">
            <Card data={article} />
          </div>
        ))}
      </div>
    </>
  );
};

export default AllNews;
