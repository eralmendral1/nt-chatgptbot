import { Configuration, OpenAIApi } from 'openai';

import dontenv from 'dotenv'

dontenv.config()

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY
})

const openai = new OpenAIApi(configuration)

export default openai