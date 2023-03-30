import axios from '../Hooks/axios.js';
import React, { useState } from 'react';

function ImageUploader() {
  const [image, setImage] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
      // console.log("object", reader.result)
    };

    reader.readAsDataURL(file);
  };
  const handleButtonClick = async (event) => {
    const res = await axios.post("/user/up", {data: image});
    // console.log(res)
  }

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {image && (
        <img src={image} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
      )}
      <button onClick={handleButtonClick}>OK</button>
      <img src="https://res.cloudinary.com/dtvnsczg8/image/upload/v1680147331/Zola/c4pdkuzcpogdxaiwlftw.webp" />
    </div>
  );
}

export default ImageUploader;
