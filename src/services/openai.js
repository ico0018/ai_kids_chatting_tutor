/*import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
*/
async function sendMessage(message) {
  /*const response = await openai.createCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: "Hello"}],   
  });

  return response.data.choices[0].text.trim();
  */
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("AI Bot's response");
    }, 2000);
  });
}

export { sendMessage };
