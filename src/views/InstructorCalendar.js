import React, { useEffect, useState } from "react";
import { Link } from "@gatsbyjs/reach-router";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import List from "@mui/material/List";
import axios from "axios";

export default function InstructorCalendar() {
  const [cookies, setCookie] = useCookies(["bf-token"]);
  const [content, setContent] = useState([]);

  useEffect(() => {
    async function getActivities() {
      const response = await axios.get(
        `http://localhost:4000/api/v1/users/${cookies["bf-token"].userId}/roster/${cookies["bf-token"].userId}`,
        {
          headers: {
            Authorization: `Bearer ${cookies["bf-token"].token}`,
          },
        }
      );
      setContent(response.data);
    }
    if (cookies["bf-token"].userId) {
      getActivities();
    }
  }, [cookies]);

  return (
    <>
      <PageTitle>kalender</PageTitle>
      {content?.map((activity, index) => {
        return (
          <Link
            key={index}
            to={`/hold/${index}`}
            style={{ textDecoration: "none" }}
          >
            <Card>
              <Title>{activity.activity}</Title>
              <Text>
                {activity.weekday} {activity.time}
              </Text>
            </Card>
          </Link>
        );
      })}
    </>
  );
}

// Content //
const PageTitle = styled.h1`
  margin: 0 0 4rem 9vw;
  padding-top: 31px;
  width: 176px;
  height: 41px;

  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 41px;
  color: #eaeaea;
`;

const Card = styled.div`
  margin: 2rem auto;
  width: 90%;
  height: 107px;

  display: flex;
  align-items: left;
  justify-content: center;
  flex-direction: column;

  background: #eaeaea;
  border-radius: 11px;
`;

const Title = styled.h2`
  margin: 0 1rem;
  padding: 0;

  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Text = styled.p`
  margin: 0 1rem;
  padding: 0;
  width: 116px;
  height: 21px;

  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: black;
`;
////////////////
