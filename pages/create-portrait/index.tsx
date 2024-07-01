import React from "react";
import { useGlobalContext } from "../../app/GlobalContext";
import { useRouter } from "next/router";
import {
  Button,
  TextareaAutosize,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import Image from "next/image";

const CreatePortraitPage = () => {
  const { openaiKey, imageUrl } = useGlobalContext();
  const router = useRouter();

  const handleSubmit = () => {
    router.push("/gift-packaging");
  };
  interface CardData {
    imageUrl: string;
    title: string;
    description: string;
  }

  const cards: CardData[] = [
    {
      imageUrl: "https://generated.vusercontent.net/placeholder.svg",
      title: "Classic Comic",
      description: "A traditional comic book style portrait",
    },
    {
      imageUrl: "https://generated.vusercontent.net/placeholder.svg",
      title: "Modern Comic",
      description: "A modern take on comic book styles",
    },
    {
      imageUrl: "https://generated.vusercontent.net/placeholder.svg",
      title: "Future Comic",
      description: "A futuristic view of comic art",
    },
  ];
  return (
    <div>
      <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div>
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Create Your Custom Portrait</h1>
            <p className="text-muted-foreground">
              Follow these steps to get a personalized artwork created just for
              you.
            </p>
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">1. Upload Your Photo</h2>
                <p className="text-muted-foreground">
                  Provide a clear, high-quality photo of your face so our artist
                  can accurately capture your likeness.
                </p>
                <div className="mt-4">
                  <Button>Upload Photo</Button>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  2. Discuss Your Vision
                </h2>
                <p className="text-muted-foreground">
                  Chat with our AI assistant to describe the personalized
                  elements you&apos;d like to see in your portrait.
                </p>
                <div className="mt-4">
                  <Button>Headshot</Button>
                  <Button>Sticker</Button>
                </div>
                <p className="text-muted-foreground">
                  Select a pre-designed template to use as a starting point for
                  your custom artwork.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:mx-2 mx-12">
                  {cards.map((card, index) => (
                    <div
                      key={index}
                      className="border-2 border-primary p-4 cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    >
                      <div className="flex flex-col items-center gap-4">
                        <img
                          src={card.imageUrl}
                          alt={card.title}
                          className="rounded-lg w-50 h-50"
                        />
                        <div>
                          <h3 className="text-xl font-semibold">
                            {card.title}
                          </h3>
                          <p className="text-gray-500">{card.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>{" "}
                <p className="text-muted-foreground">
                  or describe the personalized elements you'd like to see in
                  your portrait.（强烈推荐一试）
                </p>
                <Card className="w-full max-w-md rounded-xl">
                  <CardContent className="p-4 flex flex-col h-[400px]">
                    <div className="flex-1 overflow-auto">
                      <div className="grid gap-3">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-7 h-7 border">
                            <Image
                              src="https://generated.vusercontent.net/placeholder.svg"
                              width={300}
                              height={300}
                              alt="Portrait Example"
                              className="rounded-lg"
                            />
                          </Avatar>
                          <div className="grid gap-1">
                            <div className="font-medium text-sm">You</div>
                            <div className="bg-muted rounded-lg p-2 text-xs max-w-[80%]">
                              Hey there! How's it going?
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 justify-end">
                          <div className="grid gap-1">
                            <div className="font-medium text-sm text-right">
                              You
                            </div>
                            <div className="bg-primary rounded-lg p-2 text-xs max-w-[80%] text-primary-foreground">
                              I'm doing great, thanks for asking!
                            </div>
                          </div>
                          <Avatar className="w-7 h-7 border">
                            <Image
                              src="https://generated.vusercontent.net/placeholder.svg"
                              width={300}
                              height={300}
                              alt="Portrait Example"
                              className="rounded-lg"
                            />
                          </Avatar>
                        </div>
                        <div className="flex items-start gap-3">
                          <Avatar className="w-7 h-7 border">
                            <Image
                              src="https://generated.vusercontent.net/placeholder.svg"
                              width={300}
                              height={300}
                              alt="Portrait Example"
                              className="rounded-lg"
                            />
                          </Avatar>
                          <div className="grid gap-1">
                            <div className="font-medium text-sm">Friend</div>
                            <div className="bg-muted rounded-lg p-2 text-xs max-w-[80%]">
                              That's awesome! I'm glad to hear it.
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 justify-end">
                          <div className="grid gap-1">
                            <div className="font-medium text-sm text-right">
                              You
                            </div>
                            <div className="bg-primary rounded-lg p-2 text-xs max-w-[80%] text-primary-foreground">
                              Yeah, it's been a great day so far. How about you?
                            </div>
                          </div>
                          <Avatar className="w-7 h-7 border">
                            <Image
                              src="https://generated.vusercontent.net/placeholder.svg"
                              width={300}
                              height={300}
                              alt="Portrait Example"
                              className="rounded-lg"
                            />
                          </Avatar>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2 items-center">
                      <textarea
                        placeholder="Type your message..."
                        className="flex-1 rounded-lg border border-input p-2 text-sm resize-none"
                        rows={4} // 根据需要调整可见行数
                      />
                      <Button>Send</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          {/* <div className="space-y-6">
            <h2 className="text-xl font-semibold">Inspiration Gallery</h2>
            <p className="text-muted-foreground">
              Check out some examples of our custom portraits to get ideas for
              your own.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Image
                src="https://generated.vusercontent.net/placeholder.svg"
                width={300}
                height={300}
                alt="Portrait Example"
                className="rounded-lg"
              />
              <Image
                src="https://generated.vusercontent.net/placeholder.svg"
                width={300}
                height={300}
                alt="Portrait Example"
                className="rounded-lg"
              />
              <Image
                src="https://generated.vusercontent.net/placeholder.svg"
                width={300}
                height={300}
                alt="Portrait Example"
                className="rounded-lg"
              />
              <Image
                src="https://generated.vusercontent.net/placeholder.svg"
                width={300}
                height={300}
                alt="Portrait Example"
                className="rounded-lg"
              />
            </div>
          </div> */}
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold">3. Finalize Your Order</h2>
          <p className="text-muted-foreground">
            Once you&apos;ve provided your photo and discussed your vision, our
            artist will create your custom portrait. If you&apos;re not
            satisfied, you can provide feedback and we&apos;ll revise it.
          </p>
          <div className="mt-4">
            <Button>Start Creating</Button>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Your Custom Comic</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Image
              src="https://generated.vusercontent.net/placeholder.svg"
              width={400}
              height={400}
              alt="Custom Comic"
              className="rounded-lg"
            />
            <div className="flex flex-col justify-center">
              <h3 className="text-lg font-semibold">Chat with AI to Modify</h3>
              <p className="text-muted-foreground">
                Use the chat box below to provide feedback and suggestions to
                our AI artist. They will update the comic based on your input.
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
