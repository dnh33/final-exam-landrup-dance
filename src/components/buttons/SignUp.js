import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useCookies } from "react-cookie";

import { signupForClass, signoutClass } from "../../helpers/SignupHelper";

export default function SignUp(props) {
  const [userInClass, setUserInClass] = useState(false);
  const [content, setContent] = useState([]);
  const [cookies, setCookie] = useCookies(["bf-token"]);

  useEffect(async () => {
    const response = await axios.get(
      `http://localhost:4000/api/v1/activities/${props.classId}`
    );
    setContent(response.data);
    let userInActivity = response.data?.users.filter(
      (user) => user.id === cookies["bf-token"].userId
    );
    if (userInActivity.length > 0) {
      setUserInClass(true);
    }
  }, [cookies]);

  function handleClick() {
    const classId = props.classId;
    const userId = cookies["bf-token"].userId;
    const token = cookies["bf-token"].token;

    if (userInClass) {
      signoutClass(classId, userId, token).then((response) => {
        if (response.status === 200) {
          setUserInClass(false);
        }
      });
    } else {
      signupForClass(classId, userId, token).then((response) => {
        if (response.status === 200) {
          setUserInClass(true);
        }
      });
    }
  }

  return (
    <Button onClick={handleClick}>{userInClass ? "Frameld" : "Tilmeld"}</Button>
  );
}

const Button = styled.div`
  width: 15.5625rem;
  height: 3.375rem;

  font-family: Ubuntu;
  font-style: normal;
  font-weight: normal;
  font-size: 1.125rem;
  line-height: 21px;
  text-transform: capitalize;
  color: #e9e9e9;

  display: flex;
  align-items: center;
  justify-content: center;
  background: #5e2e53;
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;
