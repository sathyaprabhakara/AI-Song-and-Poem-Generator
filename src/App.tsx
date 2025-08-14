import { useState } from 'react';
import axios from 'axios';

function App() {
  const [theme, setTheme] = useState('');
  const [type, setType] = useState('song');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!theme.trim()) return alert("Please enter a theme");
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5050/generate', { theme, type });
      setResult(res.data.content);
    } catch (err) {
      console.error(err);
      alert("Error generating text. Make sure backend is running.");
    }
    setLoading(false);
  };

  return (
    <div style={{
      backgroundColor: "#121212",
      color: "white",
      minHeight: "100vh",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
        🎶 AI Song & Poem Generator
      </h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter a theme..."
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid gray",
            color: "black"
          }}
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid gray",
            color: "black"
          }}
        >
          <option value="song">Song</option>
          <option value="poem">Poem</option>
        </select>
        <button
          onClick={generate}
          disabled={loading}
          style={{
            backgroundColor: loading ? "gray" : "#007BFF",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>

      {result && (
        <div style={{
          backgroundColor: "#1E1E1E",
          padding: "15px",
          borderRadius: "8px",
          maxWidth: "600px",
          whiteSpace: "pre-wrap"
        }}>
          {result}
        </div>
      )}
    </div>
  );
}

export default App;
