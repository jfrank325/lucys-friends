import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FamilyContext } from '../contexts/familyContext';

const Family = ({ family }) => {
  const { fam, setThisFamily } = useContext(FamilyContext);

  const setLocalFam = () => localStorage.setItem(`fam`, JSON.stringify({ id: family._id, room: family.name }));

  const newFam = () => {
    setLocalFam();
    setThisFamily(family);
  };

  // useEffect(() => {
  //   setLocalFam();
  //   setThisFamily(family);
  // }, [fam]);
  // const id = family._id;
  const linkObj = {
    pathname: `/familyChat`,
    family: family,
  };
  // console.log({ family });
  return (
    <Link to={linkObj} onClick={() => newFam()}>
      <h4>{family.name}</h4>
    </Link>
  );
};

export default Family;
