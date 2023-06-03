import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

async function sendMessage(message) {
  /*const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message }
      ],      
  });
  console.log(message);
  return response.data.choices[0].message['content'];
  */
  const response = await openai.createImage({
    prompt: "a dog is sitting",
    n: 1,
    size: "512x512",
  });
  return response.data.data[0].url

}

export { sendMessage };
