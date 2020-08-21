import Webcam from 'react-webcam';
import React, { useRef, useState } from 'react';
import Axios from 'axios';
import styled from 'styled-components';

const WebcamWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    height: 20rem;
    width: auto;
  }
`;

const WebcamCapture = ({ capture, selfie, setSelfie, webcamRef }) => {
  // const [pic, setPic] = useState('');
  // const webcamRef = useRef(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
  };

  // const capture = async () => {
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   console.log(imageSrc);
  //   // setImgSrc(imageSrc);
  //   try {
  //     const res = await Axios.post('	https://api.cloudinary.com/v1_1/dv1aih6td/image/upload', {
  //       file: imageSrc,
  //       upload_preset: 'hyvmowkc',
  //     });
  //     setPic(res.data.secure_url);
  //     console.log('pic?', res.data.secure_url);
  //   } catch {
  //     console.log('could not get image');
  //   }
  // };

  return (
    <WebcamWrapper>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        height={720}
        width={1280}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
      {selfie && <img src={selfie} alt="webcam" />}
    </WebcamWrapper>
  );
};

export default WebcamCapture;
