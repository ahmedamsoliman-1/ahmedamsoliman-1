import React from "react";
import ProjectsItem from "./CertificationsItem";

import Architect from "../assets/1_AWS Solutions Architect.png";
import Practitioner from "../assets/2_AWS Cloud Practitioner.png";
import object from "../assets/3_AWS Object Storage.png";
import AWSArchitecting from "../assets/4_AWS Architecting.png";
import data from "../assets/5_AWS Data Protection & Disaster Recovery.png";

const Projects = () => {
  return (
    <div
      id="certifications"
      className="max-w-[1040px] m-auto md:pl-20 p-4 py-16"
    >
      <h1 className="text-4xl font-bold text-center text-[#001b5e] py-4">
        Certifications
      </h1>
      {/* <p className="text-center py-4">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe
        similique sapiente minus! Odio ut tenetur facere quia fugiat possimus
        dicta totam voluptatum dolores temporibus? Dolore, debitis? Alias error
        delectus commodi?
      </p> */}
      <div className="grid sm:grid-cols-2 gap-12">
        <ProjectsItem img={Architect} title="Solutions Architect" />
        <ProjectsItem img={Practitioner} title="Cloud Practitioner" />
        <ProjectsItem img={object} title="AWS Object Storage" />
        <ProjectsItem img={AWSArchitecting} title="AWS Architecting" />
        <ProjectsItem img={data} title="Data Protection & Disaster Recovery" />
      </div>
    </div>
  );
};

export default Projects;
