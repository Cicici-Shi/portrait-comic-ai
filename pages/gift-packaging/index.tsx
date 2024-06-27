import React from 'react';
import { useGlobalContext } from '../../app/GlobalContext';

const GiftPackagingPage = () => {
  const { openaiKey, imageUrl } = useGlobalContext();

  return (
    <div>
      <h1>Gift Packaging</h1>
      <p>Choose your gift packaging options here.</p>
      <p>OpenAI Key: {openaiKey}</p>
      <img src={imageUrl} alt="Example Image" />
    </div>
  );
};

export default GiftPackagingPage;