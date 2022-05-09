import Button from "@mui/material/Button";

const MaterialButton = (props) => {
  const style = {
    color: "var(--color-text-dark)",
    bgcolor: "var(--color-secondary)",
    padding: "10px",
    fontWeight: "400",
    textTransform: "none",
    minWidth: "auto",
    minHeight: "auto",
    lineHeight: 1,
    cursor: "pointer",
    borderRadius: "3px",
    border: "none",
    boxShadow: "0 1px 8px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease 0s",
    "&:hover": {
      bgcolor: "var(--color-secondary)",
    },
    "&:active": {
      backgroundColor: "#442c2e",
      boxShadow: "3px 8px 15px rgba(0, 0, 0, 0.5)",
      transform: "translateY(3px)",
    },
  };
  return (
    <Button sx={style} {...props}>
      {props.children}
    </Button>
  );
};

export default MaterialButton;
