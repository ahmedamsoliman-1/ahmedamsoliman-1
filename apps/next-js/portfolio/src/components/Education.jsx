import React from "react";
import WorkItem from "./EducationItem";

const data = [
  {
    year: 2009,
    title: "BS.c of Computer Engineering",
    univeristy: "Omdurman Ahlia University",
    location: "Omdurman Sudan",
  },
];

const Work = () => {
  return (
    <div id="education" className="max-w-[1240px] m-auto md:pl-20 p-4 py-16">
      <h1 className="text-4xl font-bold text-center text-[#001b5e]">
        {" "}
        Education
      </h1>
      {data.map((item, idx) => (
        <WorkItem
          key={idx}
          year={item.year}
          title={item.title}
          univeristy={item.univeristy}
          location={item.location}
        />
      ))}
    </div>
  );
};

export default Work;
