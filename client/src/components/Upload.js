import React from 'react';
import styled from 'styled-components';

const UploadWrapper = styled.div`
  .upload {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    label {
      background-color: var(--sunrise);
      border: none;
      border-radius: 25px;
      padding: 0.3rem 0.5rem;
    }
    input[type='file'] {
      display: none;
    }
    .donut {
      display: inline-block;
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-left-color: var(--sky);
      border-radius: 50%;
      width: 40px;
      margin-top: 2rem;
      height: 40px;
      animation: donut-spin 1.2s linear infinite;
    }
    button {
      background: -webkit-linear-gradient(rgba(0, 0, 0, 0));
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
    h4 {
      margin-top: 2rem;
    }
    .uploads {
      display: flex;
    }
  }
`;

const Upload = ({ uploadImage, uploadVideo, loading, profPic }) => {
  return (
    <UploadWrapper>
      <div className="upload">
        <div className="uploads">
          <label htmlFor="imgPath">
            <input type="file" id="imgPath" name="imgPath" onChange={uploadImage} />
            Upload Image
          </label>
          {!profPic && (
            <label htmlFor="videoPath">
              <input
                style={{ marginBottom: '1.9rem' }}
                type="file"
                name="videoPath"
                id="videoPath"
                onChange={uploadVideo}
              />{' '}
              Upload Video
            </label>
          )}
        </div>
        {loading === 'loading' ? <div className="donut"></div> : loading === 'finished' ? <h4>Uploaded!</h4> : <> </>}
      </div>
    </UploadWrapper>
  );
};

export default Upload;
