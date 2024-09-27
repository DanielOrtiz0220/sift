import { ChatAnthropicMessages } from "@langchain/anthropic";
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const modelOutput = async () => {
  const model = new ChatAnthropicMessages({
  apiKey: process.env.ANTHROPIC_API_KEY,
});


try{
  const response = await model.invoke("Hello world!");
  return response 
}
catch (error){
  if (error){
    console.log(error)
  }
}
}

modelOutput().then(result => console.log(result))





