import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import axios from "axios";

export default function TeamDetails() {
  const [cookies, setCookie] = useCookies([]);
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
    getActivities();
  }, [cookies]);

  return (
    <>
      <PageTitle>Holdoversigt</PageTitle>
      {content?.map((activity, index) => {
        return (
          <Text key={index}>
            {activity.firstname} {activity.lastname}
          </Text>
        );
      })}
    </>
  );
}

// Content //
const PageTitle = styled.h1`
  margin: 0 0 4rem 9vw;
  padding-top: 1.9375rem;
  height: 41px;

  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 41px;
  color: #eaeaea;
`;
const Text = styled.p`
  margin: 0 9vw;
  padding: 0;

  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  color: #ffffff;
`;
////////////////
