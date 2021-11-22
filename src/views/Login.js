import React from "react";
import styled from "styled-components";
import Form from "../components/login/Form";
import background from "../assets/img/login_bg.png";

export default function Login() {
  return (
    <>
      <BG>
        <Form />
      </BG>
    </>
  );
}

const BG = styled.section`
  height: 100vh;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
`;
