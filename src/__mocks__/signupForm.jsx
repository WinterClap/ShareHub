import { Marginer } from "../components/Marginer";
import {
  Button,
  Column,
  Container,
  Image,
  Input,
  SignInContainer,
  Subtitle,
  Title,
} from "../components/SignIn/signinForm";
import { Link } from "react-router-dom";
import SignUpImage from "../assets/welcome_cats.svg";
import styled from "styled-components";
import { useRef, useState } from "react";

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ErrorTxt = styled.p`
  color: #f4442e;
  padding: 10px;
  font-size: 1rem;
  background-color: #fdecea;
  width: 60%;
  border: 2px solid #f4442e;
  border-radius: 20px;
  font-weight: 600;
  text-align: justify;
`;
export const SignUpMocked = ({ handleSubmit }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState();

  return (
    <Container>
      <Column>
        <Image image={SignUpImage} width={"100%"} height={"100%"}></Image>
      </Column>
      <Column>
        <SignInContainer>
          <Title>Sign up</Title>
          <Subtitle>
            Already have an account?<Link to="/signin">Login</Link> here
          </Subtitle>
          <Form onSubmit={handleSubmit}>
            <Input required type="email" placeholder="Email" name="email" ref={emailRef}></Input>
            <Input required type="password" placeholder="Password" name="password" ref={passwordRef}></Input>
            <Input
              required
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              ref={passwordConfirmRef}
            ></Input>

            {error !== "" && (
              <>
                <ErrorTxt>{error}</ErrorTxt>
                <Marginer direction="vertical" margin={10}></Marginer>
              </>
            )}
            <Button disable={loading} whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }} type="submit">
              Create account
            </Button>
          </Form>
          <Marginer direction="vertical" margin={40}></Marginer>
        </SignInContainer>
      </Column>
    </Container>
  );
};

export default SignUpMocked;
