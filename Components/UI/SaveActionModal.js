import ActionModal from "./ActionModal";
import { useEffect, useState } from "react";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { TextField, InputAdornment } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { add } from "date-fns";

const SaveActionModal = (props) => {
  const tMinus1Date = new Date(add(new Date(), { days: -1 }));
  const [date, setDate] = useState(tMinus1Date);
  const [dieselPrice, setDieselPrice] = useState(0);
  useEffect(() => {
    fetch("/api/collection/diesel-price")
      .then((res) => res.json())
      .then((data) => setDieselPrice(data.dieselPrice))
      .catch((err) => console.log(err));
  }, [date]);
  const dieselPriceChangeHandler = (event) => {
    const val = event.target.value.replace(/[^\d.]/g, "")
    setDieselPrice(val);
  };
  const saveCollectionData = (date, tableTotals, dieselPrice) => {
    const data = {
      date: date.getTime(),
      dieselPrice,
      ...tableTotals,
      diesel: tableTotals["diesel consumed"],
      totalCollection: tableTotals.collection
    };
    fetch("/api/collection/save", { method: "POST", body: JSON.stringify(data) })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <ActionModal
      title="You're about to save a record for 30 day comparison"
      actionText="Save"
      handleClose={props.handleClose}
      actionHandler={() => {
        saveCollectionData(date, props.tableTotals, dieselPrice);
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          label="Date for collection"
          inputFormat="MM/dd/yyyy"
          value={date}
          onChange={setDate}
          renderInput={(params) => <TextField {...params} />}
          maxDate={new Date()}
        />
      </LocalizationProvider>
      <TextField
        label="Diesel Price:"
        value={dieselPrice}
        InputProps={{
          startAdornment: <InputAdornment position="start">Rs.</InputAdornment>,
        }}
        onChange={dieselPriceChangeHandler}
      />
    </ActionModal>
  );
};

export default SaveActionModal;
