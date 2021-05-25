/*import React from "react"
import styled from "styled-components"


const Div = styled.div`
    width:100%;
    height:20px;
    margin-top:20px;
    margin-bottom:20px;
    border:none;
    padding: none;
`
const Mar2 = styled.div`
    width: 100%;
    height: 20px;
    margin-top: 5px;
    margin-bottom: 5px;
    border: none;
    padding: none;
`;
export function Marginer(props) {
    return <Div></Div>
}
export function SmallMarginer(props) {
    return <Mar2></Mar2>
}*/

import React from "react";
import styled from "styled-components";

const HorizontalMargin = styled.span`
  display: flex;
  width: ${({ margin }) =>
    typeof margin === "string" ? margin : `${margin}px`};
`;

const VerticalMargin = styled.span`
  display: flex;
  height: ${({ margin }) =>
    typeof margin === "string" ? margin : `${margin}px`};
`;

function Marginer(props) {
  const { direction } = props;

  if (direction === "horizontal") return <HorizontalMargin {...props} />;
  else {
    return <VerticalMargin {...props} />;
  }
}

Marginer.defaultProps = {
  direction: "horizontal",
};

export { Marginer };