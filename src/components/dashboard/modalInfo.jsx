import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Backdrop, DialogContainer } from "./postModal";
import { SimpleRow, Title, Ico, Text } from "./dashboardContent";
import styled from "styled-components";
import { db } from "../../firebase";
import { Marginer } from "../Marginer";
import CancelIco from "../../assets/cancelIco.svg";

const ColorText = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: #bb1600;
`;
export const ModalInfo = ({ id, showAddressModal, setShowAddressModal }) => {
  const [data, setData] = useState("");
  const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  useEffect(() => {
    const getAddress = async (id) => {
      return db
        .collection("posts")
        .doc(id)
        .get()
        .then((doc) => {
          setData(doc.data());
        });
    };
    const unsubscribe = getAddress(id);
    return unsubscribe;
  }, [id]);
  return (
    <AnimatePresence>
      {showAddressModal && (
        <Backdrop variants={backdrop} initial="hidden" animate="visible" exit="hidden">
          <DialogContainer width="750px" height="240px">
            <SimpleRow justifyContent="space-between">
              <Title>Your gift is waiting for you!</Title>
              <Ico
                initial={{ scale: 1 }}
                whileHover={{
                  rotate: -180,
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
                image={CancelIco}
                onClick={() => setShowAddressModal(false)}
                hoverP
                width="35px"
                height="35px"
              ></Ico>
            </SimpleRow>

            <Marginer direction="vertical" margin={30}></Marginer>
            <SimpleRow justifyContent="space-around">
              <ColorText>Address:</ColorText>
              <Text>{data && data.address}</Text>
              <ColorText>Type:</ColorText>
              <Text>{data && data.typeOfOffer}</Text>
            </SimpleRow>
          </DialogContainer>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};
