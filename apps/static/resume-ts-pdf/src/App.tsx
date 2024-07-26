import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "./App.css";

// Initialize pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const App: React.FC = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () =>
    setPageNumber((prevPageNumber) =>
      prevPageNumber - 1 <= 1 ? 1 : prevPageNumber - 1
    );

  const goToNextPage = () =>
    setPageNumber((prevPageNumber) =>
      prevPageNumber + 1 >= (numPages || 1) ? (numPages || 1) : prevPageNumber + 1
    );

  return (
    <div className="page">
      <nav>
        <button onClick={goToPrevPage} className="previous">
          Prev
        </button>
        <button onClick={goToNextPage} className="next">
          Next
        </button>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </nav>

      <Document
        file="ahmedalimsoliman-ts-en.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>


    </div>
  );
};

export default App;
