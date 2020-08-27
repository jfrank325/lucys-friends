import React from 'react';
import Family from './Family';

const Families = ({ families }) => {
  return (
    <div>
      {families.map((family) => (
        <Family family={family} key={family._id} />
      ))}
    </div>
  );
};

export default Families;
