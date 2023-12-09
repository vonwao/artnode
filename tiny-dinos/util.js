export function getObjectStructure(obj) {
  // Helper function to determine if a value is an object
  const isObject = (val) =>
    val && typeof val === "object" && !Array.isArray(val);

  // Recursive function to process each property
  function processObject(currentObj) {
    if (isObject(currentObj)) {
      const structure = {};
      for (const key in currentObj) {
        structure[key] = processObject(currentObj[key]);
      }
      return structure;
    } else {
      return null; // Replace leaf values with null or any desired placeholder
    }
  }

  return processObject(obj);
}
