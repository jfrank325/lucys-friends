import React from 'react';
import { Link } from 'react-router-dom';

const Family = ({ family }) => {
  const { name, _id } = family;
  const linkObj = {
    pathname: `/familyChat/${_id}`,
    family: family,
  };
  console.log({ family });
  return (
    <Link to={linkObj}>
      <h4>{name}</h4>
    </Link>
  );
};

export default Family;
