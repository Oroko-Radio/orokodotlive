import React from "react";
import Slider from "../components/Slider";

const FeaturedArticles = ({ featuredArticles }) => {
  return (
    <>
      <div className="overflow-hidden">
        <h1 className="font-serif text-6xl m-8">Featured News</h1>

        <Slider>
          {featuredArticles.map((article, idx) => (
            <Slider.Card key={idx} idx={idx} data={article}>
              item1
            </Slider.Card>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default FeaturedArticles;
