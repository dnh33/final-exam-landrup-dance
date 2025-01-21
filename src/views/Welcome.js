import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Primary from "../components/buttons/Primary";

import "animate.css";

export default function Welcome() {
  return (
    <Container>
      <BG>
        <Position className="animate__animated animate__fadeIn animate__delay-1s">
          <Link to="hjem" style={{ textDecoration: "none" }}>
            <Primary>Kom i gang</Primary>
          </Link>
        </Position>
      </BG>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
`;

const BG = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("/images/welcome.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Position = styled.div`
  width: 100%;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent);
`;
