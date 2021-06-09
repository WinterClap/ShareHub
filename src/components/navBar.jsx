import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import "../App.css";
import SHLogo from "../assets/SHLogo.svg";
const NavBarObject = styled.nav`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
  margin: 20px 10px;
  border: 1px solid white;
  ul {
    font-size: 1.25rem;
    font-weight: 500;
  }
  li {
    display: inline;
    padding: 8px 25px;
    &:last-of-type {
      margin-left: 20px;
      border-radius: 12px;
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
  a {
    text-decoration: none;
    transition: all 200ms ease-in-out;
    color: #fff;
    &:hover {
      color: #ffffffb7;
    }
  }
`;
const LinkContainer = styled.div`
  display: flex;

  flex-wrap: no-wrap;
  justify-content: center;
  align-items: center;
  /*  margin-right: calc(100vw - 1200px); */
`;

const LogoContainer = styled.div`
  margin-left: 50px;
  font-family: Alfa Slab One;
  width: 250px;
  height: 50px;
  display: flex;
  background-color: transparent;
  align-items: center;
  justify-content: space-between;
  font-size: 2rem;
  color: #fff;
  a {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    &:hover {
      color: #fff;
    }
  }
  img {
    width: 50px;
    height: 50px;
  }
`;

const MenuContainer = styled.div`
  width: 30px;
  height: 30px;
`;
export const NavBar = () => {
  return (
    <NavBarObject>
      <LogoContainer>
        <Link to="/">
          <span>Share </span> <img src={SHLogo} alt="Logo" /> <span> Hub </span>
        </Link>
      </LogoContainer>
      <LinkContainer>
        <ul>
          <li>
            <NavLink to="/featured" activeClassName="activeLink">
              Featured
            </NavLink>
          </li>
          <li>
            <NavLink to="/offers" activeClassName="activeLink">
              Find Offers
            </NavLink>
          </li>
          <li>
            <NavLink to="/post_offer" activeClassName="activeLink">
              Post Offers
            </NavLink>
          </li>
          <li>
            <NavLink to="/signin" activeClassName="activeLink">
              Sign in
            </NavLink>
          </li>
        </ul>
      </LinkContainer>
      <MenuContainer></MenuContainer>
    </NavBarObject>
  );
};
