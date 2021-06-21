import React, { useEffect, useState } from "react";
import {
  Column,
  ColumnHeader,
  Section,
  SimpleRow,
  Subtitle,
  Text,
} from "../components/dashboard/DashboardContent/dashboardContent";
import { Marginer } from "../components/Marginer";
import styled from "styled-components";
import { motion } from "framer-motion";
export const SectionButton = styled(motion.button)`
  outline: none;
  flex-basis: ${(props) => props.flexBasis};
  padding: 6px 10px;
  width: 80px;
  background-color: ${(props) => props.BgColor || "#57e416"};
  color: ${(props) => props.color || "#363636"};
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;

export const OffersMocked = ({ loading, locationQuery, setLocationQuery, data }) => {
  return (
    <>
      <Section minWidth="350px" width={"100%"} maxHeight="400px">
        <SimpleRow width="100%" backgroundColor="#fff">
          {locationQuery !== "" && (
            <>
              <Subtitle data-testid="locationQueryText" fontSize="1.5rem">
                Available offers in "{locationQuery}" city/town
              </Subtitle>
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
        {!loading && (
          <Column justifyContent="stretch">
            <SimpleRow padding="0 20px" borderRadius="20px" width="100%">
              <ColumnHeader flexBasis="15%">Title</ColumnHeader>
              <ColumnHeader flexBasis="40%">Description</ColumnHeader>
              <ColumnHeader flexBasis="15%">City</ColumnHeader>
              <ColumnHeader flexBasis="15%">Type</ColumnHeader>
              <ColumnHeader flexBasis="15%"> Pick</ColumnHeader>
            </SimpleRow>
            {data.map((post, i) => (
              <SimpleRow padding="0 20px" borderRadius="20px" key={`OFFER:${post.id}:${i}`} BgColor={i} width="100%">
                <Text flexBasis="15%" key={`OFFER_TITLE:${post.id}:${post.title}`}>
                  {post.title}
                </Text>
                <Text textAlign="justify" flexBasis="40%" key={`OFFER_DESCRIPTION:${post.id}:${post.description}`}>
                  {post.description}
                </Text>
                <Text flexBasis="15%" key={`OFFER_CITY:${post.id}:${post.city}`}>
                  {post.city}
                </Text>
                <Text flexBasis="15%" key={`OFFER_TYPEOFOFFER:${post.id}:${post.typeOfOffer}`}>
                  {post.typeOfOffer}
                </Text>
                <SectionButton
                  flexBasis="15%"
                  key={`OFFER_BUTTON:${post.id}`}
                  onClick={() => handlePick(post.id)}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 5px 5px #88f855" }}
                >
                  I want it
                </SectionButton>
              </SimpleRow>
            ))}
          </Column>
        )}
      </Section>
    </>
  );
};
