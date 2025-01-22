// import express from 'express';
// const router = express.Router();
// import Configuration from "openai";
// import OpenAIApi from "openai";
// import dotenv from 'dotenv'
// dotenv.config()

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// console.log(configuration);
// const openai = new OpenAIApi(configuration);

// router.post('/ask', async (req, res) => {
//   const { topic, difficulty } = req.body;
//     console.log(topic);
//   if (!topic || !difficulty) {
//     return res.status(400).json({ error: 'Topic and difficulty are required' });
//   }

//   try {
//     const response = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         { role: 'system', content: 'You are a chatbot that suggests project ideas.' },
//         { role: 'user', content: `Suggest a ${difficulty} level project idea on the topic: ${topic}.` },
//       ],
//     });

//     const suggestion = response.data.choices[0].message.content;
//     res.json({ suggestion });
//   } catch (error) {
//     console.error('Error in Chatbot Route:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// export {router as ChatbotRouter}
