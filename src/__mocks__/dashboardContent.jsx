import React, { useState } from "react";
import styled from "styled-components";
import OffersIco from "../assets/offersIco.svg";
import PostsIco from "../assets/postsIcon.svg";
import GiftsIco from "../assets/GiftsIco.svg";
import SearchButton from "../assets/searchButton.svg";
import { motion } from "framer-motion";
import { Offers } from "../components/dashboard/Offers/offers";
import { Posts } from "../components/dashboard/Posts/posts";
import { Marginer } from "../components/Marginer";
import { Gifts } from "../components/dashboard/Gifts/gifts";
export const SimpleColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: ${(props) => props.width || "auto"};
  padding: ${(props) => props.padding || "auto"};
  justify-content: ${(props) => props.justifyContent || "center"};
  align-items: ${(props) => props.alignItems || "center"};
`;
export const SimpleRow = styled.div`
  padding: ${(props) => props.padding || "auto"};
  display: flex;
  flex-wrap: ${(props) => props.wrap || "nowrap"};
  position: ${(props) => props.pos || "static"};
  z-index: 10;
  ${(props) => (props.position === "static" ? "top: 0px;" : "")};
  flex-wrap: nowrap;
  justify-content: ${(props) => props.justifyContent || "space-between"};
  align-items: ${(props) => props.alignItems || "center"};
  width: ${(props) => props.width || "auto"};
  border-radius: ${(props) => props.borderRadius || "none"};
  ${(props) =>
    props.BgColor % 2 !== 0 && typeof props.BgColor == "number"
      ? "background-color: #bfbfbf86;"
      : `background-color: ${props.backgroundColor || "null"}`}
`;
export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  color: #f4442e;
`;

export const SectionText = styled.p`
  font-size: 3rem;
  font-weight: 400;
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
  width: calc(100vw - 380px);
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
  font-size: ${(props) => props.fontSize || "2rem"};
  font-weight: 500;
`;
export const Section = styled.section`
  padding: 15px 10px 15px 15px;
  background-color: #fff;
  border-radius: 25px;
  position: relative;
  overflow: auto;
  min-width: ${(props) => props.minWidth || "350px"};
  width: ${(props) => props.width || "auto"};
  max-height: ${(props) => props.maxHeight || "auto"};
  &:not(:last-of-type) {
    margin-bottom: 25px;
  }
`;
const CounterSectionContainer = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;

const CounterSection = styled.div`
  min-width: 200px;
  max-width: 250px;
  padding: 15px 25px;
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
  align-items: flex-start;
`;
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  align-items: ${(props) => props.alignItems || "flex-start"};
  width: ${(props) => props.width || "auto"};
`;
export const ColumnHeader = styled.h3`
  font-size: 1.2rem;
  color: #6d6d6d;
  padding: ${(props) => props.padding || "0 5px"};
  font-weight: 600;
  flex-basis: ${(props) => props.flexBasis || "auto"};
`;
export const Text = styled.p`
  font-size: 1.1rem;
  color: black;
  font-weight: 400;
  text-align: ${(props) => props.textAlign || "auto"};
  padding: ${(props) => props.padding || "0 5px"};
  flex-basis: ${(props) => props.flexBasis || "auto"};
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
  width: 30px;
  height: 30px;
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
export const DashboardContentMocked = ({ currentUser }) => {
  const [showPostModal, setShowPostModal] = useState(false);
  const [offersCounter, setOffersCounter] = useState(0);
  const [postsCounter, setPostsCounter] = useState(0);
  const [giftsCounter, setGiftsCounter] = useState(0);
  const [locationQuery, setLocationQuery] = useState("");
  let location = "";
  const updateOffersCounter = (value) => {
    return setOffersCounter(value);
  };
  const updatePostsCounter = (value) => {
    return setPostsCounter(value);
  };
  const updateGiftsCounter = (value) => {
    return setGiftsCounter(value);
  };

  const handleLocationSearch = () => {
    setLocationQuery(location);
    document.getElementById("searchLocationInput").value = "";
  };
  return (
    <>
      <Container>
        <HeaderContainer>
          <Title>Posts & Offers</Title>
          <InputContainerHeader>
            <InputHeader
              id="searchLocationInput"
              whileFocus={{ scale: 0.99 }}
              placeholder="Enter your location"
              onChange={(e) => {
                return (location = e.target.value);
              }}
              onKeyPress={(e) => (e.key === "Enter" ? handleLocationSearch() : "")}
            ></InputHeader>
            <ImageBoxHeader
              whileHover={{ scale: 0.95, transition: 1 }}
              whileTap={{ scale: 1.05, transition: 1 }}
              onClick={() => handleLocationSearch()}
            ></ImageBoxHeader>
          </InputContainerHeader>
        </HeaderContainer>
        <Marginer direction="vertical" margin={30}></Marginer>
        <CounterSectionContainer>
          <CounterSection>
            <Ico width={"100%"} height={"100px"} image={OffersIco}></Ico>
            <SimpleColumn padding="0 8px">
              <Counter>{offersCounter}</Counter>
              <CounterSectionSubtitle>Offers</CounterSectionSubtitle>
            </SimpleColumn>
          </CounterSection>
          <CounterSection>
            <Ico width={"100%"} height={"100px"} image={PostsIco}></Ico>
            <SimpleColumn padding="0 8px">
              <Counter>{postsCounter}</Counter>
              <CounterSectionSubtitle>Posts</CounterSectionSubtitle>
            </SimpleColumn>
          </CounterSection>
          <CounterSection>
            <Ico width={"100%"} height={"100px"} image={GiftsIco}></Ico>
            <SimpleColumn padding="0 8px">
              <Counter>{giftsCounter}</Counter>
              <CounterSectionSubtitle>Gifts</CounterSectionSubtitle>
            </SimpleColumn>
          </CounterSection>
        </CounterSectionContainer>
        <SimpleRow wrap="wrap" width="100%" backgroundColor="#fafafa">
          <SimpleColumn padding="0 50px" width="100%">
            <Offers
              setLocationQuery={setLocationQuery}
              locationQuery={locationQuery}
              updateOffersCounter={updateOffersCounter}
            ></Offers>
            <Marginer direction="vertical" margin={30}></Marginer>
            <Posts updatePostsCounter={updatePostsCounter} setShowPostModal={setShowPostModal}></Posts>
            <Marginer direction="vertical" margin={30}></Marginer>
            <Gifts updateGiftsCounter={updateGiftsCounter}></Gifts>
          </SimpleColumn>
        </SimpleRow>
      </Container>
    </>
  );
};
