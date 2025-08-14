import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import cors from "cors";
import { AbortController } from "abort-controller"; // Add this import

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.post("/generate", async (req, res) => {
  console.log("Received /generate POST:", req.body);
  try {
    const { theme, type } = req.body;
    if (!theme || !type) {
      return res.status(400).json({ success: false, error: "Missing theme or type" });
    }

    const prompt = `Write a ${type} about ${theme}.`;

    // Add timeout logic
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000); // 10 seconds

    let ollamaRes;
    try {
      ollamaRes = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "phi3:mini",
          prompt: prompt,
          stream: false
        }),
        signal: controller.signal
      });
    } catch (err) {
      if (err.name === "AbortError") {
        throw new Error("Ollama API request timed out");
      }
      throw err;
    } finally {
      clearTimeout(timeout);
    }

    const data = await ollamaRes.json();

    if (!data.response) {
      throw new Error("No response from Ollama");
    }

    console.log("Generated:", data.response);

    res.json({ success: true, content: data.response });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(5050, () => {
  console.log("🚀 Backend running on http://localhost:5050");
});