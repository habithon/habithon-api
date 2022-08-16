const { Client } = require("pg");

const pool = new Client({
    connectionString: 'postgres://sbjfbhfzgoiswk:fb717eea0bc01df8c6823941d0e76e784bc54e49a58b787720cac66eafb70b59@ec2-44-195-100-240.compute-1.amazonaws.com:5432/d9qi67n5l29vl5',
    ssl: {
        rejectUnauthorized: false,
    }
});
db.connect();

module.exports = pool;