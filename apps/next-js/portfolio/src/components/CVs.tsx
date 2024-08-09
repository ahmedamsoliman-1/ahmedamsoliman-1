import React from "react";
import CVsItem from "./CVsItem";

import cv1Thumbnail from "../assets/cv/cv1-thumbnail.jpg";

import data from "../assets/cv/ahmedalimsoliman-data-en.pdf";
import dev from "../assets/cv/ahmedalimsoliman-dev-en.pdf";
import devops from "../assets/cv/ahmedalimsoliman-devops-en.pdf";
import ts from "../assets/cv/ahmedalimsoliman-ts-en.pdf";

const CVs = () => {
  const cvItems = [
    { img: cv1Thumbnail, title: "ahmedalimsoliman-data-en", pdf: data },
    { img: cv1Thumbnail, title: "ahmedalimsoliman-dev-en", pdf: dev },
    { img: cv1Thumbnail, title: "ahmedalimsoliman-devops-en", pdf: devops },
    { img: cv1Thumbnail, title: "ahmedalimsoliman-ts-en", pdf: ts },
  ];

  return (
    <div id="cvs" className="max-w-[1040px] m-auto md:pl-20 p-4 py-16">
      <h1 className="text-4xl font-bold text-center text-[#001b5e]">
        CVs
      </h1>
      <p className="text-center py-4">
        Browse through the CVs below. Click on a CV to view it or download it directly.
      </p>
      <div className="grid sm:grid-cols-2 gap-12">
        {cvItems.map((item, index) => (
          <CVsItem key={index} img={item.img} title={item.title} pdf={item.pdf} />
        ))}
      </div>
    </div>
  );
};

export default CVs;
