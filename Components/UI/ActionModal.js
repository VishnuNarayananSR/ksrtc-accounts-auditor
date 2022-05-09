import { Modal, Stack, Card, Typography } from "@mui/material";
import MaterialButton from "./MaterialButton";

const ActionModal = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
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
      open={true}
      onClose={() => {
        props.handleClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {props.title}
        </Typography>
        <Stack spacing={2} margin={2}>
          {props.children}
        </Stack>
        <MaterialButton
          onClick={() => {
            props.handleClose();
            props.actionHandler();
          }}
        >
          {props.actionText}
        </MaterialButton>
      </Card>
    </Modal>
  );
};

export default ActionModal;
