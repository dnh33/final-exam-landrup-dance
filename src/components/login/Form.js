import React, { useContext } from "react";
import styled from "styled-components";
import { navigate } from "@gatsbyjs/reach-router";
import Store from "../../Store";
import { useForm } from "react-hook-form";
import ErrorMsg from "../errors/ErrorMsg";
import Primary from "../buttons/Primary";

import "./Form.scss";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setToken } = useContext(Store);

  async function submitHandler(formData) {
    await fetch("http://localhost:4000/auth/token", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setToken(data);

        //session cookie upon log in without checking "Husk mig"
        if (formData.rememberMe === false) {
          const expires = null;
          const role = data.role;
          document.cookie = `bf-token=${JSON.stringify(
            data
          )};expires=${expires};role=${role}`;
        }

        //persistent cookie upon checking "Husk mig" to true
        if (formData.rememberMe === true) {
          const expires = new Date(data.validUntil).toUTCString();
          const role = data.role;
          document.cookie = `bf-token=${JSON.stringify(
            data
          )};expires=${expires};role=${role}`;
        }

        navigate("hjem");
      });
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="form">
      <Text className="form__text">Log ind</Text>
      <div>
        <input
          type="text"
          placeholder="brugernavn"
          name="username"
          className="form__username"
          aria-label="Enter Username"
          {...register("username", { required: true })}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="adgangskode"
          name="password"
          className="form__password"
          aria-label="Enter Password"
          {...register("password", {
            required: "Adgangskode påkrævet",
            minLength: { value: 4, message: "Koden skal være mindst 4 tegn" },
          })}
        />
      </div>
      <div className="form__label">
        <input
          name="rememberMe"
          type="checkbox"
          className="form__checkbox"
          aria-label="Remember Me"
          {...register("rememberMe")}
          id="rememberMe"
        />
        <label htmlFor="rememberMe"> Husk mig</label>
      </div>
      <Primary type="submit">Log ind</Primary>
      {errors.username && <ErrorMsg>Brugernavn påkrævet</ErrorMsg>}
      {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
    </form>
  );
}

const Text = styled.h1`
  /* Log ind */
  width: 180px;
  font-style: normal;
  font-weight: 400;
  font-size: 48px;
  line-height: 55px;
  color: #eaeaea;
  margin-bottom: 0.625rem;
`;
