import { Box, InputLabel, Input} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { readExcel } from "../CSVUtil/CommonUtil";
import { useState } from "react";

const FileInput = (props) => {
  const labelStyle = {
    display: "inline-block",
    whiteSpace: "nowrap", 
    cursor: "pointer",
    padding: "10px",
    border: "1px solid var(--color-tertiary)", 
    margin: "0.3rem 0",
    borderRadius: "3px",
    color: "var(--color-text-dark)",
    fontWeight: "400",
    width: "15em", 
    overflow: "hidden",
    textOverflow: "ellipsis",
    transition: "all 0.3s ease 0s",
    "&:hover": {
      backgroundColor: "var(--color-tertiary)",
    },
    "&:active": {
      transform: "translateY(3px)",
    }
  };
  const [labelText, setLabelText] = useState(props.label);
  const fileInputChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      readExcel(file).then(props.fileStateHandler).catch(alert);
      setLabelText(file.name);
    }
  };

  return (
    <Box>
      <InputLabel sx={labelStyle}>
        <FileUploadIcon sx={{ color: "var(--color-tertiary)" }} />
        {labelText}
        <Input
          onChange={fileInputChangeHandler}
          style={{ display: "none" }}
          type="file"
          required
          id="props.id"
        />
      </InputLabel>
    </Box>
  );
};

export default FileInput;
