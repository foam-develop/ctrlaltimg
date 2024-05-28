const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed'
        };
    }

    try {
        const pollDataPath = path.resolve(__dirname, '/data/data.json');
        const pollData = JSON.parse(fs.readFileSync(pollDataPath, 'utf8'));
        
        const newData = JSON.parse(event.body);

        // Update poll data with newData
        for (const key in newData) {
            if (newData.hasOwnProperty(key)) {
                pollData[key] = newData[key];
            }
        }

        fs.writeFileSync(pollDataPath, JSON.stringify(pollData, null, 2));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Poll data updated successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to update poll data', details: error.message }),
        };
    }
};