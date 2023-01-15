const config = require("../config");
var mysql = require("mysql");


var connection = mysql.createConnection(config.db);


function connect() {
    connection.connect(function (err) {
        if (err)
            throw err;
        console.log("Connected!");
    }
    );
}

module.exports = {
    connect: connect, 
    connection: connection,
}