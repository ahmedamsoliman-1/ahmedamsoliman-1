import React from "react";
import WorkItem from "./WorkItem";

const data = [
  {
    year: 2019,
    title: "Senior Software developer",
    duration: "3 year",
    details:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod nisl at dui tincidunt, at ullamcorper est aliquam. Sed eget nisl nec nisl tincidunt viverra. Sed eget nisl nec lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod nisl at dui tincidunt, at ullamcorper est aliquam. Sed eget nisl nec nisl tincidunt viverra. Sed eget nisl neclorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod nisl at dui tincidunt, at ullamcorper est aliquam. Sed eget nisl nec nisl tincidunt viverra. Sed eget nisl nec",
  },
  {
    year: 2023,
    title: "Senior Software developer",
    duration: "1 year",
    details:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut euismod nisl at dui tincidunt, at ullamcorper est aliquam. Sed eget nisl nec nisl tincidunt viverra. Sed eget nisl nec",
  }
];

const Work = () => {
  return (
    <div id="work" className="max-w-[1240px] m-auto md:pl-20 p-4 py-16">
      <h1 className="text-4xl font-bold text-center text-[#001b5e]"> Work</h1>
      {data.map((item, idx) => (
        <WorkItem
          key={idx}
          year={item.year}
          title={item.title}
          duration={item.duration}
          details={item.details}
        />
      ))}
    </div>
  );
};

export default Work;
