import React, { useEffect, useState } from "react";
import AddIco from "../../assets/addIco.svg";
import { Column, ColumnHeader, ColumnsContainer, Ico, Section, SimpleRow, Subtitle, Text } from "./dashboardContent";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../../firebase";
export const Posts = ({ setShowPostModal, updatePostsCounter }) => {
  const { currentUser } = useAuth();
  const posts = [];
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const fetchPosts = async () => {
    setLoading(true);
    const response = await db.collection("posts").where("offeredBy", "==", `${currentUser.email}`).get();
    response.forEach((doc) => posts.push(doc.data()));
    setData(posts);
    setLoading(false);
    updatePostsCounter(posts.length);
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <Section maxHeight="300px">
      <SimpleRow>
        <Subtitle> Posts </Subtitle>
        <Ico
          initial={{ scale: 1 }}
          whileHover={{
            rotate: 180,
            scale: 0.95,
            borderRadius: "10px",
            boxShadow: "0px 0px 20px rgba(244, 68, 46, 0.2)",
            backgroundColor: "rgba(244, 68, 46, 0.1)",
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          whileTap={{ scale: 1.4 }}
          hoverP
          style={{ marginRight: "20px" }}
          width={"45px"}
          height={"45px"}
          image={AddIco}
          onClick={() => setShowPostModal(true)}
        ></Ico>
      </SimpleRow>
      {loading && <Text>LOADING...</Text>}
      {!loading && (
        <>
          {posts.length !== 0 ? (
            <Text>No hay posts</Text>
          ) : (
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
        </>
      )}
    </Section>
  );
};
