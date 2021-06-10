import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Marginer } from "../Marginer";
import { Container, HeaderContainer, SimpleRow, Title, Ico, SimpleColumn } from "./dashboardContent";
import { storage } from "../../firebase";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
const Form = styled.form`
  width: 100%;
  display: flex;

  justify-content: space-around;
  align-items: center;
`;
const Input = styled.input`
  width: 400px;
  padding: 10px 25px;
  border-radius: 10px;
  outline: none;
  border: 2px solid #bababa;
  font-size: 1rem;
  transition: border 150ms ease-in-out;
  &:not(:last-of-type) {
    margin-bottom: 20px;
  }
  &:focus {
    border: 2px solid #f4442e;
  }
`;

const Label = styled.label`
  font-size: 1.1rem;
  margin-bottom: 10px;
`;

const PhotoContainer = styled.div`
  background-image: url(${(props) => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const Button = styled.button`
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  outline: 0;
  box-shadow: 0px 10px 10px rgba(15, 15, 15, 0.2);
  border: none;
  background-color: rgba(205, 205, 205, 0.1);
  background-image: url(${(props) => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  font-size: ${(props) => props.fontSize || "1rem"};
  border-radius: 20px;
  margin-top: 25px;
  padding: 10px;
  transition: box-shadow 150ms ease-in-out;
  transition: background 150ms ease-in-out;
  font-weight: 600;
  &:hover {
    background: #f4442e;
    color: #fff;
    box-shadow: 0px 10px 10px rgba(244, 68, 46, 0.2);
  }
`;
const InputFile = styled.input`
  border-radius: 20px;
  padding: 10px;
  background-color: transparent;
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
`;
const LabelInputFile = styled(motion.label)`
  font-size: 1.3rem;
  font-weight: 600;
  padding: 10px;
  border-radius: 20px;
  background-color: #f4442e;
  color: #fff;
  cursor: pointer;
`;

//TODO: Update image when needed (remove previous pic)
export const MyAccount = () => {
  const { currentUser } = useAuth();
  const [userImageUrl, setUserImageUrl] = useState();
  const ref = currentUser.email;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log("Uploading pic...");
    storage
      .ref(`${ref}`)
      .child(`${ref}`)
      .getDownloadURL()
      .then(() => storage.ref(`${ref}`).child(`${ref}`).delete())
      .then(() => storage.ref(`${ref}`).child(`${ref}`).put(file))
      .then(() => getUserImageUrl())
      .then(console.log("Profile picture updated"))
      .catch(async () => {
        await storage.ref(`${ref}`).child(`${ref}`).put(file);
        console.log("No previous image detected. Path created");
        await getUserImageUrl();
      });
  };
  const getUserImageUrl = () => {
    storage
      .ref(`${currentUser.email}`)
      .child(`${currentUser.email}`)
      .getDownloadURL()
      .then((url) => setUserImageUrl(url))
      .catch(() => {
        console.log("Error getting the image. Using default-image instead");
        storage
          .ref("default")
          .child("defaultProfilePic.svg")
          .getDownloadURL()
          .then((url) => setUserImageUrl(url));
      });
  };

  useEffect(() => {
    getUserImageUrl();
  }, []);
  return (
    <Container>
      <HeaderContainer>
        <Title>My Account</Title>
      </HeaderContainer>
      <Marginer direction="vertical" margin={"20px"}></Marginer>
      <SimpleColumn>
        <PhotoContainer image={userImageUrl}></PhotoContainer>
        <Marginer direction="vertical" margin={25}></Marginer>
        <LabelInputFile whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} htmlFor="inputFile">
          Upload an image
        </LabelInputFile>
        <InputFile accept="image/*" onChange={handleFileChange} id="inputFile" name="inputFile" type="file"></InputFile>
      </SimpleColumn>
      <Marginer direction="vertical" margin={"60px"}></Marginer>
      <SimpleRow justifyContent="space-around">
        <Form onSubmit={() => console.log("saving...")}>
          <SimpleRow>
            <SimpleColumn>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="First Name"></Input>
              <Label htmlFor="lastName"> Last Name</Label>
              <Input id="lastName" placeholder="Last Name"></Input>
            </SimpleColumn>
          </SimpleRow>
          <Button fontSize="2.2rem" height="100px" width="200px" type="submit">
            Save
          </Button>
        </Form>
      </SimpleRow>
    </Container>
  );
};
