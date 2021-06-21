import styled from "styled-components";
import HomeBG from "../../assets/SearchMainPage.svg";
import { Footer } from "../Footer/footer";
import { Header } from "../Header/header";
import { NavBar } from "../NavBar/navBar";
import { ShowCase } from "../ShowCase/showCase";

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
      <HomeSection data-testid="home-section">
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
