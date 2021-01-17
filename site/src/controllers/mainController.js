const path = require ('path');

module.exports = {
    index : function(req, res) {
        res.sendFile(path.join(__dirname, '../views/index.html'));//muestra el home
    },
}