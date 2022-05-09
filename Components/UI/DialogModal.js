import { Card, Modal, Typography } from "@mui/material";
import { useState } from "react";
import MaterialButton from "./MaterialButton";

const DialogModal = (props) => {
  const [open, setOpen] = useState(true);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    button: {
      margin: "0 85%",
      boxSizing: "border-box",
    },
    "@media (maxWidth: 600px)": {
      width: "90vw",
    },
  };
  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        props.onClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {props.title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.description}
        </Typography>
        <MaterialButton
          onClick={() => {
            setOpen(false);
            props.onClose();
          }}
        >
          OK
        </MaterialButton>
      </Card>
    </Modal>
  );
};

export default DialogModal;
