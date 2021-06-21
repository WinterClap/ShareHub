import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  width: 500px;
  height: 500px;
  margin-left: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(3px);
`;

const Title = styled.h1`
  margin-top: 0;
  font-size: 4rem;
  width: 400px;
  font-weight: 500;
  color: #fff;
  strong {
    font-weight: 700;
  }
`;

export const HeaderText = styled.p`
  font-size: 2rem;
  margin: 0 30px;
  color: ${(props) => props.color || "#fff"};
  text-align: justify;
  font-weight: 500;
  strong {
    font-weight: 700;
  }
`;
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
export const Header = () => {
  return (
    <Container variants={container} initial="hidden" animate="show">
      <Title>
        Find <strong>community offers</strong> here
      </Title>
      <HeaderText>
        Help your community by giving away <strong>extra food</strong> or <strong>anything</strong> you want to the
        people who need it.
      </HeaderText>
    </Container>
  );
};
