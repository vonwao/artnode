// pages/vectorize.js

import { vectorizeTraits } from "../tiny-dinos/vectorize";
import  traits from "../tiny-dinos/traits";
import traitsSchema from "../tiny-dinos/traits-schema";

export default function VectorizePage() {

    console.log(traits.length);

  const { vectors, vectorSummary } = vectorizeTraits(traits, traitsSchema)
  return (
    <div>
      <h2>Vector Summary</h2>
      <pre>{JSON.stringify(vectorSummary, null, 2)}</pre>
      <h1>Vectorized Traits</h1>
      <ul>
        {vectors.map((vector, index) => (
          <li key={index}>
            Token ID {vectors[index].tokenId}: {vector}
          </li>
        ))}
      </ul>
    </div>
  );
}
