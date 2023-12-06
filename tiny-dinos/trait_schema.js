import array from './traits';
  
  const uniqueValues = array.reduce((acc, obj) => {
    Object.keys(obj).forEach(key => {
      acc[key] = acc[key] || new Set();
      acc[key].add(obj[key]);
    });
    return acc;
  }, {});
  
  const result = {};
  Object.keys(uniqueValues).forEach(key => {
    result[key] = Array.from(uniqueValues[key]);
  });
  
  console.log(result);
  