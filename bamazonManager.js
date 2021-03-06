var inquirer = require('inquirer');
var mysql = require('mysql');

// USING DOTENV FOR DATABASE CREDENTIALS

require('dotenv').config();
var keys = require("./keys.js");

// CREATING CONNECTION WITH DATABASE

var con = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: keys.databasecredentials.user,
    password: keys.databasecredentials.password,
    database: 'bamazon'
});

con.connect(function (err) {
    if (err) throw err;
    console.log('connected');
    inquireManager();
});

// INQUIRE MANAGER ABOUT WHAT TO DO

function inquireManager() {
    inquirer.prompt([{
        type: "list",
        message: "What do you want to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        name: "selectTodo"
    }]).then(function (answer) {

        switch (answer.selectTodo) {
            case "View Products for Sale":
                showInventory();
                break;
            case "View Low Inventory":
                showLowInventory();
                break;
            case "Add to Inventory":
                updateInventory();
                break;
            case "Add New Product":
                addInventory();
                break;
        }
    })
}

// SHOW ALL INVENTORY

function showInventory() {
    con.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        console.log("Available Items in store");
        console.log("========================================================================================================================");
        for (i = 0; i < res.length; i++) {
            console.log('Item ID:' + res[i].item_id + '   Product Name: ' + res[i].product_name + '   Department Name: ' + res[i].department_name
                + '   Price: ' + '$' + res[i].price + '   Quantity in Stock: ' + res[i].stock_quantity);
            console.log("------------------------------------------------------------------------------------------------------------------------");
        };
        console.log("========================================================================================================================");
        nextTransaction();
    });
};

// SHOW LOW INVENTORY

function showLowInventory() {
    con.query('SELECT * FROM products WHERE stock_quantity < 5', function (err, res) {
        if (err) throw err;
        console.log("Items with less than 5 quantities");
        console.log("========================================================================================================================");
        for (i = 0; i < res.length; i++) {
            console.log('Item ID:' + res[i].item_id + '   Product Name: ' + res[i].product_name + '   Department Name: ' + res[i].department_name
                + '   Price: ' + '$' + res[i].price + '   Quantity in Stock: ' + res[i].stock_quantity);
            console.log("------------------------------------------------------------------------------------------------------------------------");
        };
        console.log("========================================================================================================================");
        nextTransaction();
    });
};

// ADD MORE INVENTORY

function updateInventory() {
    inquirer.prompt([{
        name: "selectProd",
        type: "input",
        message: "Please enter the product ID you want to add more?",
        validate: function (value) {
            var valid = value.match(/^[0-9]*$/)
            if (valid) {
                return true
            } else {
                return "Please enter a valid Product ID"
            }
        }
    }, {
        name: "selectQuant",
        message: "How many quantity would you like to Add?",
        validate: function (value) {
            var valid = value.match(/^[0-9]*$/)
            if (valid) {
                return true
            } else {
                return "Please enter valid quantity"
            }
        }
    }]).then(function (answer) {

        con.query("SELECT * FROM products WHERE item_id = ?",
            [answer.selectProd],
            function (err, res) {
                con.query("UPDATE products SET ? WHERE ?",
                    [{
                        stock_quantity: res[0].stock_quantity + parseInt(answer.selectQuant)
                    }, {
                        Item_id: answer.selectProd
                    }],
                );
                nextTransaction();
            })
    })
}

// ADD MORE PRODUCT

function addInventory() {
    inquirer.prompt([{
        name: "prodName",
        type: "input",
        message: "Please enter the product name"
    }, {
        name: "prodDept",
        type: "input",
        message: "Please enter the department name"
    }, {
        name: "prodPrice",
        type: "input",
        message: "Please enter the product listed price",
        validate: function (value) {
            var valid = value.match(/^[0-9]*$/)
            if (valid) {
                return true
            } else {
                return "Please enter a valid price"
            }
        }
    }, {
        name: "prodQuant",
        type: "input",
        message: "Please enter how many products you want to add",
        validate: function (value) {
            var valid = value.match(/^[0-9]*$/)
            if (valid) {
                return true
            } else {
                return "Please enter valid quantity"
            }
        }
    }
    ]).then(function (answer) {

        con.query(
            "INSERT INTO products SET ?",
            {
                product_name: answer.prodName,
                department_name: answer.prodDept,
                price: parseInt(answer.prodPrice),
                stock_quantity: parseInt(answer.prodQuant)
            },
            function (err, res) {
                con.query('SELECT * FROM products', function (err, res) {
                    if (err) throw err;
                    console.log("Available Items in store");
                    console.log("========================================================================================================================");
                    for (i = 0; i < res.length; i++) {
                        console.log('Item ID:' + res[i].item_id + '   Product Name: ' + res[i].product_name + '   Department Name: ' + res[i].department_name
                            + '   Price: ' + '$' + res[i].price + '   Quantity in Stock: ' + res[i].stock_quantity);
                        console.log("------------------------------------------------------------------------------------------------------------------------");
                    };
                    console.log("========================================================================================================================");
                    nextTransaction();
                });
            }
        );
    })
};

function nextTransaction() {
    inquirer.prompt([{
        type: "confirm",
        name: "another",
        message: "Would you like to check anything else?"
    }]).then(function (answer) {
        if (answer.another) {
            inquireManager();
        }
        else {
            console.log("==============================================");
            console.log("Thank you! Inventory Record is shutting down!");
            console.log("==============================================");
            con.end();
        }
    })
};

