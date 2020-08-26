import React from 'react';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  .content-input {
    border: none;
    border-radius: 0.3rem;
    text-align: left;
    ${'' /* height: 1.5rem; */}
    font-size: 1.05rem;
    width: 10.5rem;
  }
`;

const Content = ({ content, handleChange, sent }) => {
  return (
    <ContentWrapper style={{ display: 'flex', alignSelf: 'flex-start' }}>
      <label htmlFor="content">
        <input
          className="content-input"
          style={{}}
          name="content"
          placeholder={sent ? sent : "What's up?"}
          value={content}
          onChange={handleChange}
        />
      </label>
    </ContentWrapper>
  );
};

export default Content;
