import React, { useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Marginer } from "./Marginer/index";
import ForgotPassImage from "../assets/forgotPasswordImage.svg";

import { Form } from "./signupForm";
import { ErrorTxt } from "./signupForm";
import { useAuth } from "./contexts/AuthContext";

import { Button, Column, Container, Image, Input, SignInContainer, Subtitle, Title } from "./signinForm";

const MessageTxt = styled.p`
  color: #26d6d6;
  padding: 10px;
  background-color: #ecfdfd;
  font-size: 1rem;
  width: 60%;
  font-weight: 600;
  border: 2px solid #24dfdf;
  border-radius: 20px;
  text-align: justify;
`;

export const PasswordReset = () => {
  const emailRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { passwordReset } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage("");
      setError("");
      await passwordReset(emailRef.current.value);
      setMessage("Done! Check your email to reset your password.");
      setLoading(false);
    } catch (error) {
      setError("Error while resetting your password. Please, check your email and try again.");
      setLoading(false);
    }
  }

  return (
    <Container>
      <Column>
        <SignInContainer>
          <Title>Reset your password</Title>
          <Subtitle>
            Or <Link to="/signin">sign in</Link>
          </Subtitle>
          <Form onSubmit={handleSubmit}>
            <Input ref={emailRef} required type="email" placeholder="Email"></Input>
            {error !== "" && <ErrorTxt>{error}</ErrorTxt>}
            {message !== "" && <MessageTxt>{message}</MessageTxt>}
            <Button disabled={loading} whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }} type="submit">
              Reset Password
            </Button>
          </Form>
          <Marginer direction="vertical" margin={40}></Marginer>
        </SignInContainer>
      </Column>
      <Column>
        <Image image={ForgotPassImage} width={"100%"} height={"100%"}></Image>
      </Column>
    </Container>
  );
};
