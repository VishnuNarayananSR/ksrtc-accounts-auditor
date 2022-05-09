import { useState } from "react";
import CollectionTable from "../UI/CollectionTable";
import { Card} from "@mui/material";
import FormContext from "../Context/FormContext";
import MaterialButton from "../UI/MaterialButton";
import FileInput from "./FileInput";

const UploadForm = () => {
  const [centralFile, setCentralFile] = useState(null);
  const [northFile, setNorthFile] = useState(null);
  const [southFile, setSouthFile] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    e.target.reset();
    setShowForm(false);
  };

  const formCardStyle = {
    margin: "3rem 1.5rem",
    borderRadius: "5px",
    "@media only screen and (min-width: 768px)": {
      margin: "5% 33%",
    },
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    margin: "1rem",
    padding: "1rem",
  };
  return (
    <FormContext.Provider value={setShowForm}>
      {showForm ? (
        <Card sx={formCardStyle} elevation={5}>
          <form style={formStyle} onSubmit={formSubmitHandler}>
            <div className="file-input__controls">
              <FileInput
                label="Upload Central Zone File"
                id="central-input"
                fileStateHandler={setCentralFile}
              />
              <FileInput
                label="Upload North Zone File"
                id="north-input"
                fileStateHandler={setNorthFile}
              />
              <FileInput
                label="Upload South Zone File"
                id="south-inputx"
                fileStateHandler={setSouthFile}
              />
            </div>
            <MaterialButton style={{ marginTop: "0.3rem" }} type="Submit">
              Submit
            </MaterialButton>
          </form>
        </Card>
      ) : (
        <>
          <CollectionTable files={{ southFile, centralFile, northFile }} />

        </>
      )}
    </FormContext.Provider>
  );
};

export default UploadForm;
