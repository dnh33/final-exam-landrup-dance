import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "@gatsbyjs/reach-router";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import SignUp from "../components/buttons/SignUp";

export default function ClassDetails() {
  const [data, setData] = useState(null);
  const [signUp, setSignUp] = useState(false);
  const [cookies] = useCookies(["bf-token"]);

  // route: /class/:id
  const { id } = useParams();

  const client = axios.create({
    baseURL: `http://localhost:4000/api/v1/activities/${id}`,
  });

  useEffect(() => {
    async function getCourse() {
      const response = await client.get("");
      setData(response.data);
    }
    getCourse();
  }, []);

  if (!data) return "";
  return (
    <BG background={data.asset.url}>
      <Wrapper>
        <Box1>
          {/* If you don't have a user cookie, hide button */}
          {!cookies["bf-token"] ? null : (
            <BtnPos>
              {/* Don't show the sign up button if you're an instructor */}
              {cookies["bf-token"]?.role === "instructor" ? null : (
                <SignUp classId={data.id} />
              )}
            </BtnPos>
          )}
        </Box1>

        <Box2>
          <ClassTitle>{data.name}</ClassTitle>
          {/* If max age is 100, show minimum age only. Otherise show age range, min to max */}
          {data.maxAge === 100 ? (
            <CardAge>{data.minAge}+ år</CardAge>
          ) : (
            <CardAge>
              {data.minAge} -{data.maxAge} år
            </CardAge>
          )}

          <ClassDesc>{data.description}</ClassDesc>
        </Box2>
      </Wrapper>
    </BG>
  );
}

// Content //
const ClassTitle = styled.p`
  width: 18.75rem;
  height: 1.75rem;
  margin-top: 1rem;
  margin-bottom: 0;
  font-family: Ubuntu;
  font-style: normal;
  font-weight: normal;
  font-size: 1.5rem;
  line-height: 1.75rem;
  color: #ffffff;
`;
const CardAge = styled.p`
  width: 6.25rem;
  height: 1.3125rem;
  margin: 0;

  font-family: Ubuntu;
  font-style: normal;
  font-weight: normal;
  font-size: 1.125rem;
  line-height: 1.3125rem;
  /* identical to box height */
  color: #ffffff;
`;
const ClassDesc = styled.p`
  width: 22.125rem;
  height: 11.9375rem;

  font-family: Ubuntu;
  font-style: normal;
  font-weight: normal;
  font-size: 1.125rem;
  line-height: 1.3125rem;
  text-align: left;
  color: #ffffff;
  margin-top: 0.875rem;
  margin-bottom: 5rem;
`;
/////////////////

// Wrappers //
const Box1 = styled.div`
  grid-area: top;
  max-width: 100%;
  height: 30.5625rem;
  position: relative;
`;
const Box2 = styled.div`
  grid-area: bottom;
  padding-left: 1.75rem;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #5e2e53;
`;
const BG = styled.div`
  max-width: 100vw;
  max-height: 100vh;

  grid-area: top;
  object-fit: fill;
  background-image: url(${(props) => props.background});
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 30.5625rem;
`;
const Wrapper = styled.section`
  height: 100vh;
  overflow: hidden;

  display: grid;
  grid-template-rows: 30.5625rem 1fr;
  grid-template-columns: 1fr;
  grid-template-areas:
    "top"
    "bottom";
`;
////////////////

// Positioning //
const BtnPos = styled.span`
  margin-right: 1rem;
  position: absolute;
  right: 0;
  bottom: 1.5rem;
`;
/////////////////
