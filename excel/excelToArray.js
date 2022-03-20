import Excel from "exceljs";
import { toast } from "react-toastify";

export const excelFileToArray = (file, setDisabled) => {
  return new Promise((resolve, reject) => {
    const workbook = new Excel.Workbook();
    const data = [];
    workbook.xlsx.load(file).then(function() {
      const worksheet = workbook.getWorksheet(1);
      if (!worksheet) return toast.warning("Sheet name does not match");
      const firstRowValues = tranformToCamelCase(worksheet.getRow(1).values);

      worksheet.eachRow((row, rowIndex) => {
        if (rowIndex !== 1) {
          data.push(createObject(firstRowValues, row.values));
        }
      });
      resolve(JSON.parse(JSON.stringify(data)));
    }).catch((err) => {
      setDisabled && setDisabled(false)
      toast.warning("Something went wrong")
    });
  });
};
export const excelFileToJSON = (file) => {
  return JSON.parse(excelFileToArray(file));
};

function createObject(keys, values) {
  let obj = {};
  for (let index = 0; index < keys.length; index++) {
    // eslint-disable-next-line eqeqeq
    if (keys[index] != null && keys[index] != undefined) {
      obj[keys[index]] = values[index];
    }
  }
  return obj;
}


function tranformToCamelCase (arr) {
    return arr.map(item=>item?.split(" ").map((a,i)=> i === 0 ? a?.toLowerCase(): a[0]?.toUpperCase() + a?.slice(1)?.toLowerCase()).join(""))
}
