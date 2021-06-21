import styled from "styled-components";
import React from "react";
import { SimpleColumn } from "../dashboard/DashboardContent/dashboardContent";
const FooterBox = styled.footer`
  width: 100%;
  background-color: #1b0000;
  color: #fff;
  font-weight: 500;
  margin: 0;
  font-size: 1rem;
  padding: 40px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  a {
    margin-top: 10px;
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    color: #f4442e;
  }
`;

export const Footer = () => {
  return (
    <FooterBox title="FooterBox">
      <Container>
        <SimpleColumn>
          <p>Icons from</p>
          <a href="https://www.flaticon.com/" title="Flaticon">
            Flaticon
          </a>
        </SimpleColumn>
        <SimpleColumn>
          <p>ShareHub</p>
        </SimpleColumn>
      </Container>
    </FooterBox>
  );
};
