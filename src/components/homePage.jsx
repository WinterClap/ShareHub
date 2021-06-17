import styled from "styled-components";
import HomeBG from "../assets/SearchMainPage.svg";
import { Footer } from "./footer";
import { Header } from "./header";
import { NavBar } from "./navBar";
import { ShowCase } from "./showCase";

const HomeSection = styled.header`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const ImageContainer = styled.div`
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100vh;
  background-color: #ffdac7;
  background-image: url(${HomeBG});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export default function HomePage() {
  return (
    <>
      <HomeSection>
        <ImageContainer>
          <NavBar></NavBar>
          <Header></Header>
          <ShowCase></ShowCase>
        </ImageContainer>
      </HomeSection>
      <Footer></Footer>
    </>
  );
}
