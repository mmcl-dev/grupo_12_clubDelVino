const fs = require('fs');
const path = require('path');

let model = function(tableName) {
    return {
        filePath : path.join(__dirname, '/' + tableName + '.json'),
        readfile() {
            let fileContents = fs.readFileSync(this.filePath, 'utf8');
            if (fileContents) {
                return JSON.parse(fileContents);
            }
            return [];
        },
        all() {
            return this.readfile();//motodo para devolver todo lo que contenga products.json
        },
    }
}

module.exports = model;
