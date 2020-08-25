import React from 'react';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  .content-input {
    border: none;
    border-radius: 0.3rem;
    text-align: left;
    height: 1.5rem;
    width: 11.3rem;
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
