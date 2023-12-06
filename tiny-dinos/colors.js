// colors.js
const colorMappings = {
    gradient: {
      "1": "#ff0000", // Replace with actual colors
      "2": "#00ff00",
      "3": "#0000ff",
      "4": "#ffff00",
      // Add other gradient color mappings as needed
    },
    dino: ({body, chest, spike}) => ({
      s: spike,
      D: body,
      b: chest
    }),
    eyes: ({eyes}) => ({
      o: eyes,
    }),
    default: {
      B: 'black',
      b: 'black',
      d: 'darkgray',
      w: 'white',
      r: 'red',
      g: 'green',
      G: 'gold',
      a: 'gray',
      m: 'magenta',
      p: 'purple',
    }
    // Add other trait color mappings as needed
  };
  
  export default colorMappings;
  