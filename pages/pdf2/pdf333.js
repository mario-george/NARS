import React from "react";
import ReactToPdf from "react-to-pdf";
import html2canvas from "html2canvas";

class CustomReactToPdf extends ReactToPdf {
  toPdf() {
    const { targetRef, filename, x, y, options, onComplete } = this.props;
    const source = targetRef || this.targetRef;
    const targetComponent = source.current || source;

    if (!targetComponent) {
      throw new Error("Target ref must be used or informed.");
    }

    return html2canvas(targetComponent, {
      logging: false,
      useCORS: true,
      scale: this.props.scale,
    })
      .then((canvas) => {
        // canvas  dras image
        const resizedCanvas = document.createElement("canvas");
        const resizedContext = resizedCanvas.getContext("2d");



        const maxWidth = 1200;
        const maxHeight = 1200;
        let newWidth = canvas.width;
        let newHeight = canvas.height;

        //  if   needs   resized
        if (newWidth > maxWidth || newHeight > maxHeight) {
          // ca;c new dimensions  preserg  aspect rate
          const ratio = Math.min(maxWidth / newWidth, maxHeight / newHeight);
          newWidth *= ratio;
          newHeight *= ratio;

          // new dimensions
          resizedCanvas.width = newWidth;
          resizedCanvas.height = newHeight;

          resizedContext.drawImage(canvas, 0, 0, newWidth, newHeight);
        } else {
          // original dimensions if does not need to be resized
          resizedCanvas.width = canvas.width;
          resizedCanvas.height = canvas.height;
          resizedContext.drawImage(canvas, 0, 0);
        }

        const resizedBlob = new Promise((resolve) => {
          resizedCanvas.toBlob((blob) => {
            resolve(blob);
          }, "image/jpeg", 1); //   adjust jgp quality here
        });

        return resizedBlob;
      })
      .then((blob) => {
        if (onComplete) {
          onComplete();
        }

        //   Blob 
        return blob;
      });
  }
}

export default CustomReactToPdf;
