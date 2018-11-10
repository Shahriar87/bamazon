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

// SHOWING AVAILABLE INVENTORY ITEMS

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
        inquireUser();
    });

};

// INQUIRE USER TO PUT WHICH & HOW MANY PRODUCTS THEY WANT TO PURCHASE

function inquireUser() {
    inquirer.prompt([{
        name: "selectProd",
        type: "input",
        message: "Please enter the product ID you want to purchase ?",
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
        message: "How many quantity would you like to order ?",
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
                if (answer.selectQuant > res[0].stock_quantity) {
                    console.log("==========================================");
                    console.log("Available quantity is lesser than requested quantity!");
                    console.log("==========================================");
                    nextTransaction();
                }
                else {
                    totalCost = res[0].price * answer.selectQuant;
                    console.log("==========================================");
                    console.log("Thank you for your purchase");
                    console.log("Your Total Cost is $ " + totalCost);
                    console.log("==========================================");

                    con.query("UPDATE products SET ? WHERE ?", [
                        {
                            stock_quantity: res[0].stock_quantity - answer.selectQuant
                        }, {
                            Item_id: answer.selectProd
                        }], function (err, res) { });
                    nextTransaction();
                }
            })
    }, function (err, res) { })
};

// ASK USER IF THEY WANT TO MAKE ANOTHER TRANSACTION

function nextTransaction() {
    inquirer.prompt([{
        type: "confirm",
        name: "another",
        message: "Would you like to purchase another item ?"
    }]).then(function (answer) {
        if (answer.another) {
            showInventory()
        }
        else {
            console.log("==========================================");
            console.log("Thank you for shopping! Please come again!");
            console.log("==========================================");
            con.end();
        }
    })
};

showInventory();











