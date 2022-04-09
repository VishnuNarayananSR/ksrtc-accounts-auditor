const XLSX = require("xlsx");

const readExcel = (file) =>
  new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function (e) {
      let data = e.target.result;
      const workbook = XLSX.read(data, {
        type: "binary",
      });

      resolve(workbook);
    };
    reader.onerror = () => {
      reject(new Error("Unable to read file!"));
    };
  });

const getSheetByIndex = (cellData, workbook) => {
  const sheetNames = workbook.SheetNames;
  const index =
    cellData.sheetIndex < 0 ? sheetNames.length - 1 : cellData.sheetIndex;
  return workbook.Sheets[sheetNames[index]];
};

const getValueByHeader = (cellData, workbook, header) => {
  const worksheet = getSheetByIndex(cellData, workbook);
  return worksheet[cellData["total"][header]].v;
};
export {
  readExcel,
  getValueByHeader,
};
