import React, { useEffect, useState } from 'react';
import { render } from '../tiny-dinos/render';

const HomePage = () => {
  const [tokenId, setTokenId] = useState('');
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    const svg = render(1); // Use the appropriate token ID
    // console.log('SVG returned:', svg);
    setSvgContent(svg);
  }, []);

  const renderToken = () => {
    console.log(`Attempting to render token ID: ${tokenId}`);
    const svg = render(tokenId);
    // console.log('SVG returned:', svg);
    setSvgContent(svg);
  };


  const handleTokenChange = (change) => {
    setTokenId(prev => Math.max(1, prev + change));
  };

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: svgContent }} style={{ border: '1px solid black', width: '200px', height: '200px' }} />
      <div>Token ID: {tokenId}</div>

      <div>
        <button onClick={() => handleTokenChange(-1)}>Back</button>
        <button onClick={() => handleTokenChange(1)}>Next</button>

      </div>

      <div>
        <input
          type="number"
          value={tokenId}
          onChange={e => setTokenId(Number(e.target.value))}
        />
        <button onClick={() => renderToken(tokenId)}>Go</button>
      </div>
    </div>
  );
};

export default HomePage;
