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

const getBusRemttd = (cellData, workbook) => {
  const worksheet = getSheetByIndex(cellData, workbook);
  return worksheet[cellData["total"]["Buses Remitted"]].v;
};
const getCollection = (cellData, workbook) => {
  const worksheet = getSheetByIndex(cellData, workbook);
  return worksheet[cellData["total"]["COLLECTION"]].v;
};
const getOptedKM = (cellData, workbook) => {
  const worksheet = getSheetByIndex(cellData, workbook);
  return worksheet[cellData["total"]["OPTED KM"]].v;
};
const getDieselConsumption = (cellData, workbook) => {
  const worksheet = getSheetByIndex(cellData, workbook);
  return worksheet[cellData["total"]["DIESEL CONSUMPTION"]].v;
};

const getSteeringHours = (cellData, workbook) => {
  const worksheet = getSheetByIndex(cellData, workbook);
  return worksheet[cellData["total"]["STEERING HOURS"]].v;
};

const getValueByHeader = (cellData, workbook, header) => {
  const worksheet = getSheetByIndex(cellData, workbook);
  return worksheet[cellData["total"][header]].v;
};
export {
  readExcel,
  getBusRemttd,
  getCollection,
  getOptedKM,
  getSteeringHours,
  getValueByHeader,
};
