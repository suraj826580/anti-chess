import React from "react";
import styled, { css } from "styled-components";

const SquareWrapper = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.isBlack ? "#b58863" : "#f0d9b5")};
  cursor: pointer;
  transition: all 0.3s ease;

  ${(props) =>
    props.isValidMove &&
    css`
      &::after {
        content: "";
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: rgba(0, 255, 0, 0.3);
      }
    `}

  ${(props) =>
    props.isSelected &&
    css`
      box-shadow: inset 0 0 0 4px rgba(0, 255, 0, 0.75);
    `}

  ${(props) =>
    props.isCapture &&
    css`
      &::after {
        content: "";
        display: block;
        width: 54px;
        height: 54px;
        border-radius: 50%;
        border: 3px solid rgba(255, 0, 0, 0.75);
      }
    `}
`;

const Square = ({
  isBlack,
  children,
  onClick,
  isValidMove,
  isSelected,
  isCapture,
}) => {
  return (
    <SquareWrapper
      isBlack={isBlack}
      onClick={onClick}
      isValidMove={isValidMove}
      isSelected={isSelected}
      isCapture={isCapture}>
      {children}
    </SquareWrapper>
  );
};

export default Square;
