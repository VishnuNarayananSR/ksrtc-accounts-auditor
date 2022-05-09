import AppBar from "../UI/AppBar";
import Drawer from "../UI/Drawer";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import MainContext from "../Context/MainContext";

export default function MainLayout({ children }) {
  const [open, setOpen] = useState(false);
  const drawerWidth = 300;
  const isBigScreen = useMediaQuery("(min-width: 968px)");
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
      [theme.breakpoints.up("md")]: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
          marginLeft: `+${drawerWidth}px`,
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      },
    })
  );
  return (
    <MainContext.Provider
      value={{
        drawerWidth,
        handleDrawerClose,
        handleDrawerOpen,
        isBigScreen,
        open,
        setOpen,
      }}
    >
      <style>
        {`:root {
        --color-primary: #1a746b;
        --color-secondary: #ffab40;
        --color-tertiary: #99d5cf;
        --color-background: #E5E5E5;
        --color-text: #e8eaf6;
        --color-text-dark: #442c2e;
        }`}
      </style>
      <AppBar></AppBar>
      <Drawer></Drawer>
      <Main open={open}>{children}</Main>
    </MainContext.Provider>
  );
}
