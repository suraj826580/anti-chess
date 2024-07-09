import React from "react";
import styled from "styled-components";

const MoveHistoryWrapper = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
`;

const MoveList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const MoveItem = styled.li`
  margin-bottom: 5px;
`;

const MoveHistory = ({ moves }) => {
  return (
    <MoveHistoryWrapper>
      <h3>Move History</h3>
      <MoveList>
        {moves.map((move, index) => (
          <MoveItem key={index}>
            {index + 1}. {move}
          </MoveItem>
        ))}
      </MoveList>
    </MoveHistoryWrapper>
  );
};

export default MoveHistory;
