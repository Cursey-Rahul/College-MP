import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?worker";

pdfjsLib.GlobalWorkerOptions.workerPort = new pdfWorker();

export const extractTextFromPDF = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const typedArray = new Uint8Array(reader.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;

        let textContent = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const text = await page.getTextContent();

          textContent += text.items.map((item) => item.str).join(" ") + "\n\n";
        }

        resolve(textContent);
      } catch (err) {
        reject(err);
      }
    };

    reader.readAsArrayBuffer(file);
  });
};
