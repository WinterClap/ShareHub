import React, { useEffect } from "react";
import { Link, NavLink, useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { Marginer } from "../components/Marginer";
import { motion } from "framer-motion";
import "../App.css";
import myAccountIco from "../assets/myAccount.svg";
import dashboardIco from "../assets/dashboard.svg";
import logoutIco from "../assets/logoutIco.svg";
import SHLogo from "../assets/SHLogo.svg";
import ReactTooltip from "react-tooltip";

const Container = styled.aside`
  margin: 20px;
  height: 95vh;
  width: 300px;
  background-color: #fafafa;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 0px 15px rgba(15, 15, 15, 0.1);
  & > * {
    font-family: Rubik;
  }
  position: fixed;
  left: 0;
  bottom: 0;
`;
const Box = styled.div``;
const AsideNavBar = styled.nav`
  padding: 30px;
  border-radius: 20px;
`;
const Header = styled.header`
  margin-top: 10px;
  width: 100%;
  color: #ff1e00;
  img {
    display: block;
    width: 100px;
    height: 100px;
    margin: 0 auto;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-family: Alfa Slab One;
`;
const CategoryContainer = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  height: 100%;
`;
const CategoryIcon = styled.div`
  background-size: contain;
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-position: center;
  width: 40px;
  height: 40px;
  border-radius: ${(props) => (props.square ? "5px" : "50%")};
`;
const CategoryBox = styled.div`
  width: 180px;
  height: 60px;
  padding: 0px 10px;
  display: flex;
  justify-content: space-around;
  border-radius: 20px;
  align-items: center;
  &:not(:last-of-type) {
    margin-bottom: 20px;
  }
  background-color: ${(props) => props.active || "#fff"};
`;
const CategoryTitle = styled(NavLink)`
  font-size: 1rem;
  font-weight: 500;
  font-family: Rubik;
  text-decoration: none;
  color: #000;
  padding: 10px;
  border-radius: 20px;
  transition: all 200ms ease-in-out;
`;

const UserContainer = styled.footer`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  width: 290px;
  padding: 0 20px;
  border-radius: 20px;
  background-color: #fff;
  margin-bottom: 10px;
  box-shadow: 0px 10px 10px rgba(244, 68, 46, 0.15);
`;

const UserImage = styled.div`
  background-image: url(${(props) => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 50%;
  height: 50px;
  width: 50px;
`;
const UserWrapper = styled.div``;
const UserDimmedText = styled.h4`
  font-size: 0.8rem;
  font-weight: 400;
  color: #6d6d6d;
`;
const UserText = styled.h4`
  font-size: 1rem;
  font-weight: 500;
`;

const LogoutIco = styled(motion.button)`
  border-radius: 50%;
  height: 45px;
  width: 45px;
  background-position: center;
  background-size: contain;
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  margin-right: -20px;
  justify-self: flex-end;
  border: none;
  border: 1px solid #f8713f;
  cursor: pointer;
  background-color: #fff;
`;

export const DashboardNavBarMocked = ({ userImageUrl, currentUser, getUserImageUrl }) => {
  let { path, url } = useRouteMatch();
  const handleLogout = () => {};

  useEffect(() => {
    getUserImageUrl();
  }, []);
  return (
    <Container>
      <Box>
        <AsideNavBar>
          <Header>
            <Title>ShareHub</Title>
            <img src={SHLogo} alt="Logo"></img>
          </Header>
          <Marginer direction="vertical" margin={50}></Marginer>
          <CategoryContainer>
            <CategoryBox>
              <CategoryIcon image={dashboardIco}></CategoryIcon>
              <CategoryTitle
                aria-label="Dashboard"
                to={`${url}/content`}
                activeStyle={{
                  boxShadow: "0px 10px 10px #bb16004c",
                  color: "#fff",
                  backgroundColor: "#bb1600",
                }}
              >
                Dashboard
              </CategoryTitle>
            </CategoryBox>
            <CategoryBox>
              <CategoryIcon image={myAccountIco}></CategoryIcon>

              <CategoryTitle
                aria-label="MyAccount"
                to={`${url}/myaccount`}
                activeStyle={{
                  boxShadow: "0px 10px 10px #bb16004c",
                  color: "#fff",
                  backgroundColor: "#bb1600",
                }}
              >
                My account
              </CategoryTitle>
            </CategoryBox>
          </CategoryContainer>
        </AsideNavBar>
      </Box>
      <UserContainer>
        <UserImage image={userImageUrl}> </UserImage>
        <UserWrapper>
          <UserDimmedText>Account</UserDimmedText>
          <UserText>{currentUser.email || "No-User"}</UserText>
        </UserWrapper>
        <ReactTooltip id="logout" effect="solid">
          Logout
        </ReactTooltip>
        <Link data-testid="logoutButton" to="/home">
          <LogoutIco
            data-tip
            data-for="logout"
            aria-label="Logout"
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            image={logoutIco}
          ></LogoutIco>
        </Link>
      </UserContainer>
    </Container>
  );
};
