import React, { useEffect, useState, useContext } from "react";
import { Link } from "@gatsbyjs/reach-router";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import List from "@mui/material/List";
import Store from "../Store";
import axios from "axios";

export default function UserCalendar() {
  const { token, setToken } = useContext(Store);
  const [cookies, setCookie] = useCookies([]);
  const [content, setContent] = useState([]);

  useEffect(() => {
    async function getActivities() {
      if (!token) return; // Prevents fetch from running if user isn't logged in
      const response = await axios.get(
        `http://localhost:4000/api/v1/users/${cookies["bf-token"].userId}`,
        {
          headers: {
            Authorization: `Bearer ${cookies["bf-token"].token}`,
          },
        }
      );
      setContent(response.data.activities);
    }
    getActivities();
  }, [cookies]);

  return (
    <div>
      <PageTitle>kalender</PageTitle>
      <List
        sx={{
          width: "100%",
          maxWidth: 356,
          bgcolor: "#5E2E53",
          position: "relative",
          overflow: "auto",
          margin: "0 auto",
          maxHeight: "80vh",
          "& ul": { padding: 0 },
        }}
      >
        {content?.map((activity) => {
          return (
            <Link
              key={activity.id}
              to={`/aktivitet/${activity.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card>
                <Title>{activity.name}</Title>
                <Text>
                  {activity.weekday} {activity.time}
                </Text>
              </Card>
            </Link>
          );
        })}
      </List>
    </div>
  );
}

// Content //
const PageTitle = styled.h1`
  margin: 0 0 4rem 9vw;
  padding-top: 1.9375rem;
  width: 11rem;
  height: 2.5625rem;

  font-style: normal;
  font-weight: normal;
  font-size: 2.25rem;
  line-height: 2.5625rem;
  color: #eaeaea;
`;

const Card = styled.div`
  margin: 2rem auto;
  width: 90vw;
  height: 6.6875rem;

  display: flex;
  align-items: left;
  justify-content: center;
  flex-direction: column;

  background: #eaeaea;
  border-radius: 0.6875rem;
`;

const Title = styled.h2`
  margin: 0 2rem;
  padding: 0;

  font-style: normal;
  font-weight: normal;
  font-size: 2.25rem;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Text = styled.p`
  margin: 0 2rem;
  padding: 0;
  height: 1.3125rem;

  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem;
  color: black;
`;
////////////////
