import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import Requests from './Requests';
import Friends from './Friends';
import Babies from './Babies';
import MessageForm from './MessageForm';
import { UserContext } from '../contexts/userContext';
import FamilyBuilder from './FamilyBuilder';
import Families from './Families';
import SearchPeople from './SearchPeople';

const FriendProfileWrapper = styled.div`
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
  h3 {
    color: var(--sky);
    padding: 1rem 0;
  }
`;

const UserProfile = () => {
  const [people, setPeople] = useState([]);
  const [query, setQuery] = useState('');
  const [queryPeople, setQueryPeople] = useState([]);
  const [requesters, setRequesters] = useState([]);
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const [families, setFamilies] = useState([]);
  const { user } = useContext(UserContext);
  const [thisFamily, setThisFamily] = useState();

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
      setFamilies(res.data._families);
    } catch {
      console.log('Could not get requests');
    }
  };

  useEffect(() => {
    getUserInfo();
    getPeople();
  }, []);

  // const getFamilies = async () => {
  //   try {
  //     const res = await axios.get(`/api/auth/myFamilies`);
  //     setFamilies(res.data);
  //     console.log('families', res.data);
  //   } catch {
  //     console.log(`Could not get user's families`);
  //   }
  // };

  // useEffect(() => {
  //   getPeople();
  //   getFamilies();
  // }, [user]);

  // const getRequests = async () => {
  //   if (user.type === 'BABY') {
  //     try {
  //       const res = await axios.get(`/api/auth/requesters`);
  //       const { friends } = res.data;
  //       setRequesters(res.data._requests.filter((requester) => !user.friends.includes(requester._id)));
  //       setFriends([...friends]);
  //     } catch {
  //       console.log('Could not get requests');
  //     }
  //   } else {
  //     const res = await axios.get(`/api/auth/requesters`);
  //     setFriends(res.data.friends);
  //   }
  // };

  // useEffect(() => {
  //   getRequests();
  // }, [requesters.length]);

  // const getMessages = async () => {
  //   try {
  //     const res = await axios.get(`/api/auth/messages`);
  //     setMessages(res.data._messages);
  //   } catch {
  //     console.log('Could not get messages');
  //   }
  // };
  // useEffect(() => {
  //   getMessages();
  // }, []);

  useEffect(() => {
    let filteredPeople = [...people].filter((person) => person.username.toLowerCase().includes(query.toLowerCase()));
    if (query.length > 0) {
      setQueryPeople(filteredPeople);
    } else {
      setQueryPeople(people);
    }
  }, [query]);

  const search = (e) => setQuery(e.target.value);
  // console.log({ user });
  // console.log({ friends });
  return (
    <FriendProfileWrapper>
      <SearchPeople query={query} search={search} />
      {query && query.length > 0 && <Babies babies={people} />}
      <Requests requesters={requesters} refresh={getUserInfo} />
      {/* <ProfileId user={user} /> */}
      {user.type === 'BABY' && (
        <>
          <h3>Create a Post for all your friends</h3>
          <MessageForm refresh={getPeople} friends={user.friends} />
        </>
      )}
      <Families families={families} />
      <FamilyBuilder />
      {/* <h3>{user.username}</h3>
      <img src={user.profilePic ? user.profilePic : Profile} alt="Profile" /> */}
      <h2>{user.type === 'BABY' ? 'Your Friends' : 'Your Babies'}</h2>
      <Friends refresh={getPeople} messages={messages} friends={friends} myProfile={true} />
    </FriendProfileWrapper>
  );
};

export default UserProfile;
