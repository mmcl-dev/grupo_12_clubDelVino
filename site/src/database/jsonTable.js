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
        writeFile(contents){
            let fileContents = JSON.stringify(contents, null, " ");
            fs.writeFileSync(this.filePath, fileContents);
        },
        all() {
            return this.readfile();//motodo para devolver todo lo que contenga tablaX.json
        },
        find(id) {
            let contents = this.readfile();
            return contents.find(elem => elem.id == id);
        },
        update(row) {
            let rows = this.readfile();
            let updateRows = rows.map(oneRow => {
                if (oneRow.id == row.id) {
                    return row;
                }
                return oneRow;
            });

            this.writeFile(updateRows);

            return row.id;
        }
    }
}

module.exports = model;
