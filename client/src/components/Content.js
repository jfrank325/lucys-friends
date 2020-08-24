import React from 'react';

const Content = ({ content, handleChange }) => {
  return (
    <div style={{ display: 'flex', alignSelf: 'flex-start' }}>
      <label htmlFor="content"></label>
      <input
        style={{ border: 'none', borderRadius: '.1rem', textAlign: 'left' }}
        name="content"
        placeholder="What's up?"
        value={content}
        onChange={handleChange}
      />
    </div>
  );
};

export default Content;
