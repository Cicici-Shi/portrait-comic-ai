'use client'

import { TextField, Button } from '@mui/material';
import { useState, FormEvent, ChangeEvent } from 'react';

interface Recipe {
  name: string;
  ingredients: Array<{ name: string; quantity: string; unit: string }>;
}

export default function Home() {
  
  const [openaiApiKey, setOpenaiApiKey] = useState<string>('');
  const [recipeUrl, setRecipeUrl] = useState<string>('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [image, setImage] = useState<string | null>(null);
  
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setRecipe(null);
    event.preventDefault();

    const response = await fetch('/api/parse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ openaiApiKey, recipeUrl }),
    });

    if (response.ok) {
      const data = await response.json();
      setRecipe(data);
    } else {
      console.error('Error parsing recipe');
    }
  };

  function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = function (loadEvent: ProgressEvent<FileReader>) {
        const base64Image = loadEvent.target?.result;
        console.log(base64Image);
        const imageObject = {
          type: "image_url",
          image_url: {
            url: base64Image,
          },
        };
        const jsonString = JSON.stringify(imageObject);
        console.log(jsonString, 'jsonString');
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <div className="flex flex-col justify-center w-full max-w-[640px]">
      <div
            className={`w-full h-48 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer ${
              image ? "bg-muted" : "bg-background"
            }`}
            onClick={() => document.getElementById("image-upload")?.click()}
          >
            {image ? (
              <img
                src={image}
                alt="Uploaded Image"
                width={200}
                height={200}
                className="object-contain"
              />
            ) : (
              <div className="text-muted-foreground">
                <UploadIcon className="w-8 h-8 mb-2" />
                <p>Drop or click to upload your portrait</p>
              </div>
            )}
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        <h1 className="font-bold text-4xl mb-8">🥑 Amazing JO&lsquo;s Recipe</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <TextField id="openai-api-key" label="OpenAI API Key" autoComplete="off" variant="outlined" type='password' value={openaiApiKey} onChange={(e) => setOpenaiApiKey(e.target.value)} />
          <TextField id="recipe-url" label="URL of a Jamie Oliver Recipe" variant="outlined" value={recipeUrl} onChange={(e) => setRecipeUrl(e.target.value)} />
          <Button type="submit" variant="outlined">
            Parse Recipe
          </Button>
        </form>
        {recipe !== null && (
          <pre>{JSON.stringify(recipe, null, 2)}</pre>
        )}
      </div>
    </main>

  )
}

const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);
