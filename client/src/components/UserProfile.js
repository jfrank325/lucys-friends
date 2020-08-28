import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { UserContext } from '../contexts/userContext';
import AdultMessages from './AdultMessages';
import Babies from './Babies';
import styled from 'styled-components';
import Requests from './Requests';
import Friends from './Friends';
import SearchPeople from './SearchPeople';
import Views from './Views';

const ProfileWrapper = styled.div`
  input {
    border: none;
    border-top: solid 0.2rem var(--sky);
    border-bottom: solid 0.2rem var(--sky);
    background-color: white;
    ${'' /* margin: 0.5rem 0.5rem; */}
    font-size: 1.2rem;
    height: 2rem;
    overflow-wrap: normal;
    text-align: center;
    color: var(--sky);
    font-family: 'Balsamiq Sans', 'Open Sans', Arial;
    &::placeholder {
      color: var(--yellow);
    }
    &:focus {
      ${'' /* outline: none; */}
      ${'' /* background-color: var(--sky); */}
    }
    &:focus::-webkit-input-placeholder {
      color: transparent;
    }
  }
`;

const UserProfile = () => {
  const [people, setPeople] = useState([]);
  const [query, setQuery] = useState([]);
  const [queryPeople, setQueryPeople] = useState([]);
  const [messages, setMessages] = useState([]);
  const [requesters, setRequesters] = useState([]);
  const [friends, setFriends] = useState([]);
  const [view, setView] = useState('Messages');
  const { user } = useContext(UserContext);

  const getPeople = async () => {
    try {
      const res = await Axios.get('/api/auth/people');
      const people = res.data;
      setPeople([...people]);
    } catch {
      console.log('Could not get babies');
    }
  };

  const getUserInfo = async () => {
    try {
      const res = await Axios.get(`/api/auth/getAll`);
      const { friends } = res.data;
      setRequesters(res.data._requests.filter((requester) => !user.friends.includes(requester._id)));
      setFriends([...friends]);
      setMessages(res.data._messages);
    } catch {
      console.log('Could not get requests');
    }
  };

  useEffect(() => {
    getUserInfo();
    getPeople();
  }, []);

  useEffect(() => {
    let filteredPeople = [...people].filter((person) => person.username.toLowerCase().includes(query.toLowerCase()));
    if (query.length > 0) {
      setQueryPeople(filteredPeople);
    } else {
      setQueryPeople(people);
    }
  }, [query]);

  const changeView = (viewType) => {
    setView(viewType);
  };
  const search = (e) => setQuery(e.target.value);

  console.log('view', view);

  return (
    <ProfileWrapper>
      <Views setView={changeView} />
      <SearchPeople query={query} search={search} />
      {query && query.length > 0 && <Babies babies={queryPeople} />}
      <Requests requesters={requesters} refresh={getUserInfo} />
      {view === 'Friends' && <Friends refresh={getPeople} messages={messages} friends={friends} myProfile={true} />}
      {view === 'Messages' && <AdultMessages messages={messages} />}
    </ProfileWrapper>
  );
};

export default UserProfile;
