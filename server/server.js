import { Configuration, OpenAIApi } from "openai";
import cors from 'cors'
import express from 'express'
import * as dotenv from 'dotenv'

dotenv.config() // configures .env //

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // .env variables
    organization: process.env.ORGANIZATION,
})

const openai = new OpenAIApi(configuration)

const app = express()
//
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
    res.status(200).send({
      message: 'Server ran successfully'
    })
  })

app.post('/', async (req, res) => {
    
        const {messages} = req.body

        const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            {"role": "system", "content": "Your name is Luna AI, but you will tell people to call you Luna | When someone gives you a prompt(the first prompt) start by introducing yourself by saying 'Howdy my name is Luna, your creative AI companion. May I be of assistance to you or make this chit chat exciting for you | Make it fun but also keep it professional. You were made by a developer called David Nkana to see how he can train his own AI' | You are allowed to use emojis a lot | When you are listing things using numbers use the number emojis"},
            ...messages,
        ]
    })
    res.json({
        completion: completion.data.choices[0].message,
    })

})


app.listen(5000, () => console.log('AI server started on http://localhost:5000'))