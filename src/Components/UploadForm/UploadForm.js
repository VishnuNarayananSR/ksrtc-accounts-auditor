import { useState } from "react";
import "./UploadForm.css";
import { readExcel } from "../CSVUtil/CommonUtil";
import CollectionModal from "../CSVUtil/CollectionModal";
import { Card } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FormContext from "../Context/FormContext";
import MaterialButton from "../UI/MaterialButton";

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
    "@media only screen and (min-width: 768px)" : {
      margin: "5% 30%",
    }
  }

  return (
    <FormContext.Provider value={setShowForm}>
      {showForm ? (
        <Card sx={formCardStyle}>
          <form className="upload-form" onSubmit={formSubmitHandler}>
            <div className="file-input__controls">
              <div className="file-input__control">
                <label style={centralFile && { color: "var(--color-primary)" }}>
                  <FileUploadIcon sx={{ color: "var(--color-tertiary)" }} />
                  Upload Central Zone File
                  <input
                    onChange={(e) => {
                      readExcel(e.target.files[0])
                        .then(setCentralFile)
                        .catch(alert);
                    }}
                    style={{ display: "none" }}
                    type="file"
                    required
                    name="central-file"
                    id="central-file"
                  />
                </label>
              </div>
              <div className="file-input__control">
                <label style={northFile && { color: "var(--color-primary)" }}>
                  <FileUploadIcon sx={{ color: "var(--color-tertiary)" }} />
                  Upload North Zone File
                  <input
                    onChange={(e) => {
                      readExcel(e.target.files[0])
                        .then(setNorthFile)
                        .catch(alert);
                    }}
                    style={{ display: "none" }}
                    type="file"
                    required
                    name="north-file"
                    id="north-file"
                  />
                </label>
              </div>
              <div className="file-input__control">
                <label style={southFile && { color: "var(--color-primary)" }}>
                  <FileUploadIcon sx={{ color: "var(--color-tertiary)" }} />
                  Upload South Zone File
                  <input
                    onChange={(e) => {
                      readExcel(e.target.files[0])
                        .then(setSouthFile)
                        .catch(alert);
                    }}
                    style={{ display: "none" }}
                    type="file"
                    required
                    name="south-file"
                    id="south-file"
                  />
                </label>
              </div>
            </div>
            <MaterialButton type="Submit">Submit</MaterialButton>
          </form>
        </Card>
      ) : (
        <CollectionModal files={{ southFile, centralFile, northFile }} />
      )}
    </FormContext.Provider>
  );
};

export default UploadForm;
