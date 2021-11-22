import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import {
  Router,
  createHistory,
  LocationProvider,
} from "@gatsbyjs/reach-router";
import Paper from "@mui/material/Paper";
import Store from "./Store";
import Welcome from "./views/Welcome";
import Home from "./views/Home";
import Login from "./views/Login";
import InstructorCalendar from "./views/InstructorCalendar";
import UserCalendar from "./views/UserCalendar";
import SearchPage from "./views/SearchPage";
import ClassDetails from "./views/ClassDetails";
import BottomNavbar from "./components/navigation/BottomNavbar";
import TeamDetails from "./views/TeamDetails";

function App() {
  var [token, setToken] = useState(null);
  var [cookies] = useCookies(["bf-token"]);

  let history = createHistory(window);

  useEffect(() => {
    if (cookies["bf-token"]) {
      setToken(cookies["bf-token"]);
    }
  }, []);

  return (
    <LocationProvider value={history}>
      {(context) => (
        <Store.Provider value={{ token, setToken }}>
          <Router>
            <Welcome path="/" />
            <Home path="hjem" />
            <SearchPage path="soeg" />
            <Login default path="login" />
            <ClassDetails path="aktivitet/:id" />
            <TeamDetails path="hold/:id" />
            {/* If user role is instructor, show specific calendar otherwise user calendar */}
            {token?.role === "instructor" ? (
              <InstructorCalendar path="/kalender" />
            ) : (
              <UserCalendar path="/kalender" />
            )}
          </Router>

          <Paper
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
            elevation={3}
          >
            <BottomNavbar context={context} />
          </Paper>
        </Store.Provider>
      )}
    </LocationProvider>
  );
}

export default App;
