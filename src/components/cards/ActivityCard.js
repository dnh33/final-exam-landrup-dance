import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@gatsbyjs/reach-router";
import styled from "styled-components";
import List from "@mui/material/List";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

import "./ActivityCard.scss";

export default function ActivityCard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getActivity() {
      const response = await axios.get(
        "http://localhost:4000/api/v1/activities"
      );
      setData(response.data);
    }
    getActivity();
  }, []);

  if (!data) return "";

  return (
    <List
      className="activity__list"
      sx={{
        width: "100%",
        maxWidth: 356,
        bgcolor: "#5E2E53",
        overflow: "auto",
        margin: "0 auto",
        maxHeight: "80vh",
        "& ul": { padding: 0 },
      }}
    >
      {data?.map((activity) => {
        return (
          <Link
            key={activity.id}
            to={`/aktivitet/${activity.id}`}
            style={{ textDecoration: "none" }}
          >
            <Card className="activity__card">
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={activity.description}
                  height="344"
                  width="356"
                  image={activity.asset.url}
                  title={activity.name}
                  aria-label={activity.description}
                />
                <CardInfo>
                  <BoxPos>
                    <CardTitle>{activity.name}</CardTitle>
                    {/* If max age is 100, show minimum age only. Otherise show age range, min to max */}
                    {activity.maxAge === 100 ? (
                      <CardTitle>{activity.minAge}+ år</CardTitle>
                    ) : (
                      <CardTitle>
                        {activity.minAge}-{activity.maxAge} år
                      </CardTitle>
                    )}
                  </BoxPos>
                </CardInfo>
              </CardActionArea>
            </Card>
          </Link>
        );
      })}
    </List>
  );
}

const BoxPos = styled.div`
  margin-top: 1.5rem;
  margin-left: 1.5625rem;
`;

const CardInfo = styled.div`
  width: 100vw;
  height: 96px;
  background: rgba(225, 161, 233, 0.8);
  border-radius: 0px 39px;
  z-index: 0;
  position: absolute;
  bottom: 0;
`;

const CardTitle = styled.h2`
  width: 182px;
  font-family: Ubuntu;
  font-style: normal;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 21px;
  margin-bottom: -10px;
  color: #000000;
`;
