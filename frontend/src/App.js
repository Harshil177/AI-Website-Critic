import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaRobot, FaSearch, FaClipboard } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false); // 👈 Added

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

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="app-container">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="header"
      >
        <FaRobot size={40} className="icon" />
        <h1>AI Website Critic</h1>
        <TypeAnimation
          sequence={[
            "Analyze UI instantly...",
            2000,
            "Optimize SEO in seconds...",
            2000,
            "Boost your performance now!",
            2000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
          className="typewriter"
        />
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
        <motion.div
          className="loader-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="loader-shimmer" />
          <p>Analyzing website...</p>
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
          <h2><FaSearch className="search-icon" /> Review Summary</h2>

          {/* 👇 Copy Button */}
          <button className="copy-btn" onClick={handleCopy}>
            <FaClipboard /> {copied ? "Copied!" : "Copy to clipboard"}
          </button>

          <pre>{response}</pre>
        </motion.div>
      )}
    </div>
  );
}

export default App;
