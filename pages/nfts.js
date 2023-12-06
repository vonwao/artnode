import React, { useEffect, useState } from 'react';
import { render } from '../tiny-dinos/render';

const HomePage = () => {
  const [tokenId, setTokenId] = useState(1);
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    setSvgContent(render(tokenId));
  }, [tokenId]);

  const handleTokenChange = (change) => {
    setTokenId(prev => Math.max(1, prev + change));
  };

  return (
    <div style={{ padding: '10px' }}>
      <div dangerouslySetInnerHTML={{ __html: svgContent }} style={{ border: '1px solid black', width: '200px', height: '200px', marginBottom: '10px' }} />
      <div style={{ marginBottom: '10px' }}>Token ID: {tokenId}</div>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => handleTokenChange(-1)}>&lt;</button>
        <button onClick={() => handleTokenChange(1)}>&gt;</button>
      </div>
      <div>
        <input
          type="number"
          value={tokenId}
          onChange={e => setTokenId(Number(e.target.value))}
          style={{ width: '80px', marginRight: '10px' }}
        />
        <button onClick={() => handleTokenChange(0)}>Go</button>
      </div>
    </div>
  );
};

export default HomePage;
