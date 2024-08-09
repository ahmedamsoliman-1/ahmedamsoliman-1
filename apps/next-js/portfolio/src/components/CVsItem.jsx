import React from "react";

const CVsItem = ({ img, title, pdf }) => {
  return (
    <div className="shadow-md rounded-lg overflow-hidden">
      <img src={img} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <div className="flex justify-between items-center">
          <a
            href={pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            View
          </a>
          <a
            href={pdf}
            download
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
};

export default CVsItem;
