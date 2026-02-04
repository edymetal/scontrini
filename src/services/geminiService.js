import { GoogleGenerativeAI } from "@google/generative-ai";

// Convert file to Base64
const fileToGenerativePart = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Data = reader.result.split(',')[1];
            resolve({
                inlineData: {
                    data: base64Data,
                    mimeType: file.type,
                },
            });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export const validateApiKey = async (apiKey) => {
    if (!apiKey) return false;
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        await model.generateContent("Test connection");
        return true;
    } catch (error) {
        console.error("API Key Validation Failed:", error);
        return false;
    }
};

export const processReceiptImage = async (file, apiKey) => {
    if (!apiKey) {
        throw new Error("Chiave API mancante.");
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const imagePart = await fileToGenerativePart(file);

        const prompt = `
      Analizza questa immagine di scontrino fiscale italiano.
      Estrai la lista dei prodotti (prezzi inclusi) e la DATE DELLO SCONTRINO (giorno, mese, anno, ora e minuti).
      
      Importante:
      1. Se la data non è chiaramente leggibile, usa null per il campo "data".
      2. Ignora subtotali, totale complessivo o intestazione del negozio per la lista prodotti.
      3. Restituisci un oggetto JSON puro senza markdown. 

      Formato atteso: 
      {
        "data": "YYYY-MM-DD HH:mm" o null,
        "prodotti": [{"descrizione": "Nome Prodotto", "prezzo": 10.50}, ...]
      }
    `;

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = response.text();

        // Clean up potential markdown code blocks provided by the model
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(cleanText);
    } catch (error) {
        console.error("Errore Gemini:", error);
        throw new Error("Impossibile elaborare lo scontrino. Verifica la foto o la chiave API.");
    }
};
