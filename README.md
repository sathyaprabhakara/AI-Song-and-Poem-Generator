# AI-Song-and-Poem-Generator 🎵✍️

An AI-powered Node.js backend that generates custom poems and songs from user prompts.
Integrates with [Ollama](https://ollama.com/) for **local LLM processing** and provides a simple REST API to interact with.
Ideal for creative projects, with support for themes, types, and potential **real-time streaming** output in the future.

---

## ✨ Features

* **AI-Generated Content**: Poems and songs based on your theme and style.
* **Local LLM Support**: Runs entirely on your machine using Ollama models (no external API calls).
* **REST API**: Easy-to-use JSON endpoints for generating creative text.
* **Customizable**: Choose `theme` and `type` (e.g., `"poem"`, `"song"`) in your requests.
* **Lightweight**: No heavy dependencies — quick setup and usage.

---

## 📦 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/AI-Song-and-Poem-Generator.git
cd AI-Song-and-Poem-Generator/backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Install and run Ollama

Download Ollama from [https://ollama.com/download](https://ollama.com/download) and ensure it’s running.
Then, pull a model (for example, `phi3:mini`):

```bash
ollama pull phi3:mini
```

### 4️⃣ Start the backend server

```bash
node index.js
```

You should see:

```
🚀 Backend running on http://localhost:5000
```

---

## 📡 API Usage

### **Endpoint**

`POST /generate`

### **Request Body**

```json
{
  "theme": "Bangalore monsoon",
  "type": "poem"
}
```

### **Example with curl**

```bash
curl -X POST http://localhost:5000/generate \
  -H "Content-Type: application/json" \
  -d '{"theme":"Bangalore monsoon","type":"poem"}'
```

---

## 🛠 Tech Stack

* **Node.js** – Backend server
* **Express.js** – API handling
* **Ollama** – Local AI model execution
* **phi3\:mini** – Example AI model used
