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

  useEffect(() => {
    let unsubscribe;
    const fetchPosts = async () => {
      setLoading(true);
      unsubscribe = db
        .collection("posts")
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
    fetchPosts();
    return unsubscribe;
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
          {posts.length !== 0 ? (
            <Text>No hay posts</Text>
          ) : (
            <Column justifyContent="stretch">
              <SimpleRow padding="0 20px" borderRadius="20px" width="100%">
                <ColumnHeader flexBasis="10%">Title</ColumnHeader>
                <ColumnHeader flexBasis="40%">Description</ColumnHeader>
                <ColumnHeader flexBasis="10%">Type</ColumnHeader>
                <ColumnHeader flexBasis="10%">Cancel</ColumnHeader>
              </SimpleRow>
              {data.map((post, i) => (
                <SimpleRow padding="0 20px" borderRadius="20px" key={`OFFER:${post.id}:${i}`} BgColor={i} width="100%">
                  <Text flexBasis="10%" key={`POST_TITLE:${post.id}:${post.title}`}>
                    {post.title}
                  </Text>
                  <Text flexBasis="40%" key={`POST_DESCRIPTION:${post.id}:${post.description}`}>
                    {post.description}
                  </Text>
                  <Text flexBasis="10%" key={`POST_TYPEOFOFFER:${post.id}:${post.typeOfOffer}`}>
                    {post.typeOfOffer}
                  </Text>
                  <SectionButton
                    flexBasis="10%"
                    key={`POST_BUTTON:${post.id}`}
                    onClick={() => handleCancel(post.id)}
                    BgColor="#e02f37"
                    color="#fff"
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 5px 5px #f89191" }}
                  >
                    Cancel
                  </SectionButton>
                </SimpleRow>
              ))}
            </Column>
          )}
        </>
      )}
    </Section>
  );
};
