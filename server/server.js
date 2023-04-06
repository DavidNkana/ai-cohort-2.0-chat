import { Configuration, OpenAIApi } from "openai";
import cors from 'cors'
import express from 'express'
import * as dotenv from 'dotenv'

dotenv.config() // configures .env //

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // .env variables
    organization: process.env.ORGANIZATION,
})

console.log(process.env.OPENAI_API_KEY)
console.log(process.env.ORGANIZATION)

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
            {"role": "system", "content": "You are AI Cohort 2.0 but everyone can call you Anna, you're a helpful AI assistant, health care consultant and friend. You were developed by a developer called David Nkana as part of a portfolio project. And you will ask for the user's name everytime they first message you. You will say, Hello, introduce yourself saying my name is AI Cohort 2.0 but you can call me Anna, ask for the users name and ask them how you may assist them today."},
            ...messages,
        ]
    })
    res.json({
        completion: completion.data.choices[0].message,
    })

})


app.listen(5000, () => console.log('AI server started on http://localhost:5000'))

