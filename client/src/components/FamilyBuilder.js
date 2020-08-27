import React, { useState, useContext } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../utils/items';
import { UserContext } from '../contexts/userContext';
import Axios from 'axios';
import styled from 'styled-components';

const FamilyBuilderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--yellow);
  min-width: 15rem;
  max-width: 20rem;
  padding: 1rem;
  border-radius: 0.3rem;
  margin: 1rem auto 0 auto;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  img {
    height: 3rem;
    width: auto;
  }
`;

const FamilyBuilder = () => {
  const [familySuccess, setFamilySuccess] = useState();
  const [family, setFamily] = useState({
    name: '',
    members: [],
    faces: [],
  });

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item) =>
      setFamily({ ...family, members: family.members.concat(item.id), faces: family.faces.concat(item.face) }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const handleChange = (event) => {
    setFamily({ ...family, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await Axios.post('/api/family/create', {
        name: family.name,
        members: family.members,
      });
      setFamilySuccess(`${res.data.name} was created!`);
      console.log('done');
    } catch {
      console.log('Problem with family request');
    }
  };

  // console.log({ family });

  return (
    <FamilyBuilderWrapper>
      <form className="family-form" onSubmit={handleSubmit}>
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            placeholder="Family Name"
            required
            value={family.name}
            onChange={handleChange}
          />
        </label>
        <div style={{ width: '17rem', height: '10rem' }} ref={drop}>
          <h3>{familySuccess}</h3>
          {family.faces.map((face, i) => (
            <img
              key={i}
              onClick={() => setFamily({ ...family, faces: family.faces.filter((keptFace) => keptFace !== face) })}
              src={face}
              alt="friend"
            />
          ))}
        </div>
        <button>Create Family</button>
      </form>
    </FamilyBuilderWrapper>
  );
};

export default FamilyBuilder;
