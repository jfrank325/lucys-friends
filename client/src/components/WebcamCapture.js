import Webcam from 'react-webcam';
import React, { useRef, useCallback, useState } from 'react';
import Axios from 'axios';
import { set } from 'mongoose';

const WebcamCapture = () => {
  const [pic, setPic] = useState('');
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    setImgSrc(imageSrc);
    try {
      const res = await Axios.post('	https://api.cloudinary.com/v1_1/dv1aih6td/image/upload', {
        file: imageSrc,
        upload_preset: 'hyvmowkc',
      });
      setPic(res.data);
      console.log('pic?', res.data.secure_url);
    } catch {
      console.log('could not get image');
    }
  };

  return (
    <>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <button onClick={capture}>Capture photo</button>
      {imgSrc && <img src={pic} />}
    </>
  );
};

export default WebcamCapture;
