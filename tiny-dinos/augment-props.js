// Function to parse the value into color and type
function parseValue(value) {
    const result = { color: '', type: '' };

    if (value.includes('linear gradient')) {
        result.type = 'linear gradient';
        result.color = value.replace('linear gradient', '').trim();
    } else if (value.includes('conical gradient')) {
        result.type = 'conical gradient';
        result.color = value.replace('conical gradient', '').trim();
    } else {
        result.color = value.trim();
    }

    return result;
}

// Function to augment an object with additional properties
export function augmentObject(obj) {
    if (obj.background) {
        const backgroundParsed = parseValue(obj.background);
        obj['background-color'] = backgroundParsed.color;
        obj['background-type'] = backgroundParsed.type;
    }

    if (obj.body) {
        const bodyParsed = parseValue(obj.body);
        obj['body-color'] = bodyParsed.color;
        obj['body-type'] = bodyParsed.type;
    }

    return obj;
}

// Example usage
const myObject = {
    background: 'red linear gradient',
    body: 'green'
};

const augmentedObject = augmentObject(myObject);
console.log(augmentedObject);
