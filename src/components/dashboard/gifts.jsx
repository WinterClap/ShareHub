import React, { useEffect } from "react";
import { Column, ColumnHeader, ColumnsContainer, Section, SimpleRow, Subtitle, Text } from "./dashboardContent";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { db } from "../../firebase";
import { SectionButton } from "./offers";
import { ModalInfo } from "./modalInfo";

export const Gifts = ({ updateGiftsCounter }) => {
  const { currentUser } = useAuth();
  const [gifts, setGifts] = useState([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedID, setSelectedID] = useState();

  const fetchGifts = async () => {
    let posts = [];
    db.collection("posts")
      .where("takenBy", "==", `${currentUser.email}`)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });
        setGifts(posts);
        updateGiftsCounter(posts.length);
        posts = [];
      });
  };

  useEffect(() => {
    fetchGifts();
  }, []);

  const handleCancelRequest = (id) => {
    db.collection("posts").doc(id).update({ takenBy: "", status: "Available" });
    return console.log("Cancel Request:" + id);
  };
  const handleViewRequest = (id) => {
    setSelectedID(id);
    setShowAddressModal(true);
  };
  return (
    <Section width="100%" maxHeight="400px">
      <ModalInfo
        id={selectedID}
        showAddressModal={showAddressModal}
        setShowAddressModal={setShowAddressModal}
      ></ModalInfo>
      <SimpleRow width="100%" backgroundColor="#fff">
        <Subtitle>Gift Cart </Subtitle>
      </SimpleRow>

      <Column justifyContent="stretch">
        <SimpleRow padding="0 20px" borderRadius="20px" width="100%">
          <ColumnHeader flexBasis="20%">Title</ColumnHeader>
          <ColumnHeader flexBasis="30%">Description</ColumnHeader>
          <ColumnHeader flexBasis="15%">Status</ColumnHeader>
          <ColumnHeader flexBasis="15%">City</ColumnHeader>
          <ColumnHeader flexBasis="10%">Cancel</ColumnHeader>
          <ColumnHeader flexBasis="10%"> View </ColumnHeader>
        </SimpleRow>
        {gifts.map((post, i) => (
          <SimpleRow padding="0 20px" borderRadius="20px" key={`OFFER:${post.id}:${i}`} BgColor={i} width="100%">
            <Text flexBasis="20%" key={`GIFT_TITLE:${post.id}:${post.title}`}>
              {post.title}
            </Text>
            <Text flexBasis="30%" key={`GIFT_DESCRIPTION:${post.id}:${post.description}`}>
              {post.description}
            </Text>
            <Text flexBasis="15%" key={`GIFT_STATUS:${post.id}:${post.status}`}>
              {post.status}
            </Text>
            <Text flexBasis="15%" key={`GIFT_CITY:${post.id}:${post.city}`}>
              {post.city}
            </Text>
            <SectionButton
              flexBasis="10%"
              key={`GIFT:${post.id}:BUTTON:CANCEL`}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05, boxShadow: "0 5px 5px #f89191" }}
              BgColor="#e02f37"
              color="#fff"
              onClick={() => handleCancelRequest(post.id)}
            >
              Cancel
            </SectionButton>
            <SectionButton
              key={`GIFT:${post.id}:BUTTON`}
              flexBasis="10%"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05, boxShadow: "0 5px 5px #88f855" }}
              onClick={() => handleViewRequest(post.id)}
            >
              View
            </SectionButton>
          </SimpleRow>
        ))}
      </Column>
    </Section>
  );
};
