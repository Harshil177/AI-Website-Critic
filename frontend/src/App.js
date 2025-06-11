import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!url.startsWith("http")) {
      setError("Please enter a valid URL starting with http/https.");
      return;
    }
    setLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await axios.get("http://127.0.0.1:8000/analyze", {
        params: { url },
      });
      setResponse(res.data.analysis);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="header"
      >
        <FaRobot size={60} className="icon" />
        <h1 className="gradient-text">AI Website Critic</h1>
        <p>Analyze your website's UI, SEO & performance instantly.</p>
      </motion.div>

      <motion.div
        className="input-section"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={handleAnalyze}>Analyze</button>
      </motion.div>

      {loading && (
        <motion.div className="loader" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
          🔄 Analyzing website...
        </motion.div>
      )}

      {error && <div className="error-msg">❌ {error}</div>}

      {response && (
        <motion.div
          className="result-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="gradient-text">🔍 Review Summary</h2>
          <pre>{response}</pre>
        </motion.div>
      )}
    </div>
  );
}

export default App;
