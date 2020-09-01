import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FamilyContext } from '../contexts/familyContext';

const Family = ({ family }) => {
  const { fam, setThisFamily } = useContext(FamilyContext);
  setThisFamily(family);
  const setLocalFam = () => localStorage.setItem(`fam`, family._id);

  useEffect(() => {
    setLocalFam();
  }, [fam]);
  // const id = family._id;
  const linkObj = {
    pathname: `/familyChat`,
    family: family,
  };
  // console.log({ family });
  return (
    <Link to={linkObj}>
      <h4>{family.name}</h4>
    </Link>
  );
};

export default Family;
