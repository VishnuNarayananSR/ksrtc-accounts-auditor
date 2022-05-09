import { useEffect, useState } from "react";
import { Box, LinearProgress } from "@mui/material";
import MaterialTable from "./MaterialTable";
import { format } from "date-fns";
import {
  calcEPB,
  calcEPKM,
  calcEPL,
  calcKMPL,
  convertToLakhs,
} from "../../util/calc";

const SummaryTable = () => {
  const [summary, setSummary] = useState([]);
  useEffect(() => {
    fetch("/api/collection")
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch((e) => console.log(e.message));
  }, []);
  const headers = [
    "Date",
    "Collection*",
    "Passengers*",
    "Diesel Price(day)",
    "Diesel Value*",
    "Diesel/Collection %",
    "Operated KM*",
    "EPKM",
    "EPB",
    "Diesel in Litres",
    "EPL",
    "KMPL",
  ];
  const viewData = summary.map((record) => {
    return {
      Date: format(new Date(record.date), "dd-MMM-yyyy"),
      "Collection*": convertToLakhs(record.totalCollection),
      "Passengers*": convertToLakhs(record.passengers),
      "Diesel in Litres": record.diesel,
      "Diesel Price(day)": record.dieselPrice,
      "Diesel Value*": convertToLakhs(record.diesel * record.dieselPrice),
      "Diesel/Collection %": (
        ((record.diesel * record.dieselPrice) / record.totalCollection) *
        100
      ).toFixed(2),
      "Operated KM*": convertToLakhs(record.optedKM),
      EPKM: calcEPKM(record.optedKM, record.totalCollection),
      EPB: calcEPB(record.busRemitted, record.totalCollection),
      EPL: calcEPL(record.totalCollection, record.diesel),
      KMPL: calcKMPL(record.optedKM, record.diesel),
    };
  });
  return viewData.length ? (
    <MaterialTable
      headers={Object.keys(viewData[0])}
      rows={viewData}
    ></MaterialTable>
  ) : (
    <Box sx={{ color: "var(--color-primary)" }}>
      <LinearProgress color="inherit" />
    </Box>
  );
};

export default SummaryTable;
