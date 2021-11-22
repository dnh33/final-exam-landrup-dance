import React, { useEffect, useState } from "react";
import { Link } from "@gatsbyjs/reach-router";
import axios from "axios";
import styled from "styled-components";
import List from "@mui/material/List";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

import "./SearchBox.scss";

export default function Searchbox() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getActivities() {
      const response = await axios.get(
        "http://localhost:4000/api/v1/activities"
      );
      setData(response.data);
    }
    getActivities();
  }, []);

  return (
    <div>
      <center>
        <InputField
          type="text"
          placeholder="Søg på aktiviteter"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </center>
      <List
        className="search__list"
        sx={{
          width: "100%",
          maxWidth: 356,
          bgcolor: "#5E2E53",
          position: "relative",
          overflow: "auto",
          margin: "1rem auto",
          maxHeight: "70vh",
          "& ul": { padding: 0 },
        }}
      >
        {data
          .filter((val) => {
            if (searchTerm === "") {
              return;
            } else if (
              val.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((activity) => {
            return (
              <Link
                key={activity.id}
                to={`/aktivitet/${activity.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card className="search__card" style={{ marginTop: 20 }}>
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
                        {activity.maxAge === 100 ? (
                          <CardTitle>{activity.minAge}+ år</CardTitle>
                        ) : (
                          <CardTitle>
                            {activity.minAge} -{activity.maxAge} år
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
    </div>
  );
}

// Content //
const InputField = styled.input`
  width: 90%;
  height: 52px;

  margin-top: 2rem;
  padding: 10px 20px;
  background: #fcfbfb;
  border: 1px solid #d4d4d4;
  border-radius: 25px;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 10px #ffffff;
  }
`;

const BoxPos = styled.div`
  margin-top: 1.5rem;
  margin-left: 1.5rem;
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
/////////////////
