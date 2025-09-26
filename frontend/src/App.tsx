import React, { useEffect, useState } from 'react';
import './App.css';
import logo from './assets/logo.png';

const API_BASE_URL = import.meta.env.VITE_API_URL;

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    document.title = 'Encurtador de URL | Rápido e Fácil';
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setShortUrl('');
    setLoading(true);

    try {
      const response = await fetch(API_BASE_URL + "api/shorten", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao encurtar a URL. Tente novamente.');
      }

      const data = await response.json();
      setShortUrl(data.shortUrl);
      setOriginalUrl('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <img src={logo} alt="Encurtador de URL Logo" className="app-logo" />
      </header>

      <main className="main-content">
        <div className="card">
          <h2>Cole a URL para ser encurtada</h2>
          <form onSubmit={handleSubmit} className="shortener-form">
            <input
              type="url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="Cole o link aqui"
              required
              className="url-input"
            />
            <button type="submit" disabled={loading} className="shorten-button">
              {loading ? 'Encurtando...' : 'Encurtar URL'}
            </button>
          </form>

          {error && <p className="message error-message">{error}</p>}

          {shortUrl && (
            <div className="result-section">
              <p className="message success-message">Sua URL encurtada:</p>
              <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="short-url-link">
                {shortUrl}
              </a>
            </div>
          )}

          <p className="app-description">
            Encurtador é uma ferramenta para encurtar URLs e gerar links curtos
            <br />
            Com o encurtador de URL é possível criar um link encurtado fácil de compartilhar
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;