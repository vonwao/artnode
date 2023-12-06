import React, { useEffect, useState } from 'react';
import { render } from '../tiny-dinos/render';

const HomePage = () => {
  const [tokenId, setTokenId] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [svgContent, setSvgContent] = useState('');
  const [traits, setTraits] = useState('');

  useEffect(() => {
    const [traits, svg] = render(tokenId)
    console.log(traits);
    console.log('SVG --------',svg);
    setSvgContent(svg);
    setTraits(traits);
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') handleTokenChange(1);
      if (e.key === 'ArrowLeft') handleTokenChange(-1);
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [tokenId]);

  const handleTokenChange = (change) => {
    setTokenId(prev => Math.max(1, prev + change));
    setInputValue('');
    console.clear();
    console.log('Console cleared!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div>
      <div dangerouslySetInnerHTML={{ __html: svgContent }} style={{ border: '1px solid black', width: '200px', height: '200px', marginBottom: '10px' }} />
      {/* <pre>{JSON.stringify(traits, null, 2)}</pre> */}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ marginRight: '10px' }}>Tiny Dino #{tokenId}</span>
        <div>
          <button onClick={() => handleTokenChange(-1)}>&lt;</button>
          <button onClick={() => handleTokenChange(1)}>&gt;</button>
        </div>
      </div>
      <div>
        <input
          type="number"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          style={{ width: '80px', marginRight: '10px' }}
        />
        <button onClick={() => { setTokenId(Number(inputValue) || tokenId); setInputValue(''); }}>Go</button>
      </div>
    </div>
  );
};

export default HomePage;
