import { Marginer } from "./Marginer";
import { Button, Column, Container, Image, Input, SignInContainer, Subtitle, Title } from "./signinForm";
import { Link, useHistory } from "react-router-dom";
import SignUpImage from "../assets/welcome_cats.svg";
import styled from "styled-components";
import { useRef, useState } from "react";
import { useAuth } from "./contexts/AuthContext";

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
export const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const usernameRef = useRef();
  const { signUp } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      // alert("Passwords don't match! Please check them");
      setError("Passwords dont match!");
      console.log("error password don't match");
    } else {
      try {
        setLoading(true);
        setError("");
        await signUp(emailRef.current.value, passwordRef.current.value);
        history.push("/signin");
      } catch (error) {
        setError("Error creating the account. Please, try again later.");
        setLoading(false);
      }
    }
  }

  return (
    <Container>
      <Column>
        <Image image={SignUpImage} width={"100%"} height={"100%"}></Image>
      </Column>
      <Column>
        <SignInContainer>
          <Title>Sign up</Title>
          <Subtitle>
            Already have an account? <Link to="/signin">Login</Link> here
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

            <Input required type="text" placeholder="Username" name="username" ref={usernameRef}></Input>
            {error !== "" && (
              <>
                <ErrorTxt>{error}</ErrorTxt>
                <Marginer direction="vertical" margin={20}></Marginer>
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

export default SignUp;
