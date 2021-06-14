import React, { useEffect, useState } from "react";
import { Column, ColumnHeader, ColumnsContainer, Section, SimpleRow, Subtitle, Text } from "./dashboardContent";
import { db } from "../../firebase";
import { Marginer } from "../Marginer";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
export const SectionButton = styled(motion.button)`
  outline: none;
  padding: 6px 10px;
  width: 80px;
  background-color: ${(props) => props.BgColor || "#57e416"};
  color: ${(props) => props.color || "#363636"};
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  &:first-of-type {
    margin-top: 13.6px;
  }
  &:not(:last-of-type) {
    margin-bottom: 17.6px;
  }
`;

export const Offers = ({ updateOffersCounter, locationQuery, setLocationQuery }) => {
  const { currentUser } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const fetchOffers = async (locationQuery) => {
    setLoading(true);
    let posts = [];
    if (locationQuery !== "") {
      db.collection("posts")
        .where("status", "==", "Available")
        .where("offeredBy", "!=", `${currentUser.email}`)
        .where("city", "==", `${locationQuery}`)
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            posts.push({ ...doc.data(), id: doc.id });
          });
          setData(posts);
          updateOffersCounter(posts.length);
          posts = [];
        });
    } else {
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
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchOffers(locationQuery);
  }, [locationQuery]);

  const handlePick = async (id) => {
    db.collection("posts")
      .doc(id)
      .update({ status: "Claimed", takenBy: `${currentUser.email}` });
  };

  return (
    <>
      <Section minWidth="200px" width={"100%"} maxHeight="400px">
        <SimpleRow width="100%" backgroundColor="#fff">
          {locationQuery !== "" && (
            <>
              <Subtitle fontSize="1.5rem"> Available offers in "{locationQuery}" city/town</Subtitle>
              <SectionButton
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05, boxShadow: "0 5px 5px #f89191" }}
                BgColor="#e02f37"
                color="#fff"
                onClick={() => {
                  return setLocationQuery("");
                }}
              >
                Reset
              </SectionButton>
            </>
          )}
          {locationQuery == "" && <Subtitle> Available offers</Subtitle>}
        </SimpleRow>
        <Marginer direction="vertical" margin={10}></Marginer>
        {loading && <Text>LOADING...</Text>}
        {/* TODO: fix the UI rows here. */}
        {!loading && (
          <ColumnsContainer>
            <Column>
              <ColumnHeader>Title</ColumnHeader>
              {data.map((post) => (
                <Text key={`OFFER:${post.id}:${post.title}`}>{post.title}</Text>
              ))}
            </Column>
            <Column width="50%">
              <ColumnHeader>Description</ColumnHeader>
              {data.map((post) => (
                <Text key={`OFFER:${post.id}:${post.description}`}>{post.description}</Text>
              ))}
            </Column>
            <Column>
              <ColumnHeader>City</ColumnHeader>
              {data.map((post) => (
                <Text key={`OFFER:${post.id}:${post.city}`}>{post.city}</Text>
              ))}
            </Column>
            <Marginer direction="horizontal" margin={20}></Marginer>
            <Column>
              <ColumnHeader>Type</ColumnHeader>
              {data.map((post) => (
                <Text key={`OFFER:${post.id}:${post.typeOfOffer}`}>{post.typeOfOffer}</Text>
              ))}
            </Column>
            <Marginer direction="horizontal" margin={20}></Marginer>
            <Column>
              <ColumnHeader>Pick</ColumnHeader>
              {data.map((post) => (
                <SectionButton
                  key={`OFFER:${post.id}:BUTTON`}
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
