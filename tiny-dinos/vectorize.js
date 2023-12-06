
export function vectorizeTraits(objects, schema) {
    const bitLengths = {};
    const binaryMappings = {};
    const vectorSummary = {};
  
    // Calculate bit lengths and binary mappings for each trait
    for (const [trait, options] of Object.entries(schema)) {
      const length = Math.ceil(Math.log2(options.length));
      bitLengths[trait] = length;
      vectorSummary[trait] = length;

      console.log(trait, options, length);
  
      binaryMappings[trait] = options.reduce((acc, option, index) => {
        acc[option] = index.toString(2).padStart(length, '0');
        return acc;
      }, {});
    }
  
    // Convert each object's traits to a binary string
    const vectors = objects.map(obj => {
      return Object.entries(obj)
        .filter(([key]) => key !== 'tokenId') // Exclude tokenId from vectorization
        .map(([key, value]) => binaryMappings[key][value])
        .join('');
    });
  
    return { vectors, vectorSummary };
  }
  
  