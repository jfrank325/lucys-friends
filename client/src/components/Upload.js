import React from 'react';
import styled from 'styled-components';

const UploadWrapper = styled.div`
  .upload {
    padding-top: 2rem;
    label {
    }
    input {
      background-color: var(--sunrise);
      border: none;
      border-radius: 25px;
      padding: 0.3rem 0.5rem;
    }
    .donut {
      display: inline-block;
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-left-color: var(--sky);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: donut-spin 1.2s linear infinite;
    }
    button {
      background: -webkit-linear-gradient(rgba(0, 0, 0, 0));
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
  }
`;

const Upload = ({ uploadImage, uploadVideo, loading }) => {
  return (
    <UploadWrapper>
      <div className="upload">
        <label htmlFor="imgPath">Upload Profile Pic</label>
        <input type="file" name="imgPath" onChange={uploadImage} />
        {/* <label htmlFor="videoPath">Upload Video</label>
      <input style={{ marginBottom: '1.9rem' }} type="file" name="videoPath" onChange={uploadVideo} /> */}
        {loading === 'loading' ? <div className="donut"></div> : loading === 'finished' ? <h4>Finished</h4> : <> </>}
      </div>
    </UploadWrapper>
  );
};

export default Upload;
