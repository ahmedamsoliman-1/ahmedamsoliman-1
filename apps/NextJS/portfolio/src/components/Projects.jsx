import React from "react";
import ProjectsItem from "./ProjectsItem";

import cv from "../assets/cv.jpg";
import hound from "../assets/hound.jpg";
import personal from "../assets/personal.jpg";
import youtube from "../assets/youtube.jpg";
import linktree from "../assets/linktree.jpg";
import fluid from "../assets/fluid.jpg";

const Projects = () => {
  return (
    <div id="projects" className="max-w-[1040px] m-auto md:pl-20 p-4 py-16">
      <h1 className="text-4xl font-bold text-center text-[#001b5e]">
        Projects
      </h1>
      <p className="text-center py-4">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe
        similique sapiente minus! Odio ut tenetur facere quia fugiat possimus
        dicta totam voluptatum dolores temporibus? Dolore, debitis? Alias error
        delectus commodi?
      </p>
      <div className="grid sm:grid-cols-2 gap-12">
        <ProjectsItem img={cv} title="CV" />
        <ProjectsItem img={hound} title="Houndify" />
        <ProjectsItem img={personal} title="Personal Website" />
        <ProjectsItem img={youtube} title="Youtube-Clone" />
        <ProjectsItem img={linktree} title="Linktree" />
        <ProjectsItem img={fluid} title="Fluid Gallery" />
      </div>
    </div>
  );
};

export default Projects;
