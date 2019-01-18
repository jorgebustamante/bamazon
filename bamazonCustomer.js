var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connection successful!")
    makeTable();
  });

  // Make Table

var makeTable = function(){
connection.query("SELECT * FROM products", function(err, res){
    console.log("*Bamazon Marketplace");
    console.log("---------------------");       
    for (var i = 0; i < res.length; i++){
        // console.log(res[i].item_id+" || "+res[i].product_name+" || "+res[i].department_name+" || "+res[i].price+" || "+res[i].stock_quantity+"\n");
        console.log(`${res[i].item_id} || ${res[i].product_name} || ${res[i].department_name} || ${res[i].stock_quantity} || [${res[i].price}] \n`);
    }
    console.log("---------------------");
    promptSale(res);
    });
};

  // Prompt user to select a product and enter desired quantity

var promptSale = function(res){
    inquirer.prompt([{
        type: "input",
        name: "choice",
        message: "What would you like to purchase? [Quit with Q]"
    }]).then(function(answer){
        var correct = false;
        if(answer.choice.toUpperCase()=="Q"){
            process.exit();
        }
        for (var i = 0; i < res.length; i++){
            if(res[i].product_name==answer.choice){
                correct = true;
                var product = answer.choice;
                var id = i;
                inquirer.prompt({
                    type: "input",
                    name: "quant",
                    message: "How many would you like to buy?",
                    validate: function(value){
                        if(isNaN(value)==false){
                            return true;
                        } else {
                            return false;
                        }
                    }
                }).then(function(answer){
                    if((res[id].stock_quantity-answer.quant)>-1){
                        connection.query("UPDATE products SET stock_quantity= '" +(res[id].stock_quantity-answer.quant)+ "' WHERE product_name= '" + product + "'", function(err, res2){
                            console.log("Product Bought!");
                            makeTable();
                        })
                    } else {
                        console.log("Not a valid selection!");
                        promptSale(res);
                    }
                })
            }
        }
        if (i==res.length && correct==false){
            console.log("Not a valid selection");
        }
    })
}