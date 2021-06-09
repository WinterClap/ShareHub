import React, { useEffect, useState } from "react";
import { Column, ColumnHeader, ColumnsContainer, Section, SimpleRow, Subtitle, Text } from "./dashboardContent";
import { db } from "../../firebase";
import { Marginer } from "../Marginer";

export const Offers = ({ updateOffersCounter }) => {
  const posts = [];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const fetchPosts = async () => {
    setLoading(true);
    const response = await db.collection("posts").get();
    response.forEach((doc) => posts.push(doc.data()));
    setData(posts);
    setLoading(false);
    updateOffersCounter(posts.length);
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Section maxHeight="500px">
      <SimpleRow backgroundColor="#fff">
        <Subtitle> Offers </Subtitle>
      </SimpleRow>
      <Marginer direction="vertical" margin={20}></Marginer>
      {loading && <Text>LOADING...</Text>}
      {!loading && (
        <ColumnsContainer>
          <Column>
            <ColumnHeader>Title</ColumnHeader>
            {data.map((post) => (
              <Text key={post.title}>{post.title}</Text>
            ))}
          </Column>
          <Column>
            <ColumnHeader>Description</ColumnHeader>
            {data.map((post) => (
              <Text key={post.description}>{post.description}</Text>
            ))}
          </Column>
          <Column>
            <ColumnHeader>Column3</ColumnHeader>
          </Column>
        </ColumnsContainer>
      )}
    </Section>
  );
};
