import React, { useEffect, useState } from "react";
import AddIco from "../../assets/addIco.svg";
import { Column, ColumnHeader, ColumnsContainer, Ico, Section, SimpleRow, Subtitle, Text } from "./dashboardContent";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../../firebase";
import { SectionButton } from "./offers";
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

  const handleCancel = async (id) => {
    console.log("Removing: " + id);
    db.collection("posts").doc(id).delete();
  };
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
          {/* TODO: posts.length is always 0. Fix this functionality */}
          {posts.length !== 0 ? (
            <Text>No hay posts</Text>
          ) : (
            <ColumnsContainer>
              <Column>
                <ColumnHeader>Title</ColumnHeader>
                {data.map((post) => (
                  <Text key={`POST:${post.id}:${post.title}`}>{post.title}</Text>
                ))}
              </Column>
              <Column width="50%">
                <ColumnHeader>Description</ColumnHeader>
                {data.map((post) => (
                  <Text key={`POST:${post.id}:${post.description}`}>{post.description}</Text>
                ))}
              </Column>
              <Column>
                <ColumnHeader>Cancel</ColumnHeader>
                {data.map((post) => (
                  <SectionButton
                    key={`POST:${post.id}:BUTTON`}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 5px 5px #f89191" }}
                    BgColor="#e02f37"
                    color="#fff"
                    onClick={() => handleCancel(post.id)}
                  >
                    Cancel
                  </SectionButton>
                ))}
              </Column>
            </ColumnsContainer>
          )}
        </>
      )}
    </Section>
  );
};
