var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password'
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    dropDatabase()
});

// DROP DATABASE

function dropDatabase() {
    var query = con.query(
        "DROP DATABASE IF EXISTS bamazon",
        function (err, res) {
            if (err) throw err;
            console.log("Database deleted");
            // LOGS THE ACTUAL QUERY
            console.log(query.sql);
            // console.log(res);
            createDatabase()
        }
    );
}

// CREATE DATABASE

function createDatabase() {
    var query = con.query(
        "CREATE DATABASE bamazon",
        function (err, res) {
            if (err) throw err;
            console.log("Database created");
            // LOGS THE ACTUAL QUERY
            console.log(query.sql);
            useDatabase()
        }
    );
}

// USE DATABASE

function useDatabase() {
    var query = con.query(
        "USE bamazon",
        function (err, res) {
            if (err) throw err;
            console.log("Database is being use");
            // LOGS THE ACTUAL QUERY
            console.log(query.sql);
            createTable()
        }
    );
}

// CREATE TABLE

function createTable() {
    var query = con.query(
        "CREATE TABLE products (item_id INT NOT NULL AUTO_INCREMENT,product_name VARCHAR(100) NOT NULL,department_name VARCHAR(100) NOT NULL,price DECIMAL(10, 2) default 0,stock_quantity INT default 0,PRIMARY KEY(item_id))",
        function (err, res) {
            if (err) throw err;
            console.log("products table is created");
            // LOGS THE ACTUAL QUERY
            console.log(query.sql);
            createProducts()
        }
    );
}

// INSERT PRODUCTS INTO TABLE

function createProducts() {
    let stmt = "INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ?";
    let todos = [
        ["Martin Custom D", "Acoustic Guitar", 999, 20],
        ["Gibson Les Paul", "Electric Guitar", 849, 15],
        ["ESP LTD", "Electric Guitar", 329, 22],
        ["Takamine GD", "Acoustic Guitar", 449, 33],
        ["Yamaha F335", "Acoustic Guitar", 129, 17],
        ["Rickenbacker", "Bass Guitar", 899, 14],
        ["Fender Jazz", "Bass Guitar", 759, 30],
        ["Warwick Streamer", "Bass Guitar", 1800, 3],
        ["Fender Telecaster", "Electric Guitar", 699, 9],
        ["Roland RD-2000", "Keyboard", 2499, 20],
        ["Yamaha P-125", "Keyboard", 599, 3],
        ["TAMA Superstar", "Drums", 899, 8]
    ];
    var query = con.query(
        stmt, [todos],
        function (err, res) {
            if (err) throw err;
            console.log("products table is created");
            // LOGS THE ACTUAL QUERY
            console.log(query.sql);
        }
    );
}

