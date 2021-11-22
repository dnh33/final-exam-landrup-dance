import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import ActivityCard from "../components/cards/ActivityCard";
import PageTitle from "../components/text/PageTitle";

export default function Home() {
  const [token, setToken] = useState(null);
  const [cookies] = useCookies(["bf-token"]);

  useEffect(() => {
    if (cookies["bf-token"]) {
      setToken(cookies["bf-token"]);
    }
  }, []);

  return (
    <BG>
      <PageTitle>Aktiviteter</PageTitle>
      <ActivityCard />
    </BG>
  );
}

const BG = styled.section`
  height: 100vh;
  background-color: #5e2e53;
`;
