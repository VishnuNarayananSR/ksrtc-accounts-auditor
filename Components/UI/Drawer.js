import Link from "next/link";
import { ChevronLeft, CloudUpload, CompareArrows } from "@mui/icons-material";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useContext } from "react";
import MainContext from "../Context/MainContext";
import { styled } from "@mui/material/styles";

export default function () {
  const { drawerWidth, handleDrawerClose, isBigScreen, open } = useContext(MainContext);

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant={isBigScreen ? "persistent" : "temporary"}
      anchor="left"
      open={open}
      ModalProps={{
        keepMounted: true,
      }}
      onClose={handleDrawerClose}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeft />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <Link href="/">
          <ListItem button key="Upload">
            <ListItemIcon>
              <CloudUpload />
            </ListItemIcon>
            <ListItemText primary="Upload" />
          </ListItem>
        </Link>
        <Link href="/summary">
          <ListItem button key="Monthly Comparison">
            <ListItemIcon>
              <CompareArrows />
            </ListItemIcon>
            <ListItemText primary="Monthly Comparison" />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
}
