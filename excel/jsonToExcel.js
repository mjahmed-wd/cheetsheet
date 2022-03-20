import { createFile } from "./index";
export const generateJsonToExcel = (header, data, fileName) => {
  const headerMap = new Map();
  header.forEach((head) => {
    headerMap.set(head.key, head);
  });
  

  const newData = [];
  data.forEach((item, index) => {
    newData[index] = [];
    header.forEach((head) => {
      head["border"] = "all #000000 thin";
      head["bold"] = true;
      head["fontSize"] = 11;
      newData[index].push({
        text: item[head?.key],
        textFormat: head?.textFormat,
        alignment: head?.alignment,
        border: head?.border,
      });
    });
  });
  createFile({
    name: fileName ? fileName : "excel",
    creator: "ibos.io",
    sheets: [
      {
        name: "sheet-1",
        gridLine: false,
        rows: [header, ...newData],
      },
    ],
  });
};
