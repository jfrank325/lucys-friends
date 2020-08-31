import React, { useState, useEffect, useContext, useRef } from 'react';
import io from 'socket.io-client';
import FamilyMessages from './FamilyMessages';
import Input from './Input';
import { UserContext } from '../contexts/userContext';
import Axios from 'axios';
const PORT = process.env.SERVER;
const socket = io(PORT);

const FamilyChat = (props) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);
  const [oldMessages, setOldMessages] = useState();
  const { user } = useContext(UserContext);
  const { family } = props.location;
  // const fam = useRef(family);
  const name = user.username;
  const id = family._id;
  const getFamily = async () => {
    try {
      const res = await Axios.get(`/api/family/family/${id}`);
      setOldMessages(res.data._messages);
      console.log(res.data._messages, 'family');
    } catch {
      console.log('Could not get family');
    }
  };

  useEffect(() => {
    getFamily();
  }, [family]);
  const room = family.name;
  const friends = family._members.map((member) => member._id);

  useEffect(() => {
    socket.emit('join', { name, room }, () => {});
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [PORT]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
    socket.on('roomData', ({ users }) => {
      setMembers(users);
    });
  }, [messages]);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
    try {
      const res = await Axios.post('/api/messages/forAll', {
        content: message,
        friends: friends,
        family: family._id,
      });
      console.log(res.data, 'message');
    } catch {
      console.log('could not submit');
    }
  };

  return (
    <div>
      <FamilyMessages messages={messages} oldMessages={oldMessages} name={name} />
      <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
    </div>
  );
};

export default FamilyChat;
