import React from "react";
import styled from "styled-components";

const SquareWrapper = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.isBlack ? "#b58863" : "#f0d9b5")};
  cursor: pointer;
`;

const Square = ({ isBlack, children, onClick }) => {
  return (
    <SquareWrapper isBlack={isBlack} onClick={onClick}>
      {children}
    </SquareWrapper>
  );
};

export default Square;
