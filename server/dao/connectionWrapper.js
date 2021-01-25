const mySQL = require('mysql2');

// The connection data to the DB
const connection = mySQL.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "messaging-system"
});

// Connecting to the DB
connection.connect( error => {
    if (error) {
        
        console.log(`Failed To Create Connection: ${error}`);
        return;
    }

    console.log('Connected to DB');
});

/**
 * Executes an SQL query without parameters to the DB
 * @param {string} SQL 
 */
function execute(SQL) {

    return new Promise( (resolve, reject) => {
        connection.query(SQL, (error, result) => {
            if (error) {

                console.log("Failed interacting with DB, calling reject");

                // reject calls the 'catch' inside the DAO preset
                reject(error);
                return;
            }

            // resolve = success, move on with the function inside the DAO preset
            resolve(result);
        });
    });
}

/**
 * Executes an SQL query with parameters to the DB
 * @param {string} SQL
 * @param {array} parameters
 */
function executeWithParameters(SQL, parameters) {

    return new Promise( (resolve, reject) => {
        connection.execute(SQL, parameters, (error, result) => {
            
            if (error) {

                console.log("Failed interacting with DB, calling reject");
                // reject calls the 'catch' inside the DAO preset
                reject(error);
                return;
            }

            // resolve = success, move on with the function inside the DAO preset
            resolve(result);
        });
    });
}



module.exports = {
    execute,
    executeWithParameters
};