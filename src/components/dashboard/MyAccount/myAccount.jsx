import React, { useEffect } from "react";
import styled from "styled-components";
import { Marginer } from "../../Marginer";
import { Container, HeaderContainer, SimpleRow, Title, SimpleColumn } from "../DashboardContent/dashboardContent";
import { motion } from "framer-motion";
import { useUser } from "../../contexts/UserContext";
const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const Input = styled.input`
  width: 400px;
  padding: 10px 25px;
  border-radius: 10px;
  outline: none;
  border: 2px solid #bababa;
  font-size: 1rem;
  transition: border 150ms ease-in-out;
  &:not(:last-of-type) {
    margin-bottom: 20px;
  }
  &:focus {
    border: 2px solid #f4442e;
  }
`;

const Label = styled.label`
  font-size: 1.1rem;
  margin-bottom: 10px;
`;

const PhotoContainer = styled.div`
  background-image: url(${(props) => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const Button = styled.button`
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  outline: 0;
  box-shadow: 0px 10px 10px rgba(15, 15, 15, 0.2);
  border: none;
  background-color: rgba(205, 205, 205, 0.1);
  background-image: url(${(props) => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  font-size: ${(props) => props.fontSize || "1rem"};
  border-radius: 20px;
  margin-top: 25px;
  padding: 10px;
  transition: box-shadow 150ms ease-in-out;
  transition: background 150ms ease-in-out;
  font-weight: 600;
  &:hover {
    background: #f4442e;
    color: #fff;
    box-shadow: 0px 10px 10px rgba(244, 68, 46, 0.2);
  }
`;
const InputFile = styled.input`
  border-radius: 20px;
  padding: 10px;
  background-color: transparent;
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
`;
const LabelInputFile = styled(motion.label)`
  font-size: 1.3rem;
  font-weight: 600;
  padding: 10px;
  border-radius: 20px;
  background-color: #f4442e;
  color: #fff;
  cursor: pointer;
`;

export const MyAccount = () => {
  const { handleFileChange, getUserImageUrl, userImageUrl } = useUser();

  useEffect(() => {
    getUserImageUrl();
  }, []);
  return (
    <Container>
      <HeaderContainer>
        <Title>My Account</Title>
      </HeaderContainer>
      <Marginer direction="vertical" margin={"20px"}></Marginer>
      <SimpleColumn>
        <PhotoContainer image={userImageUrl}></PhotoContainer>
        <Marginer direction="vertical" margin={25}></Marginer>
        <LabelInputFile whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} htmlFor="inputFile">
          Upload an image
        </LabelInputFile>
        <InputFile accept="image/*" onChange={handleFileChange} id="inputFile" name="inputFile" type="file"></InputFile>
      </SimpleColumn>
      <Marginer direction="vertical" margin={"60px"}></Marginer>
    </Container>
  );
};
