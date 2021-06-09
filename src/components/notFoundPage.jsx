import styled from "styled-components";
import React from "react";
import NotFound404BG from "../assets/404NotFoundBG.svg";
import { StepLabel } from "@material-ui/core";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const Background = styled.div`
  background-color: #ffdac7;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${NotFound404BG});
  width: 100%;
  height: 100vh;
  position: relative;
`;

const Text = styled.p`
  font-size: 2rem;
  margin: 0;
  font-weight: 800;
  position: absolute;
  top: 61%;
  left: 50%;

  z-index: 3;
  transform: translate(-50%, -50%);
`;
const RedirectLink = styled(Link)`
  width: 300px;
  font-size: 2rem;
  outline: none;
  border-radius: 25px;
  padding: 20px;
  cursor: pointer;
  background-color: #2f2e41;
  text-decoration: none;
  font-weight: 900;
  color: #ff9283;
  position: absolute;
  text-align: center;
  transition: all 150ms ease-in-out;
  top: 70%;
  left: 50%;
  z-index: 3;
  transform: translate(-50%, -50%);
  &:hover {
    background-color: #ff9283;
    color: #2f2e41;
  }
`;
export const NotFoundPage = () => {
  return (
    <Background>
      <RedirectLink to="/">Go back</RedirectLink>
      <Text>Looks like this page doesn't exist... yet ;)</Text>
    </Background>
  );
};
