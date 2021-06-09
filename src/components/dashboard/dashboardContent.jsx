import React, { useState } from "react";
import styled from "styled-components";
import OffersIco from "../../assets/offersIco.svg";
import PostsIco from "../../assets/postsIcon.svg";
import SearchButton from "../../assets/searchButton.svg";

import { motion } from "framer-motion";
import { PostModal } from "./postModal";
import { Offers } from "./offers";
import { Posts } from "./posts";
import { Marginer } from "../Marginer";
export const SimpleColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: ${(props) => props.justifyContent || "center"};
  align-items: ${(props) => props.alignItems || "center"};
`;
export const SimpleRow = styled.div`
  display: flex;
  position: ${(props) => props.pos || "static"};
  z-index: 10;
  ${(props) => (props.position === "static" ? "top: 0px;" : "")};
  background-color: ${(props) => props.backgroundColor || "auto"};
  flex-wrap: nowrap;
  justify-content: ${(props) => props.justifyContent || "space-between"};
  align-items: ${(props) => props.alignItems || "center"};
  width: ${(props) => props.width || "auto"};
`;
export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  color: #f4442e;
`;
export const HeaderContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
export const Container = styled.section`
  padding: 30px;
  box-shadow: 0px 0px 15px rgba(15, 15, 15, 0.1);
  width: calc(100vw - 450px);
  border-radius: 20px;
  background-color: #fafafa;
  & > * {
    font-family: Rubik;
  }
  margin: 30px 0;
  margin-right: 20px;
`;
export const Ico = styled(motion.div)`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100px"};
  background-image: url(${(props) => props.image});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 10px;
  &:hover {
    cursor: ${(props) => (props.hoverP ? "pointer" : "null")};
  }
`;
export const Subtitle = styled.h2`
  font-size: 2rem;
  font-weight: 500;
`;
export const Section = styled.section`
  padding: 15px 30px 15px 55px;
  background-color: #fff;
  border-radius: 25px;
  position: relative;
  overflow: auto;
  max-height: ${(props) => props.maxHeight || "auto"};
  &:not(:last-of-type) {
    margin-bottom: 25px;
  }
`;
const CounterSectionContainer = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const CounterSection = styled.div`
  min-width: 200px;
  max-width: 250px;
  padding: 15px 30px;
  background-color: #fff;
  border-radius: 25px;
  display: flex;
  border-radius: 20px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;
const CounterSectionSubtitle = styled.h5`
  font-size: 1.1rem;
  margin: 0;
  margin-top: 12px;
  color: #bfbfbf;
`;
const Counter = styled.h2`
  font-size: 3rem;
  margin: 0;
`;
export const ColumnsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const ColumnHeader = styled.h3`
  font-size: 1.1rem;
  color: #bfbfbf;
  font-weight: 400;
`;
export const Text = styled.p`
  font-size: 1.1rem;
  color: black;
  font-weight: 400;
`;

const InputContainerHeader = styled.div`
  height: 40px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ImageBoxHeader = styled(motion.button)`
  background-position: center;
  background-size: contain;
  background-image: url(${SearchButton});
  width: 50px;
  height: 50px;
  cursor: pointer;
  position: absolute;
  right: 0;
  outline: none;
  border: none;
  border-radius: 50%;
  margin-right: 8px;
`;
const InputHeader = styled(motion.input)`
  transition: all 100ms ease-in-out;
  border-radius: 50px;
  width: 350px;
  height: 45px;
  border: none;
  font-size: 1.2rem;
  padding: 10px 10px 10px 35px;
  outline: none;
  &:focus {
    border: 3px solid #fc9e4f;
  }
`;
export const DashboardContent = () => {
  const [showPostModal, setShowPostModal] = useState(false);
  const [offersCounter, setOffersCounter] = useState(0);

  const updateOffersCounter = (value) => {
    return setOffersCounter(value);
  };
  return (
    <>
      <Container>
        <PostModal showPostModal={showPostModal} setShowPostModal={setShowPostModal}></PostModal>
        <HeaderContainer>
          <Title>Posts & Offers</Title>
          <InputContainerHeader>
            <InputHeader whileFocus={{ scale: 0.99 }} placeholder="Enter your location"></InputHeader>
            <ImageBoxHeader
              whileHover={{ scale: 0.95, transition: 1 }}
              whileTap={{ scale: 1.05, transition: 1 }}
              type="submit"
            ></ImageBoxHeader>
          </InputContainerHeader>
        </HeaderContainer>
        <Marginer direction="vertical" margin={30}></Marginer>
        <CounterSectionContainer>
          <CounterSection>
            <Ico width={"100%"} height={"100px"} image={OffersIco}></Ico>
            <SimpleColumn>
              <Counter>{offersCounter}</Counter>
              <CounterSectionSubtitle>Offers</CounterSectionSubtitle>
            </SimpleColumn>
          </CounterSection>
          <CounterSection>
            <Ico width={"100%"} height={"100px"} image={PostsIco}></Ico>
            <SimpleColumn>
              <Counter>{Math.floor(Math.random() * 100)}</Counter>
              <CounterSectionSubtitle>Posts</CounterSectionSubtitle>
            </SimpleColumn>
          </CounterSection>
        </CounterSectionContainer>
        <Offers updateOffersCounter={updateOffersCounter}></Offers>
        <Posts updatePostsCounter={"1"} setShowPostModal={setShowPostModal}></Posts>
      </Container>
    </>
  );
};