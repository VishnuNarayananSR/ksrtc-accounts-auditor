import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { Menu } from "@mui/icons-material";
import { IconButton, Toolbar, Typography } from "@mui/material";
import MainContext from "../Context/MainContext";
import { useContext } from "react";

export default function () {
  const { drawerWidth, handleDrawerOpen, open } = useContext(MainContext);

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <AppBar
      position="relative"
      open={open}
      sx={{ background: "var(--color-primary)" }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            mr: 2,
            background: "var(--color-primary)",
            ...(open && { display: "none" }),
          }}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          KSRTC Collections Auditor
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
