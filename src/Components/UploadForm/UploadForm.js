import { useState } from "react";
import "./UploadForm.css";
import { readExcel } from "../CSVUtil/commonUtil";
import CollectionModal from "../CSVUtil/CollectionModal";
import { Card } from "@mui/material";
const UploadForm = () => {
  const [centralFile, setCentralFile] = useState();
  const [northFile, setNorthFile] = useState();
  const [southFile, setSouthFile] = useState();
  const [showForm, setShowForm] = useState(true);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    e.target.reset();
    setShowForm(false);
  };
  return showForm ? (
    <Card sx={{ margin: "5%" }}>
      <form className="upload-form" onSubmit={formSubmitHandler}>
        <div className="file-input__controls">
          <div className="file-input__control">
            <label htmlFor="central-file"> Central Zone File:</label>
            <input
              onChange={(e) => {
                readExcel(e.target.files[0])
                  .then(setCentralFile)
                  .catch(console.error);
              }}
              type="file"
              required
              name="central-file"
              id="central-file"
            />
          </div>
          <div className="file-input__control">
            <label htmlFor="north-file"> North Zone File:</label>
            <input
              onChange={(e) => {
                readExcel(e.target.files[0])
                  .then(setNorthFile)
                  .catch(console.error);
              }}
              type="file"
              required
              name="north-file"
              id="north-file"
            />
          </div>
          <div className="file-input__control">
            <label htmlFor="south-file"> South Zone File:</label>
            <input
              onChange={(e) => {
                readExcel(e.target.files[0])
                  .then(setSouthFile)
                  .catch(console.error);
              }}
              type="file"
              required
              name="south-file"
              id="south-file"
            />
          </div>
        </div>
        <button className="submit-btn">Upload</button>
      </form>
    </Card>
  ) : (
    <CollectionModal files={{ southFile, centralFile, northFile }} />
  );
};

export default UploadForm;
