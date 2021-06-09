import styled from "styled-components";
import React from "react";

const Section = styled.section`
  width: 100%;
  background-color: #020122;
  color: #fff;
`;

export const Footer = () => {
  return (
    <Section>
      <div>
        Icons from
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </Section>
  );
};
