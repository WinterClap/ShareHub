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
  const [currentAddress, setCurrentAddress] = useState("");
  const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  const getAddress = async (id) => {
    db.collection("posts")
      .doc(id)
      .get()
      .then((doc) => {
        setCurrentAddress(doc.data());
      });
  };
  useEffect(() => {
    getAddress(id);
  }, [id]);
  return (
    <AnimatePresence>
      {showAddressModal && (
        <Backdrop variants={backdrop} initial="hidden" animate="visible" exit="hidden">
          <DialogContainer width="750px" height="200px">
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
            <ColorText>
              Address: <Text>{currentAddress && currentAddress.address}</Text>
            </ColorText>
          </DialogContainer>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};
