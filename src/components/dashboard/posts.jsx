import React, { useEffect } from "react";
import AddIco from "../../assets/addIco.svg";
import { Ico, Section, SimpleRow, Subtitle } from "./dashboardContent";

export const Posts = ({ setShowPostModal }) => {
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
    </Section>
  );
};
