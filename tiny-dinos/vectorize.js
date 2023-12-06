// utils/vectorizeTraits.js

export function vectorizeTraits(objects, schema) {
    const bitLengths = {};
    const binaryMappings = {};
    const vectorSummary = {};
  
    // Calculate bit lengths and binary mappings for each trait
    for (const [trait, options] of Object.entries(schema)) {
      const length = Math.ceil(Math.log2(options.length));
      bitLengths[trait] = length;
      vectorSummary[trait] = length;
  
      binaryMappings[trait] = options.reduce((acc, option, index) => {
        acc[option] = index.toString(2).padStart(length, '0');
        return acc;
      }, {});
    }
  
    // Calculate the total number of bits
    const totalBits = Object.values(vectorSummary).reduce((sum, numBits) => sum + numBits, 0);
    vectorSummary['TOTAL BITS'] = totalBits;
  
    // Convert each object's traits to a binary string
    const vectors = objects.map(obj => {
      return Object.entries(obj)
        .filter(([key]) => key !== 'tokenId') // Exclude tokenId from vectorization
        .map(([key, value]) => binaryMappings[key][value])
        .join('');
    });
  
    return { vectors, vectorSummary };
  }
  