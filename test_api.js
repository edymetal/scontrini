import { GoogleGenerativeAI } from "@google/generative-ai";

async function testConnection() {
    const API_KEY = "AIzaSyBt2AcyoPntlZ4XgiWUUoEqVzz0Nsk8G7c";
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
