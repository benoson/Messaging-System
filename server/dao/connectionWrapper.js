const mySQL = require('mysql2');

const connection = mySQL.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "messaging-system"
});

connection.connect( error => {
    if (error) {
        console.log(`Failed To Create Connection: ${error}`);
        return;
    }
    console.log('Connected to DB');
});

/**
 * 
 * @param {string} SQL 
 */
function execute(SQL) {

    return new Promise( (resolve, reject) => {
        connection.query(SQL, (error, result) => {
            if (error) {
                console.log("Failed interacting with DB, calling reject");
                reject(error);
                return;
            }
            resolve(result);
        });
    });
}

/**
 * 
 * @param {string} SQL 
 * @param {array} parameters 
 */
function executeWithParameters(SQL, parameters) {

    return new Promise( (resolve, reject) => {
        connection.execute(SQL, parameters, (error, result) => {
            if (error) {
                console.log(error);
                console.log("Failed interacting with DB, calling reject");
                reject(error);
                return;
            }
            resolve(result);
        });
    });
}


module.exports = {
    execute,
    executeWithParameters
};