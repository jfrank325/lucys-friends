import React from 'react';
import styled from 'styled-components';

const ViewWrapper = styled.div`
  button {
  }
`;

const View = ({ type, setView }) => {
  const makeView = () => {
    setView(type);
  };
  return (
    <ViewWrapper>
      <button onClick={makeView}>{type}</button>
    </ViewWrapper>
  );
};

export default View;
