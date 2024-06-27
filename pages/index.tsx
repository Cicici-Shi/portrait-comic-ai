"use client";

import React from 'react';
import { useGlobalContext } from '../app/GlobalContext';
import { useRouter } from 'next/router';

const LandingPage = () => {
  const { openaiKey, setOpenaiKey, imageUrl, setImageUrl } = useGlobalContext();
  const router = useRouter();

  const handleSubmit = () => {
    router.push('/create-portrait');
  };
  const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpenaiKey(event.target.value);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  return (
    <div>
      <h1>Welcome to Portrait Comic AI</h1>
      <p>This is the landing page.</p>
      <input
        type="text"
        placeholder="Enter OpenAI Key"
        value={openaiKey}
        onChange={handleKeyChange}
      />
      <input
        type="text"
        placeholder="Enter Image URL"
        value={imageUrl}
        onChange={handleUrlChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default LandingPage;