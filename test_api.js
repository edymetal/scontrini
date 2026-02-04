import { GoogleGenerativeAI } from "@google/generative-ai";

async function testConnection() {
    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) {
        console.error("Erro: A variável de ambiente GEMINI_API_KEY não está definida.");
        return;
    }
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    try {
        const result = await model.generateContent("Respond with 'OK' if you see this.");
        const response = await result.response;
        console.log("Response:", response.text());
    } catch (error) {
        console.error("Connection failed:", error);
    }
}

testConnection();
