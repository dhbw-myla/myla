const dbconfig = require('./dbconfig.js');
const { Pool } = require('pg');
const dns = require('dns');
let address = "";

dns.resolve4(dbconfig.host, function (err, addresses, family) {
    address = addresses;
});
let pool = undefined;

module.exports = {
    query: (text, params, callback) => {
        if(!pool){
           pool = new Pool({
                user: dbconfig.user,
                host: address[0],
                database: dbconfig.database,
                password: dbconfig.password,
                port: dbconfig.port,
                idleTimeoutMillis: 30000,
                connectionTimeoutMillis: 10000,
            });
            
            pool.on('error', (err, client) => {
                console.error('Unexpected error on idle client', err)
                process.exit(-1)
            })
        }
        return pool.query(text, params, callback);
    },
};


