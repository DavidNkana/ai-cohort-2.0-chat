import { Configuration, OpenAIApi } from "openai";
import cors from 'cors'
import express from 'express'
import bodyParser from "body-parser";
import * as dotenv from 'dotenv'

dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: 'org-4XZqV8SNcP4RJlY1Y9Q5lIjd'
})

const openai = new OpenAIApi(configuration)

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.post('/', async (req, res) => {
    
        const {messages} = req.body

        const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            {"role": "system", "content": "You are AI Cohort 2.0, a helpful AI assistant developed by David Nkana as part of a portfolio project."},
            ...messages,
        ]
    })
    res.json({
        completion: completion.data.choices[0].message,
    })

    
})

app.get('/', (req, res) => {
    res.send('This is the root path')
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))

