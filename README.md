# Bamazon

### Check out Video Demonstration:
[![LIRI BOT!](https://i.ytimg.com/vi/c5iHZu0XYFg/2.jpg?time=1541924751269)](https://youtu.be/c5iHZu0XYFg)

## Project Brief

A CLI Application name Bamazon, where user can purchase see inventory items and purchase based on item id and quantity. Another user as manager can check inventory, add quantity or add new product. 

### Instruction to Run This App in CLI

* You will need to run the command `npm install` in order to install all dependent Node Packages needed for this app to run
* Next, create a file named `.env`, add the following to it, replacing the values with your API keys (no quotes) once you have them:

    ```js
    # Database Authentication

    DATABASE_USERNAME=root
    DATABASE_PASSWORD=password

    ```
* The app is now ready for you to use with below instructions. 

### MVP:

#### Customer View (Minimum Requirement)

1. The app prompts users with two messages.

   * The first asks them the ID of the product they would like to buy.
   * The second message asks how many units of the product they would like to buy.

2. Once the customer has placed the order, the application checks if store has enough of the product to meet the customer's request.

   * If not, the app logs a phrase like `Insufficient quantity!`, and then prevent the order from going through.

3. However, if store _does_ have enough of the product, the app fulfills the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, it shows the customer the total cost of their purchase.


#### Manager View (Next Level)

1. List a set of menu options:

   * View Products for Sale

   * View Low Inventory

   * Add to Inventory

   * Add New Product

2. If a manager selects `View Products for Sale`, the app lists every available item: the item IDs, names, prices, and quantities.

3. If a manager selects `View Low Inventory`, then it lists all items with an inventory count lower than five.

4. If a manager selects `Add to Inventory`, your app displays a prompt that will let the manager "add more" of any item currently in the store.

5. If a manager selects `Add New Product`, it allows the manager to add a completely new product to the store.

## Technologies Used: 
  
  * [DotEnv](https://www.npmjs.com/package/dotenv)
  * [mysql](https://www.npmjs.com/package/mysql)
  * [inquirer](https://www.npmjs.com/package/inquirer)
