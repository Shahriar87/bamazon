var inquirer = require('inquirer');
var mysql = require('mysql');

// USING DOTENV FOR DATABASE CREDENTIALS

require('dotenv').config();
var keys = require("./keys.js");

// CREATING CONNECTION WITH DATABASE

var totalCost;
var con = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: keys.databasecredentials.user,
    password: keys.databasecredentials.password,
    database: 'bamazon'
});

con.connect(function (err) {
    if (err) throw err;
    console.log('connected')
});

function inquireManager() {
    inquirer.prompt([{
        name: "selectTodo",
        type: "list",
        message: "What do you want to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }]).then(function (answer) {

        switch (answer.selectTodo) {
            case "View Products for Sale":
                showInventory();
                break;
        }
    })
}

function showInventory() {
    con.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        console.log("Available Items in store");
        console.log("==========================================");
        console.log(res);
        console.log("==========================================");
    });

};

inquireManager();
