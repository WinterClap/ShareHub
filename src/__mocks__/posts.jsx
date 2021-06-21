import React from "react";
import AddIco from "../assets/addIco.svg";
import {
  Column,
  ColumnHeader,
  Ico,
  Section,
  SimpleRow,
  Subtitle,
  Text,
} from "../components/dashboard/DashboardContent/dashboardContent";
import { SectionButton } from "../components/dashboard/Offers/offers";
export const PostsMocked = ({ loading, data }) => {
  const handleCancel = async () => {
    return true;
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
          <Column justifyContent="stretch">
            <SimpleRow padding="0 20px" borderRadius="20px" width="100%">
              <ColumnHeader flexBasis="15%">Title</ColumnHeader>
              <ColumnHeader flexBasis="40%">Description</ColumnHeader>
              <ColumnHeader flexBasis="15%">Status</ColumnHeader>
              <ColumnHeader flexBasis="15%">Type</ColumnHeader>
              <ColumnHeader flexBasis="15%">Cancel</ColumnHeader>
            </SimpleRow>
            {data.map((post, i) => (
              <SimpleRow padding="0 20px" borderRadius="20px" key={`OFFER:${post.id}:${i}`} BgColor={i} width="100%">
                <Text flexBasis="15%" key={`POST_TITLE:${post.id}:${post.title}`}>
                  {post.title}
                </Text>
                <Text textAlign="justify" flexBasis="40%" key={`POST_DESCRIPTION:${post.id}:${post.description}`}>
                  {post.description}
                </Text>
                <Text textAlign="justify" flexBasis="15%" key={`POST_STATUS:${post.id}:${post.status}`}>
                  {post.status}
                </Text>
                <Text flexBasis="15%" key={`POST_TYPEOFOFFER:${post.id}:${post.typeOfOffer}`}>
                  {post.typeOfOffer}
                </Text>
                <SectionButton
                  flexBasis="15%"
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
        </>
      )}
    </Section>
  );
};
