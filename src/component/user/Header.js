import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "@mui/material";
import "./user.css";

const drawerWidth = 240;
const navItems = ["About", "Contact", "Cart", "Login"];

function Header(props) {
  const { window } = props;
  let Token = localStorage.getItem("token");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link href="/" className="linkcssblack">
          Home
        </Link>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Button key={item} sx={{ color: "#fff" }}>
                {item === "About" ? (
                  <Link href="/about" className="linkcssblack">
                    About
                  </Link>
                ) : item === "Contact" ? (
                  <Link href="/contact" className="linkcssblack">
                    Contact
                  </Link>
                ) : item === "Cart" ? (
                  <Link href="#" className="linkcssblack">
                    Cart
                  </Link>
                ) : item === "Login" ? (
                  Token !== null ? (
                    <Link href="/logout" className="linkcssblack">
                      Logout
                    </Link>
                  ) : (
                    <Link href="/login" className="linkcssblack">
                      Login
                    </Link>
                  )
                ) : (
                  ""
                )}
              </Button>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link href="/" className="linkcss">
              Home
            </Link>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                {item === "About" ? (
                  <Link href="/about" className="linkcss">
                    About
                  </Link>
                ) : item === "Contact" ? (
                  <Link href="/contact" className="linkcss">
                    Contact
                  </Link>
                ) : item === "Cart" ? (
                  <Link href="/cart" className="linkcss">
                    Cart
                  </Link>
                ) : item === "Login" ? (
                  Token !== null ? (
                    <Link href="/logout" className="logout">
                      Logout
                    </Link>
                  ) : (
                    <Link href="/login" className="loginColor">
                      Login
                    </Link>
                  )
                ) : (
                  ""
                )}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 1 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

export default Header;
