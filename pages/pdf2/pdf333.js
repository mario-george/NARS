import React from "react";
import ReactToPdf from "react-to-pdf";
import html2canvas from 'html2canvas';

class CustomReactToPdf extends ReactToPdf {
  toPdf() {
    const { targetRef, filename, x, y, options, onComplete } = this.props;
    const source = targetRef || this.targetRef;
    const targetComponent = source.current || source;

    if (!targetComponent) {
      throw new Error(
        "Target ref must be used or informed. See https://github.com/ivmarcos/react-to-pdf#usage."
      );
    }

    return html2canvas(targetComponent, {
      logging: false,
      useCORS: true,
      scale: this.props.scale
    }).then((canvas) => {
      const imgData = canvas.toDataURL();

      // Get image data as ArrayBuffer
      return fetch(imgData).then((response) => {
      console.log(response)

        return response.arrayBuffer();
      });
    }).then((arrayBuffer) => {
      // Create Blob from ArrayBuffer
      const blob = new Blob([arrayBuffer], { type: "application/pdf" });

      // Call onComplete callback, if provided
      if (onComplete) {
        onComplete();
      }
      console.log(blob)

      // Return the Blob object
      return blob;
    });
  }
}

export default CustomReactToPdf;
