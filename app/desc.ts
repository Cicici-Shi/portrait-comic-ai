import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { ChatOpenAI, DallEAPIWrapper } from "@langchain/openai";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";
import "dotenv/config";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { AgentExecutor, createOpenAIToolsAgent } from "langchain/agents";
import { ChatMessageHistory } from "langchain/stores/message/in_memory";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import readline from "readline";

const characterDesc = `
### Protagonist
The protagonist is an Asian woman, featuring a poised and contemplative expression.

### Face
She has a softly contoured face with a serene expression. Her eyes are large and subtly almond-shaped, framed by delicate eyelashes. The eyebrows are finely arched, enhancing her thoughtful gaze. Light freckles dot her nose and cheeks, adding a natural touch to her complexion.

### Accessories and Notable Items
She wears a small, decorative hairpin on the left side of her neatly styled hair, which adds a traditional and elegant accent to her appearance.

### Hair
Her hair is styled in a smooth, classic updo, with strands meticulously pulled back to emphasize the clean lines of her face.

### Clothing
She is dressed in a traditional robe with a white collar, giving her a refined and understated look. The texture of the robe suggests a soft, flowing material, likely silk, which contributes to the overall gracefulness.

This description is tailored for a detailed black-and-white comic representation, focusing on the distinct and expressive features of the character.
`;
// ImageGenerationChain: 调用 OpenAI 的 dalle3 生成图片
async function getImageGenerationChain() {
  const promptTemplate = ChatPromptTemplate.fromMessages([
    [
      "system",
      `
创建一张 9:16 的黑白手绘线条肖像漫画，具体要求如下：
1.**风格**：
   - 白色背景，黑色粗线条对比鲜明，视觉冲击力强。
   - 简单、卡通化的人物，线条清晰、粗重。
   - 极简背景。
   - 强调表情丰富的面部特征。
2.**人像**：${characterDesc}
      `,
    ],
    ["human", "3.**元素**：{description}"],
  ]);

  const model = new DallEAPIWrapper({
    model: "dall-e-3",
  });
  const imageGenerationChain = RunnableSequence.from([
    promptTemplate,
    model,
    new StringOutputParser(),
  ]);

  return imageGenerationChain;
}

// ComicTool: 内部用 ImageGenerationChain 扩展能力
async function getComicTool() {
  const imageGenerationChain = await getImageGenerationChain();

  const ComicTool = new DynamicStructuredTool({
    name: "generate-comic",
    schema: z.object({
      description: z.string().describe("来访者想要添加的人像画元素"),
    }),
    func: async ({ description }) => {
      const imageURL = await imageGenerationChain.invoke({ description });
      return imageURL;
    },
    description: "根据来访者的描述，生成一幅黑白漫画人像画并提供图片链接",
    returnDirect: true,
  });

  return ComicTool;
}

// ConversationAgent: 询问来访者信息并调用 ComicTool 生成图片链接
async function getConversationAgent() {
  const ComicTool = await getComicTool();

  const tools = [ComicTool];

  const agentPrompt = await ChatPromptTemplate.fromMessages([
    [
      "system",
      "你是一名接待来访者的助理，通过自然语言询问来访者想要的人像画元素，可以收集背景（包括星星、月亮、礼花、小地球、小花、小元宝）、饰品、宠物、其他等信息，用户比较懒得思考，你要尽量引导。语言需要有亲和力与吸引力。直到你有足够的信息调用 generate-comic 来生成图片链接。",
    ],
    new MessagesPlaceholder("history_message"),
    ["human", "{input}"],
    new MessagesPlaceholder("agent_scratchpad"),
  ]);

  const llm = new ChatOpenAI({
    temperature: 0.4,
  });
  const conversationAgent = await createOpenAIToolsAgent({
    llm,
    tools,
    prompt: agentPrompt,
  });

  const agentExecutor = new AgentExecutor({
    agent: conversationAgent,
    tools,
  });

  const messageHistory = new ChatMessageHistory();

  const conversationAgentWithHistory = new RunnableWithMessageHistory({
    runnable: agentExecutor,
    getMessageHistory: () => messageHistory,
    inputMessagesKey: "input",
    historyMessagesKey: "history_message",
  });

  return conversationAgentWithHistory;
}

// 主函数：启动对话并处理用户输入
async function main() {
  const conversationAgent = await getConversationAgent();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function chat() {
    rl.question("User: ", async (input) => {
      if (input.toLowerCase() === "exit") {
        rl.close();
        return;
      }

      const response = await conversationAgent.invoke(
        {
          input,
        },
        {
          configurable: {
            sessionId: "not-used",
          },
        }
      );

      console.log("Agent: ", response.output);

      chat();
    });
  }

  console.log(`
欢迎选择我们的手绘人像服务！为了帮助画师更好地创作，请您描述您希望的人像漫画内容和元素。请尽量详细地提供信息，以便画师创作出最符合您期望的作品。

1. 背景：您希望画面背景有哪些元素呢？例如星星、月亮、礼花、小地球、小花、小元宝等。
2. 饰品：您想让人物佩戴什么饰品吗？例如帽子、眼镜、耳环、项链等。
3 宠物：画中是否需要添加宠物？如果需要，请描述宠物的类型和外观。
4. 其他细节：还有其他特别的要求或细节需要包括在画中吗？

请尽量详细地描述您的需求，以便我们为您创作出满意的人像漫画。充分的沟通是成功的关键，期待与您共同完成这一美好的创作体验！
    `);
  chat();
}

main();
