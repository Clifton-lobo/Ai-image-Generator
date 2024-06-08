import React, { useRef, useState } from 'react';
import AIimg from '../assets/AIimg.jpg';
import '../components/ImGn.css';

const ImGn = () => {
  const [image_url, setimage_url] = useState('/');

  const getImage = image_url === '/' ? AIimg : image_url;

  let inputref = useRef(null);

  const image_generator = async () => {
    if (inputref.current.value === '') {
      return 0;
    }

    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: 'Bearer APi_key',
          'User-Agent': 'chrome',
        },
        body: JSON.stringify({
          prompt: `${inputref.current.value}`,
          n: 1,
          size: '512x512',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response.json();
      let data_array = data.data;

      if (data_array && data_array.length > 0) {
        setimage_url(data_array); 
      } else {
        console.log('No image URL found in the response');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='container'>
      <header>AI IMAGE GENERATOR</header>
      <div className='image-generator'>
        <div>
          <img src={getImage} alt='' />
        </div>
        <div>
          <div>
            <input className='Input' ref={inputref} type='text' placeholder='Create your hallucinations' />
            <span>
              <button className='Generatebtn' onClick={image_generator}>
                Generate
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImGn;