const dbconfig = require('./dbconfig.js');
const { Pool } = require('pg');

const pool = new Pool({
    user: dbconfig.user,
    host: dbconfig.host,
    database: dbconfig.database,
    password: dbconfig.password,
    port: dbconfig.port,
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
};