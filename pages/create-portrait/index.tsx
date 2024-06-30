import React from 'react';
import { useGlobalContext } from '../../app/GlobalContext';
import { useRouter } from 'next/router';
import { Button, TextareaAutosize } from '@mui/material';
import Image from 'next/image'

const CreatePortraitPage = () => {
  const { openaiKey, imageUrl } = useGlobalContext();
  const router = useRouter();

  const handleSubmit = () => {
    router.push('/gift-packaging');
  };

  return (
    <div>
        <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Create Your Custom Portrait</h1>
          <p className="text-muted-foreground">
            Follow these steps to get a personalized artwork created just for you.
          </p>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">1. Upload Your Photo</h2>
              <p className="text-muted-foreground">
                Provide a clear, high-quality photo of your face so our artist can accurately capture your likeness.
              </p>
              <div className="mt-4">
                <Button>Upload Photo</Button>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold">2. Discuss Your Vision</h2>
              <p className="text-muted-foreground">
                Chat with our AI assistant to describe the personalized elements you&apos;d like to see in your portrait.
              </p>
              <div className="mt-4">
                <Button>Start Conversation</Button>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold">3. Choose a Template</h2>
              <p className="text-muted-foreground">
                Select a pre-designed template to use as a starting point for your custom artwork.
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Inspiration Gallery</h2>
          <p className="text-muted-foreground">
            Check out some examples of our custom portraits to get ideas for your own.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image src="https://generated.vusercontent.net/placeholder.svg" width={300} height={300} alt="Portrait Example" className="rounded-lg" />
            <Image src="https://generated.vusercontent.net/placeholder.svg" width={300} height={300} alt="Portrait Example" className="rounded-lg" />
            <Image src="https://generated.vusercontent.net/placeholder.svg" width={300} height={300} alt="Portrait Example" className="rounded-lg" />
            <Image src="https://generated.vusercontent.net/placeholder.svg" width={300} height={300} alt="Portrait Example" className="rounded-lg" />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">4. Finalize Your Order</h2>
        <p className="text-muted-foreground">
          Once youreact/no-unescaped-entitiesve provided your photo and discussed your vision, our artist will create your custom portrait. If
          youreact/no-unescaped-entitiesre not satisfied, you can provide feedback and wereact/no-unescaped-entitiesll revise it.
        </p>
        <div className="mt-4">
          <Button>Start Creating</Button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Your Custom Comic</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Image src="https://generated.vusercontent.net/placeholder.svg" width={400} height={400} alt="Custom Comic" className="rounded-lg" />
          <div className="flex flex-col justify-center">
            <h3 className="text-lg font-semibold">Chat with AI to Modify</h3>
            <p className="text-muted-foreground">
              Use the chat box below to provide feedback and suggestions to our AI artist. They will update the comic
              based on your input.
            </p>
            <div className="mt-4">
              <TextareaAutosize
                placeholder="Enter your feedback here..."
                minRows={4}
                className="w-full mt-4 text-sm border border-light-border focus-visible:ring-2 focus-visible:ring-custom-ring bg-transparent text-foreand"
              />
              <Button className="mt-2">Submit Feedback</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
      <h1>Create Your Custom Portrait</h1>
      <p>Customize your portrait here.</p>
      <p>OpenAI Key: {openaiKey}</p>
      <Image src={imageUrl} alt="Example Image" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CreatePortraitPage;