import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Store from "../../Store";
import { useForm } from "react-hook-form";

const FormContainer = styled.form`
  background: rgba(94, 46, 83, 0.85);
  padding: 2.5rem;
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transform: translateZ(0);
  backface-visibility: hidden;
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  font-family: "Ubuntu", sans-serif;
  letter-spacing: -0.5px;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;

  &:focus-within label {
    transform: translateY(-24px) scale(0.8);
    color: #ffffff;
  }
`;

const Label = styled.label`
  position: absolute;
  left: 16px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  pointer-events: none;
  transition: 0.2s ease all;
  transform-origin: left;
  transform: ${(props) =>
    props.$hasValue ? "translateY(-24px) scale(0.8)" : "translateY(12px)"};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.08);
  border: 2px solid
    rgba(255, 255, 255, ${(props) => (props.$hasError ? "0.4" : "0.15")});
  border-radius: 12px;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.2s ease;
  outline: none;
  font-weight: 500;

  &:focus {
    border-color: rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.12);
  }

  &::placeholder {
    color: transparent;
  }
`;

const RememberMeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #5e2e53;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background: #ffffff;
  color: #5e2e53;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  letter-spacing: 0.5px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
    background: #f8f8f8;
  }

  &:active {
    transform: translateY(0);
  }
`;

const ErrorMessage = styled.p`
  color: #ff8f8f;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;

  &::before {
    content: "⚠️";
  }
`;

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm();

  const { setToken } = useContext(Store);
  const navigate = useNavigate();
  const watchUsername = watch("username", "");
  const watchPassword = watch("password", "");

  async function submitHandler(formData) {
    // Check for admin credentials
    if (formData.username === "admin" && formData.password === "0000") {
      const mockToken = {
        token: "mock-jwt-token",
        userId: 1,
        role: "instructor",
        validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
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

    setError("username", {
      type: "manual",
      message: "Ugyldigt brugernavn eller adgangskode",
    });
  }

  return (
    <FormContainer onSubmit={handleSubmit(submitHandler)}>
      <Title>Log ind</Title>

      <InputGroup>
        <Label $hasValue={watchUsername.length > 0}>Brugernavn</Label>
        <Input
          type="text"
          {...register("username", { required: true })}
          $hasError={errors.username}
        />
        {errors.username && (
          <ErrorMessage>
            {errors.username.message || "Brugernavn er påkrævet"}
          </ErrorMessage>
        )}
      </InputGroup>

      <InputGroup>
        <Label $hasValue={watchPassword.length > 0}>Adgangskode</Label>
        <Input
          type="password"
          {...register("password", {
            required: "Adgangskode er påkrævet",
            minLength: { value: 4, message: "Minimum 4 tegn" },
          })}
          $hasError={errors.password}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </InputGroup>

      <RememberMeContainer>
        <Checkbox type="checkbox" {...register("rememberMe")} id="rememberMe" />
        <label htmlFor="rememberMe">Husk mig</label>
      </RememberMeContainer>

      <SubmitButton type="submit">Log ind</SubmitButton>
    </FormContainer>
  );
}
