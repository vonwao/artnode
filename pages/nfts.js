import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const [tokenId, setTokenId] = useState(1);
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Failed to load script ${src}`));
        document.head.appendChild(script);
      });
    };

    Promise.all([
      loadScript('http://localhost:3001/scripts/render.js'),
      loadScript('http://localhost:3001/scripts/traits.js')
    ])
    .then(() => {
      renderToken(); // Render the initial token
    })
    .catch(error => console.error(error));
  }, []);

  const renderToken = () => {
    if (window.renderNFT) {
      const svg = window.renderNFT(tokenId);
      setSvgContent(svg);
    }
  };

  const handleTokenChange = (change) => {
    setTokenId(prev => Math.max(1, prev + change));
  };

  return (
    <div>
      <input 
        type="number" 
        value={tokenId} 
        onChange={e => setTokenId(Number(e.target.value))} 
      />
      <button onClick={() => handleTokenChange(-1)}>Back</button>
      <button onClick={() => handleTokenChange(1)}>Next</button>
      <button onClick={renderToken}>Go</button>
      <div dangerouslySetInnerHTML={{ __html: svgContent }} />
    </div>
  );
};

export default HomePage;
