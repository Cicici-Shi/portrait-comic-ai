import React from 'react';
import { useGlobalContext } from '../../app/GlobalContext';
import { useRouter } from 'next/router';

const CreatePortraitPage = () => {
  const { openaiKey, imageUrl } = useGlobalContext();
  const router = useRouter();

  const handleSubmit = () => {
    router.push('/gift-packaging');
  };
  return (
    <div>
      <h1>Create Your Custom Portrait</h1>
      <p>Customize your portrait here.</p>
      <p>OpenAI Key: {openaiKey}</p>
      <img src={imageUrl} alt="Example Image" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CreatePortraitPage;