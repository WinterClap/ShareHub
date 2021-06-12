import React, { useEffect } from "react";
import { Column, ColumnHeader, ColumnsContainer, Section, SimpleRow, Subtitle, Text } from "./dashboardContent";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { db } from "../../firebase";

//TODO: cancel claimed elements and return them to the global list. Basically update post status: "Available" and takenBy: "" keys
export const ReservedItems = ({ updateGiftsCounter }) => {
  const { currentUser } = useAuth();
  const [gifts, setGifts] = useState([]);

  const fetchGifts = async () => {
    let posts = [];
    db.collection("posts")
      .where("takenBy", "==", `${currentUser.email}`)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          posts.push(doc.data());
        });
        setGifts(posts);
        updateGiftsCounter(posts.length);
        posts = [];
      });
  };

  useEffect(() => {
    fetchGifts();
  }, []);

  return (
    <Section width="350px" maxHeight="400px">
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
      </ColumnsContainer>
    </Section>
  );
};
