import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import PhoneShell from "./components/layout/PhoneShell";
import styled from "styled-components";

const AppWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  @media (max-width: 480px) {
    padding: 0;
  }
`;

const MainContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;

function App() {
  const [token, setToken] = useState(null);
  const [cookies] = useCookies(["bf-token"]);

  useEffect(() => {
    if (cookies["bf-token"]) {
      setToken(cookies["bf-token"]);
    }
  }, [cookies]);

  const CalendarComponent =
    token?.role === "instructor" ? InstructorCalendar : UserCalendar;

  return (
    <AppWrapper>
      <PhoneShell>
        <BrowserRouter>
          <Store.Provider value={{ token, setToken }}>
            <MainContent>
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/hjem" element={<Home />} />
                <Route path="/soeg" element={<SearchPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/aktivitet/:id" element={<ClassDetails />} />
                <Route path="/hold/:id" element={<TeamDetails />} />
                <Route path="/kalender" element={<CalendarComponent />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </MainContent>
            <Paper
              sx={{
                width: "100%",
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
              }}
              elevation={3}
            >
              <BottomNavbar />
            </Paper>
          </Store.Provider>
        </BrowserRouter>
      </PhoneShell>
    </AppWrapper>
  );
}

export default App;
