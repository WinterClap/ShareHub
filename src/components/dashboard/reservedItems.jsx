import React, { useEffect } from "react";
import { Column, ColumnHeader, ColumnsContainer, Section, SimpleRow, Subtitle, Text } from "./dashboardContent";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { db } from "../../firebase";
import { SectionButton } from "./offers";

export const ReservedItems = ({ updateGiftsCounter }) => {
  const { currentUser } = useAuth();
  const [gifts, setGifts] = useState([]);

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
  return (
    <Section width="100%" maxHeight="400px">
      <SimpleRow width="100%" backgroundColor="#fff">
        <Subtitle>Gift Cart </Subtitle>
      </SimpleRow>
      <ColumnsContainer>
        <Column>
          <ColumnHeader>Title</ColumnHeader>
          {gifts.map((post) => (
            <Text key={`takenBy:${post.takenBy} ${post.id}`}>{post.title}</Text>
          ))}
        </Column>
        <Column>
          <ColumnHeader>Status</ColumnHeader>
          {gifts.map((post) => (
            <Text key={`cancel:${post.id}`}>{post.status}</Text>
          ))}
        </Column>
        <Column>
          <ColumnHeader>Cancel</ColumnHeader>
          {gifts.map((post) => (
            <SectionButton
              key={`GIFT:${post.id}:BUTTON`}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05, boxShadow: "0 5px 5px #f89191" }}
              BgColor="#e02f37"
              color="#fff"
              onClick={() => handleCancelRequest(post.id)}
            >
              Cancel
            </SectionButton>
          ))}
        </Column>
      </ColumnsContainer>
    </Section>
  );
};
