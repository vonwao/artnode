// render.js
function renderNFT(tokenId) {
    const traits = window.dinoTraits.find(dino => dino.tokenId === tokenId);
    if (!traits) {
      console.error('No traits found for token ID:', tokenId);
      return;
    }
  
    const svg = `
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${traits.background}"/>
        <text x="10" y="20" font-family="Verdana" font-size="15" fill="black">Token ID: ${tokenId}</text>
        <text x="10" y="40" font-family="Verdana" font-size="15" fill="black">Body: ${traits.body}</text>
        <!-- Add more SVG elements based on traits here -->
      </svg>
    `;
  
    return svg;
  }
  
  window.renderNFT = renderNFT;
  