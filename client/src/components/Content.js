import React from 'react';

const Content = ({ content, handleChange }) => {
  return (
    <div>
      <label htmlFor="content"></label>
      <input
        style={{ border: 'none' }}
        id="content"
        name="content"
        placeholder="Write Something"
        value={content}
        onChange={handleChange}
      />
    </div>
  );
};

export default Content;
