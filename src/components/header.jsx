import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled.div`
  width: 500px;
  height: 450px;
  margin-left: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 4rem;
  width: 400px;
  font-weight: 500;
  color: #fff;
  strong {
    font-weight: 700;
  }
`;

export const Header = () => {
  return (
    <Container>
      <Title>
        Find <strong>community offers</strong> here
      </Title>
    </Container>
  );
};
