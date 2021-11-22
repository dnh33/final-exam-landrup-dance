import React from "react";
import { Link } from "@gatsbyjs/reach-router";
import styled from "styled-components";
import Primary from "../components/buttons/Primary";

import "animate.css";

export default function Welcome() {
  return (
    <BG>
      <Position className="animate__animated animate__fadeIn animate__delay-1s">
        <Link to="hjem" style={{ textDecoration: "none" }}>
          <Primary>Kom i gang</Primary>
        </Link>
      </Position>
    </BG>
  );
}

const BG = styled.div`
  height: 100vh;
  max-width: 100vw;
  max-height: 100%;

  object-fit: fill;
  background-image: url("./images/welcome.png");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;
`;

const Position = styled.div`
  padding-top: 83vh;
`;
