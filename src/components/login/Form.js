import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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
    setError,
  } = useForm();

  const { setToken } = useContext(Store);
  const navigate = useNavigate();

  async function submitHandler(formData) {
    // Check for admin credentials
    if (formData.username === "admin" && formData.password === "0000") {
      const mockToken = {
        token: "mock-jwt-token",
        userId: 1,
        role: "instructor",
        validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
      };

      setToken(mockToken);

      if (formData.rememberMe) {
        const expires = new Date(mockToken.validUntil).toUTCString();
        document.cookie = `bf-token=${JSON.stringify(
          mockToken
        )};expires=${expires};path=/`;
      } else {
        document.cookie = `bf-token=${JSON.stringify(mockToken)};path=/`;
      }

      navigate("/hjem");
      return;
    }

    // If not admin credentials, try the API
    try {
      const response = await fetch("http://localhost:4000/auth/token", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      setToken(data);

      if (formData.rememberMe) {
        const expires = new Date(data.validUntil).toUTCString();
        document.cookie = `bf-token=${JSON.stringify(
          data
        )};expires=${expires};path=/`;
      } else {
        document.cookie = `bf-token=${JSON.stringify(data)};path=/`;
      }

      navigate("/hjem");
    } catch (error) {
      setError("username", {
        type: "manual",
        message: "Ugyldige legitimationsoplysninger",
      });
    }
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
      {errors.username && (
        <ErrorMsg>{errors.username.message || "Brugernavn påkrævet"}</ErrorMsg>
      )}
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
