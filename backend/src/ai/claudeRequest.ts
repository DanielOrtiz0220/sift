import { ChatAnthropicMessages } from "@langchain/anthropic";
import dotenv from 'dotenv'

dotenv.config()

const modelOutput = async (prompt: string) => {
  const model = new ChatAnthropicMessages({
  apiKey: process.env.ANTHROPIC_API_KEY,
  model: "claude-3-5-sonnet-20240620",
});


try{
  const response = await model.invoke(prompt);
  return response.content
}
catch (error){
  console.log(error)
}
}

export { modelOutput };





