// pages/data-viewer.js
import React, { useState, useEffect } from 'react';
import traits from '@/tiny-dinos/traits';

const DataView = () => {

  // State for the unique values and view toggle
  const [uniqueValues, setUniqueValues] = useState({});
  const [isTableView, setIsTableView] = useState(true);

  useEffect(() => {
    const calculateUniqueValues = (arr) => {
      const values = arr.reduce((acc, obj) => {
        Object.keys(obj).forEach(key => {
          acc[key] = acc[key] || new Set();
          acc[key].add(obj[key]);
        });
        return acc;
      }, {});

      // Convert Sets to Arrays for display
      const result = {};
      Object.keys(values).forEach(key => {
        result[key] = Array.from(values[key]);
      });

      return result;
    };

    setUniqueValues(calculateUniqueValues(traits));
  }, []);

  return (
    <div>
      <button onClick={() => setIsTableView(!isTableView)}>
        Toggle View
      </button>

      {isTableView ? (
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Values</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(uniqueValues).map(([key, values]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{values.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <pre>{JSON.stringify(uniqueValues, null, 2)}</pre>
      )}
    </div>
  );
};

export default DataView;
