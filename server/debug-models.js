
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;
console.log('API Key present?', !!apiKey);
console.log('API Key length:', apiKey ? apiKey.length : 0);

const genAI = new GoogleGenerativeAI(apiKey);

async function testModels() {
    const modelsToTry = [
        "gemini-1.5-flash",
        "gemini-1.5-flash-001",
        "gemini-1.5-pro",
        "gemini-pro"
    ];

    for (const modelName of modelsToTry) {
        console.log(`\nTesting ${modelName}...`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello, are you there?");
            console.log(`✅ Success with ${modelName}!Response:`, result.response.text());
            return; // Exit on first success
        } catch (error) {
            console.error(`❌ Failed ${modelName}:`, error.message.split('\n')[0]);
        }
    }
}

testModels();
