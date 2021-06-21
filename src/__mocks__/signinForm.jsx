import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import LoginImage from "../assets/login.svg";
import { Marginer } from "../components/Marginer/index";
import { Form } from "../components/SignupForm/signupForm";
import { ErrorTxt } from "../components/SignupForm/signupForm";
export const Container = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  flex: 1 0 100%;
  justify-content: center;
  align-items: center;
`;
export const Image = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url(${(props) => props.image || null});
`;
export const Column = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.color || "#FC9E4F"};
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const SignInContainer = styled.div`
  width: 400px;
  height: 620px;
  border: 1px solid white;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  border: 10px solid #e2e2e2;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h3`
  font-weight: 700;
  font-size: 1.8rem;
  margin-bottom: 5px;
`;
export const Subtitle = styled.h4`
  font-weight: 400;
  font-size: 1.1rem;
  a {
    text-decoration: none;
    color: #f8713f;
    font-weight: 600;
  }
`;

export const Button = styled(motion.button)`
  padding: 15px 40px;
  border-radius: 25px;
  width: 80%;
  color: #fff;
  font-weight: 500;
  font-size: 1.4rem;
  cursor: ${(props) => (props.disabled == "true" ? "none" : "pointer")};
  outline: none;
  border: none;
  background-color: ${(props) => (props.disabled == "true" ? "#971605" : "#f4442e")};
  box-shadow: 0 10px 10px rgba(15, 15, 15, 0.1);
`;

export const Input = styled(motion.input)`
  padding: 20px 40px;
  font-size: 1rem;
  width: 90%;
  border-radius: 25px;
  background-color: #f4f4f4;
  border: none;
  outline: none;
  border: 2px solid #b8b8b8;
  transition: border 200ms ease-in-out;

  &:focus {
    border: 2px solid #f4442e;
  }
  &:not(:first-of-type) {
    margin-top: 20px;
  }
  &:last-of-type {
    margin-bottom: 20px;
  }
`;

export const DimmedTextLink = styled(Link)`
  color: ${(props) => props.color || "#acacac"};
  font-size: 1rem;
  text-decoration: none;
`;

const ConstDivisorContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;
const DivisorText = styled.h6`
  font-size: 1rem;
  font-weight: 600;
  display: inline;
`;
const Box = styled.div`
  width: ${(props) => props.width || "40px"};
  display: inline-block;
  margin-right: ${(props) => props.right || "0px"};
  margin-left: ${(props) => props.left || "0px"};

  border: 1px solid black;
`;
const Divisor = ({ text }) => {
  return (
    <ConstDivisorContainer>
      <Box right={"10px"}></Box>
      <DivisorText>{text}</DivisorText>
      <Box left={"10px"}></Box>
    </ConstDivisorContainer>
  );
};

const SocialMediaContainer = styled.div`
  display: flex;
  width: 200px;
  justify-content: center;
  align-items: center;
  height: 50px;
`;

const SocialBox = styled(Link)`
  width: 45px;
  height: 35px;
  position: relative;
  box-shadow: 0 0 4px rgba(15, 15, 15, 0.1);
`;

const SocialImg = styled.div`
  background-image: url(${(props) => props.image});
  background-position: center;
  background-size: contain;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const SignInMocked = ({ handleSubmit }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <Container>
      <Column>
        <SignInContainer>
          <Title>Log in</Title>
          <Subtitle>
            Not a member? <Link to="/signup">Sign up</Link>
          </Subtitle>
          <Form onSubmit={handleSubmit}>
            <Input ref={emailRef} required type="email" placeholder="Email" name="email"></Input>
            <Input ref={passwordRef} required type="password" placeholder="Password" name="password"></Input>
            {error !== "" && <ErrorTxt>{error}</ErrorTxt>}
            <Button disabled={loading} whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }} type="submit">
              Login
            </Button>
          </Form>
          <Marginer direction="vertical" margin={40}></Marginer>
          <DimmedTextLink color="#F4442E" to="/password-reset">
            Forgot password?
          </DimmedTextLink>
          <Divisor divisorTxt=""></Divisor>
        </SignInContainer>
      </Column>
      <Column>
        <Image image={LoginImage} width={"100%"} height={"100%"}></Image>
      </Column>
    </Container>
  );
};
