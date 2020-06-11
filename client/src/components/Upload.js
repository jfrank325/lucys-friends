import React from 'react';

const Uploads = ({ uploadImage, uploadVideo, loading }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <label htmlFor="imgPath">Upload Image</label>
      <input type="file" name="imgPath" onChange={uploadImage} />
      <label htmlFor="videoPath">Upload Video</label>
      <input style={{ marginBottom: '1.9rem' }} type="file" name="videoPath" onChange={uploadVideo} />
      {loading === 'loading' ? <div className="donut"></div> : loading === 'finished' ? <h4>Finished</h4> : <> </>}
    </div>
  );
};

export default Uploads;
