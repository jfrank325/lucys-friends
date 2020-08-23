import React from 'react';
import SendRequest from './SendRequest';
import styled from 'styled-components';

const BabiesWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Babies = ({ babies, user }) => {
  return (
    <BabiesWrapper>
      {babies.slice(0, 8).map((baby) => (
        <SendRequest key={baby._id} baby={baby} user={user} />
      ))}
    </BabiesWrapper>
  );
};

export default Babies;
