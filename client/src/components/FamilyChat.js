import React, { useState, useEffect, useContext, useRef } from 'react';
import io from 'socket.io-client';
import FamilyMessages from './FamilyMessages';
import Input from './Input';
import { UserContext } from '../contexts/userContext';
import { FamilyContext } from '../contexts/familyContext';
import Axios from 'axios';
import Input2 from './Input2';
const PORT = process.env.SERVER;
const socket = io(PORT);

const FamilyChat = (props) => {
  const { fam } = useContext(FamilyContext);
  const [message, setMessage] = useState({
    selfie: '',
    content: '',
    image: '',
    video: '',
    loading: 'waiting',
  });
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);
  const [oldMessages, setOldMessages] = useState();
  const localFam = JSON.parse(localStorage.getItem(`fam`));
  // const [localFamilyId, setLocalFamilyId] = useState(localFam);
  const [family, setFamily] = useState();
  const { user } = useContext(UserContext);
  const name = user.profilePic;
  const userPic = user.profilePic;
  const room = localFam.room;
  console.log({ localFam });
  // const setLocalFam = () => localStorage.setItem(`fam`, localFamilyId);

  const getFamily = async () => {
    try {
      const res = await Axios.get(`/api/family/family/${localFam.id}`);
      setOldMessages(res.data._messages);
      setFamily(res.data);
    } catch {
      console.log('Could not get family');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getFamily();
    }, 200);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      socket.emit('join', { name, room, userPic }, () => {});
      return () => {
        socket.emit('disconnect');
        socket.off();
      };
    }, 1500);
  }, []);

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
      const res = await Axios.post('/api/messages/forFamily', {
        content: message.content,
        family: family._id,
        selfie: message.selfie,
        image: message.image,
        video: message.video,
      });
      // setMessages(...messages, res.data);
      console.log(res.data, 'message');
      return;
    } catch {
      console.log('could not submit');
    }
  };

  return (
    <div>
      <FamilyMessages messages={messages} oldMessages={oldMessages} name={name} />
      <Input2 message={message} setMessage={setMessage} sendMessage={sendMessage} />
    </div>
  );
};

export default FamilyChat;
