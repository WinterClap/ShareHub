import React from "react";
import styled from "styled-components";
import { HeaderText } from "../Header/header";
import AnythingBg from "../../assets/anything.svg";
import ObjectBg from "../../assets/objects.svg";
import FoodBg from "../../assets/food.svg";
import { motion } from "framer-motion";
const Container = styled(motion.aside)`
  display: flex;
  margin: 20px 0 0 80px;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  width: 800px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(3px);
`;

const Item = styled.div`
  margin: 20px 0;
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
const Image = styled(motion.div)`
  background-repeat: no-repeat;
  background-size: contain;
  width: 150px;
  height: 150px;
  background-position: center;
  background-image: url(${(props) => props.image});
`;

const variants = {
  initial: { y: 0, scale: 1 },
  final: { y: -10, scale: 1.15 },
};
const container = {
  hidden: { opacity: 0, x: -100 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.5,
    },
  },
};
const ImageBox = ({ image, delay }) => {
  return (
    <Image
      image={image}
      variants={variants}
      initial="initial"
      animate="final"
      transition={{ repeat: Infinity, duration: 2, repeatType: "reverse", delay: parseInt(delay) }}
    ></Image>
  );
};
export const ShowCase = () => {
  return (
    <Container variants={container} initial="hidden" animate="show">
      <Item>
        <ImageBox image={FoodBg} delay="0.5" />
        <HeaderText color="#3f3d56">
          <strong>Food</strong>
        </HeaderText>
      </Item>
      <Item>
        <ImageBox image={ObjectBg} delay="1" />
        <HeaderText color="#3f3d56">
          <strong>Objects</strong>
        </HeaderText>
      </Item>
      <Item>
        <ImageBox image={AnythingBg} delay="1.5" />
        <HeaderText color="#3f3d56">
          <strong>Anything</strong>
        </HeaderText>
      </Item>
    </Container>
  );
};
