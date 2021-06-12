import React, { useEffect, useState } from "react";
import { Column, ColumnHeader, ColumnsContainer, Section, SimpleRow, Subtitle, Text } from "./dashboardContent";
import { db } from "../../firebase";
import { Marginer } from "../Marginer";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
export const SectionButton = styled(motion.button)`
  outline: none;
  padding: 6px;
  background-color: #57e416;
  color: #363636;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  &:first-of-type {
    margin-top: 15.6px;
  }
  &:not(:last-of-type) {
    margin-bottom: 17.6px;
  }
`;

export const Offers = ({ updateOffersCounter }) => {
  const { currentUser } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const fetchOffers = async () => {
    setLoading(true);
    let posts = [];
    db.collection("posts")
      .where("status", "==", "Available")
      .where("offeredBy", "!=", `${currentUser.email}`)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });
        setData(posts);
        updateOffersCounter(posts.length);
        posts = [];
      });
    setLoading(false);
  };
  useEffect(() => {
    fetchOffers();
  }, []);

  const handlePick = async (id) => {
    db.collection("posts")
      .doc(id)
      .get()
      .then((doc) =>
        `${currentUser.email}` == doc.data().offeredBy
          ? console.log("Iguales !")
          : db
              .collection("posts")
              .doc(id)
              .update({ status: "Claimed", takenBy: `${currentUser.email}` })
      );
  };

  return (
    <>
      <Section width={"100%"} maxHeight="400px">
        <SimpleRow width="100%" backgroundColor="#fff">
          <Subtitle> Available offers </Subtitle>
        </SimpleRow>
        <Marginer direction="vertical" margin={10}></Marginer>
        {loading && <Text>LOADING...</Text>}
        {!loading && (
          <ColumnsContainer>
            <Column>
              <ColumnHeader>Title</ColumnHeader>
              {data.map((post) => (
                <Text key={post.title}>{post.title}</Text>
              ))}
            </Column>
            <Column width="50%">
              <ColumnHeader>Description</ColumnHeader>
              {data.map((post) => (
                <Text key={post.description}>{post.description}</Text>
              ))}
            </Column>
            <Column>
              <ColumnHeader>Pick</ColumnHeader>
              {data.map((post) => (
                <SectionButton
                  onClick={() => handlePick(post.id)}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 5px 5px #88f855" }}
                >
                  I want it
                </SectionButton>
              ))}
            </Column>
          </ColumnsContainer>
        )}
      </Section>
    </>
  );
};
