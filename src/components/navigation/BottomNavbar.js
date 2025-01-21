import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Store from "../../Store";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import TodayIcon from "@mui/icons-material/Today";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BottomNavbar() {
  const { token, setToken } = useContext(Store);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  function delete_cookie(name) {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }

  function logout() {
    delete_cookie("bf-token");
    setToken(null);
    navigate("/");
  }

  if (location.pathname === "/") return null;

  return (
    <Box sx={{ width: "100vw" }}>
      {/* Nav wrapper settings */}
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {/* If you are at home screen, show home button otherwise back button */}
        {location.pathname === "/hjem" ? (
          <BottomNavigationAction
            label="Hjem"
            icon={<HomeIcon />}
            component={Link}
            to="/hjem"
          />
        ) : (
          <BottomNavigationAction
            label="Tilbage"
            icon={<ArrowBackIcon />}
            component={Link}
            to="/hjem"
            value={-2}
          />
        )}
        {/* Search icon */}
        <BottomNavigationAction
          label="Søg"
          icon={<SearchIcon />}
          component={Link}
          to="/soeg"
        />
        {/* Not logged in? No calendar for you. Too bad! */}
        {!token ? null : (
          <BottomNavigationAction
            label="Kalender"
            icon={<TodayIcon />}
            component={Link}
            to="/kalender"
          />
        )}
        {/* If you're logged in, show logout button vice versa */}
        {token ? (
          <BottomNavigationAction
            label="Log ud"
            icon={<LogoutIcon />}
            onClick={logout}
            value={-10}
          />
        ) : (
          <BottomNavigationAction
            label="Login"
            icon={<LoginIcon />}
            component={Link}
            to="/login"
            value={-1}
          />
        )}
      </BottomNavigation>
    </Box>
  );
}
