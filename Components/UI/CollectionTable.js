import { getValueByHeader } from "../CSVUtil/CommonUtil";
import * as configs from "../Configs/cellConfig";
import MaterialTable from "./MaterialTable";
import DialogModal from "./DialogModal";
import { useContext, useState } from "react";
import FormContext from "../Context/FormContext";
import MaterialButton from "./MaterialButton";
import { Box, Grid } from "@mui/material";
import SaveActionModal from "./SaveActionModal";
import { calcEPKM, calcEPB, calcAchievement } from "../../util/calc";
const genTableData = (files) => {
  let totalCollection = 0;
  let totalBusesRemitted = 0;
  let totalOptedKM = 0;
  let totalSteeringHours = 0;
  let totalTarget = 0;
  let totalPassengers = 0;
  let totalTrips = 0;
  let totalDiesel = 0;
  let tableData = [];
  Object.entries(configs).forEach(([key, config]) => {
    const workbook = files[key];
    const busRemitted = getValueByHeader(config, workbook, "BUSES REMITTED");
    const collection = getValueByHeader(config, workbook, "COLLECTION");
    const optedKM = getValueByHeader(config, workbook, "OPTED KM");
    const passengers = getValueByHeader(config, workbook, "PASSENGERS");
    const trips = getValueByHeader(config, workbook, "TRIPS");
    const diesel = getValueByHeader(config, workbook, "DIESEL CONSUMPTION");
    const steeringHours = getValueByHeader(config, workbook, "STEERING HOURS");
    const target = getValueByHeader(config, workbook, "TARGET");
    totalBusesRemitted += busRemitted;
    totalCollection += collection;
    totalOptedKM += optedKM;
    totalPassengers += passengers;
    totalTrips += trips;
    totalDiesel += diesel;
    totalSteeringHours += steeringHours;
    totalTarget += target;
    tableData.push({
      zone: config.zone,
      busRemitted,
      collection,
      optedKM,
      epkm: calcEPKM(optedKM, collection),
      passengers,
      trips,
      "diesel consumed": diesel.toFixed(0),
      epb: calcEPB(busRemitted, collection),
      steeringHours: steeringHours ? steeringHours.toFixed(0) : 0,
      achievement: calcAchievement(target, collection),
    });
  });
  tableData.push({
    zone: "Total",
    busRemitted: totalBusesRemitted,
    collection: totalCollection,
    optedKM: totalOptedKM,
    passengers: totalPassengers,
    trips: totalTrips,
    "diesel consumed": totalDiesel.toFixed(0),
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

const CollectionTable = ({ files }) => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const setShowForm = useContext(FormContext);
  try {
    const tData = genTableData(files);
    const tHeaders = [
      "zone",
      "busRemitted",
      "collection",
      "optedKM",
      "passengers",
      "trips",
      "diesel consumed",
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
        <Grid container spacing={1} justifyContent="center">
          <Grid item>
            <MaterialButton onClick={() => setShowForm(true)}>
              Back
            </MaterialButton>
          </Grid>

          <Grid item>
            <MaterialButton
              onClick={() => {
                setShowSaveModal(true);
              }}
            >
              Save
            </MaterialButton>
          </Grid>
        </Grid>
        {showSaveModal && (
          <SaveActionModal tableTotals={tData[3]} handleClose={() => setShowSaveModal(false)} />
        )}
      </Box>
    );
  } catch (e) {
    {console.log(e.message)}
    return (
      <DialogModal
        title="Error"
        description="Inappropriate files received."
        onClose={() => setShowForm(true)}
      />
    );
  }
};

export default CollectionTable;
