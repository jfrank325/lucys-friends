import React from 'react';
import View from './View';
import styled from 'styled-components';

const ViewsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--sky);
  width: fit-content;
  margin: 0 auto;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;

const Views = ({ setView }) => {
  return (
    <ViewsWrapper>
      <View type="Messages" setView={setView} />
      <View type="Friends" setView={setView} />
      <View type="Families" setView={setView} />
      <View type="Album" setView={setView} />
    </ViewsWrapper>
  );
};

export default Views;
