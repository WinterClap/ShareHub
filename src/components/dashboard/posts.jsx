import React, { useEffect, useState } from "react";
import AddIco from "../../assets/addIco.svg";
import { Column, ColumnHeader, ColumnsContainer, Ico, Section, SimpleRow, Subtitle, Text } from "./dashboardContent";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../../firebase";
export const Posts = ({ setShowPostModal, updatePostsCounter }) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  let posts = [];
  const fetchPosts = async () => {
    setLoading(true);
    db.collection("posts")
      .where("offeredBy", "==", `${currentUser.email}`)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });
        setData(posts);
        updatePostsCounter(posts.length);
        posts = [];
      });
    setLoading(false);
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <Section width={"100%"} maxHeight="300px">
      <SimpleRow>
        <Subtitle> My Posts </Subtitle>
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
              <Column width="50%">
                <ColumnHeader>Description</ColumnHeader>
                {data.map((post) => (
                  <Text key={post.description}>{post.description}</Text>
                ))}
              </Column>
              <Column>
                <ColumnHeader>Status</ColumnHeader>
                {data.map((post) => (
                  <Text key={post.id}>{post.status}</Text>
                ))}
              </Column>
            </ColumnsContainer>
          )}
        </>
      )}
    </Section>
  );
};
