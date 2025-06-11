import React, { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState(null);

  const handleAnalyze = async () => {
    const res = await fetch(`http://127.0.0.1:8000/analyze?url=${url}`);
    const data = await res.json();
    setResponse(data);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🧠 AI Website Critic</h2>
      <input
        type="text"
        placeholder="Enter website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: '300px', padding: '10px', marginRight: '10px' }}
      />
      <button onClick={handleAnalyze}>Analyze</button>

      {response && (
        <div style={{ marginTop: '20px' }}>
          <h3>🔍 Analysis for: {response.url}</h3>
          <p><strong>UI/UX:</strong> {response.analysis.ui_ux}</p>
          <p><strong>SEO:</strong> {response.analysis.seo}</p>
          <p><strong>Performance:</strong> {response.analysis.performance}</p>
        </div>
      )}
    </div>
  );
}

export default App;
