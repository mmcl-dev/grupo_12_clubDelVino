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
        deleteImage(id){
            //busco y borro el archivo imagen para que no quede imagenes basura en la DB
            //***********OJOOOOO VER QUE AHORA TAMBIEN HAY IMAGENES DE USUARIO... ARMAR METODO PARA ESAS IMAGENE TAMBIEN... PENDIENTE!!! */
            let imageToDelete = this.find(id);
            if(imageToDelete.image != 'vino_default.png' && imageToDelete.image != ''){
            try {
                fs.unlinkSync( path.join(__dirname, '../../public/img/' +  imageToDelete.image));
                    console.error('Imagen borrada en: ' + path.join(__dirname, '../../public/img/' +  imageToDelete.image));
                } catch(err) {
                    console.error('ERROR= ', err);
                }
            }
        },
        all() {
            return this.readfile();//motodo para devolver todo lo que contenga tablaX.json
        },
        find(id) {
            let contents = this.readfile();
            return contents.find(elem => elem.id == id);
        },
        nextId() {
           let rows = this.readfile();
           let lastRow = rows.pop();
           
           if (lastRow) {
               return ++lastRow.id;
           } else {
               return 1;
           }
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
        },
        create(row){
            let rows = this.readfile();
            row.id = this.nextId();
            rows.push(row);

            this.writeFile(rows);
            return(row.id);
        },
        delete(id){
            this.deleteImage(id);
            // leo y traigo todas las filas del JSON
            let rows = this.readfile();
            // Filtro y dejo las que sean distintas al id que quiero borrar
            let updatedRows = rows.filter(oneRow => oneRow.id != id);  
            // Escribo el archivo JSON con las filas distintas a la que traje (la que queria borrar)
            this.writeFile(updatedRows);
        }
    }
}

module.exports = model;
