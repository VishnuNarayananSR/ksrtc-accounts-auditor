import { getValueByHeader } from "./CommonUtil";
import * as configs from "../Configs/cellConfig";
import MaterialTable from "../UI/MaterialTable";
import DialogModal from "../UI/DialogModal";
import { useContext } from "react";
import FormContext from "../Context/FormContext";
import MaterialButton from "../UI/MaterialButton";
import { Box } from "@mui/material";
const genTableData = (files) => {
  let totalCollection = 0;
  let totalBusesRemitted = 0;
  let totalOptedKM = 0;
  let totalSteeringHours = 0;
  let totalTarget = 0;
  let tableData = [];
  Object.entries(configs).forEach(([key, config]) => {
    const workbook = files[key];
    const busRemitted = getValueByHeader(config, workbook, "BUSES REMITTED");
    const collection = getValueByHeader(config, workbook, "COLLECTION");
    const optedKM = getValueByHeader(config, workbook, "OPTED KM");
    const steeringHours = getValueByHeader(config, workbook, "STEERING HOURS");
    const target = getValueByHeader(config, workbook, "TARGET");
    totalBusesRemitted += busRemitted;
    totalCollection += collection;
    totalOptedKM += optedKM;
    totalSteeringHours += steeringHours;
    totalTarget += target;
    tableData.push({
      zone: config.zone,
      busRemitted,
      collection,
      optedKM,
      epkm: optedKM ? (collection / optedKM).toFixed(2) : 0,
      epb: busRemitted ? (collection / busRemitted).toFixed(0) : 0,
      steeringHours: steeringHours ? steeringHours.toFixed(0) : 0,
      achievement: target ? ((collection / target) * 100).toFixed(2) : 0,
    });
  });
  tableData.push({
    zone: "Total",
    busRemitted: totalBusesRemitted,
    collection: totalCollection,
    optedKM: totalOptedKM,
    epkm: totalOptedKM ? (totalCollection / totalOptedKM).toFixed(2) : 0,
    epb: totalBusesRemitted
      ? (totalCollection / totalBusesRemitted).toFixed(0)
      : 0,
    steeringHours: (totalSteeringHours / 60).toFixed(0) + " hrs",
    achievement: totalCollection
      ? ((totalCollection / totalTarget) * 100).toFixed(2)
      : 0,
  });
  return tableData;
};

const CollectionModal = ({ files }) => {
  const setShowForm = useContext(FormContext);
  try {
    const tData = genTableData(files);
    const tHeaders = [
      "zone",
      "busRemitted",
      "collection",
      "optedKM",
      "epkm",
      "epb",
      "steeringHours",
      "achievement",
    ];
    const boxStyle = {
      display: "flex",
      flexDirection: "column",
      margin: "auto",
    };
    return (
      <Box style={boxStyle}>
        <MaterialTable headers={tHeaders} rows={tData}></MaterialTable>
      <MaterialButton style={{alignSelf: "center"}} onClick={() => setShowForm(true)}>Back</MaterialButton>
      </Box>
    );
  } catch (e) {
    return (
      <DialogModal
        title="Error"
        description="Inappropriate files received."
        onClose={() => setShowForm(true)}
      />
    );
  }
};

export default CollectionModal;
