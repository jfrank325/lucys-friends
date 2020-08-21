import React from 'react';

const Content = ({ content, handleChange }) => {
  return (
    <div>
      <label htmlFor="content"></label>
      <input id="content" name="content" placeholder="Write Something" value={content} onChange={handleChange} />
    </div>
  );
};

export default Content;
