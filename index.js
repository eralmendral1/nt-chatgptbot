import openai from './config/open-ai.js'
import readlineSync from 'readline-sync'
import colors from 'colors'

const main = async () => {
    console.log(colors.bold.green("Welcome to the Chatbot App!"))
    console.log(colors.green("You can start chatting with the bot."))

    const username = readlineSync.question("May I have your name? ")
    console.log(`Hello ${username}`)

    const chatHistory = [] // Store conversation history.

    while (true) {
        const userInput = readlineSync.question(colors.yellow('You: '))

        try {
            // Construct messages by iiterating over history.
            const messages = chatHistory.map(([role, content]) => ({ role, content }))

            // Add latest user input
            messages.push({ role: 'user', content: userInput})

            // Call the API with the user input
            const chatCompletion = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: messages
            })

            // Get completion text content
            const completionText = chatCompletion.data.choices[0].message.content;

            if (userInput.toLowerCase() === 'exit') {
                console.log(colors.green(`Bot: ${completionText}`))
                return
            }
            
            console.log(colors.green(`Bot: ${completionText}`))

            // Update history with usr input and assistant response.
            chatHistory.push(['user', userInput])
            chatHistory.push(['assistant', completionText])

        } catch (error) {
            console.error(colors.red(error))
        }
    }
}

main()