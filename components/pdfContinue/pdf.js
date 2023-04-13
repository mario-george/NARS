/* eslint-disable jsx-a11y/alt-text */
import { CourseData } from "@/components/courseSpecsPdf/part1";

import { Document, Page, PDFViewer, StyleSheet } from "@react-pdf/renderer";
import { useState, useEffect } from "react";
import { createTw } from "react-pdf-tailwind";



const PDF = ({ pdfBlob }) => {
  return (
    <Document
      style={{ width: "1000px" }}
      width={1000}
      height={2000}
      className="bg-red-500 w-full"
      scale={2}
      file={{ blob: pdfBlob }}
      onLoadSuccess={onDocumentLoadSuccess}
      onError={console.error}
    >
      <Page pageNumber={1} />
    </Document>
  );
};
const PDFView = () => {
  // const [client, setClient] = useState(false);

  // useEffect(() => {
  //   setClient(true);
  // }, []);

  return (
    <PDFViewer style={{ width: "85vw", height: "85vw" }}>
      <PDF />
    </PDFViewer>
  );
};
export default PDFView;
