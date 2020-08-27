import React from 'react';
import Family from './Family';

const Families = ({ families, showFamily }) => {
  return (
    <div>
      {families.map((family) => (
        <Family family={family} showFamily={showFamily} />
      ))}
    </div>
  );
};

export default Families;
