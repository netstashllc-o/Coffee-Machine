'use strict';
const input = require('sync-input');

const CoffeeMachine = class {
    maxWater = 1000;
    maxMilk = 800;
    maxBeans = 1000;
    maxCups = 40;

    constructor(money, water, milk, beans, cups) {
        this.money = money;
        this.water = water;
        this.milk = milk;
        this.beans = beans;
        this.cups = cups;
    };

    buy(product) {
        this.money += product.cost;
        this.water -= product.water;
        this.milk -= product.milk;
        this.beans -= product.beans;
        this.cups--;
    }

    fill() {
        this.water += Number(input('Write how many ml of water you want to add:\n'));
        if (this.water > this.maxWater) {
            console.log(`That's too much water! The water is now ${this.maxWater} ml.`);
            this.water = this.maxWater;
        }

        this.milk += Number(input('Write how many ml of milk you want to add:\n'));
        if (this.milk > this.maxMilk) {
            console.log(`That's too much milk! The milk is now ${this.maxMilk} ml.`);
            this.milk = this.maxMilk;
        }

        this.beans += Number(input('Write how many grams of coffee beans you want to add:\n'));
        if (this.beans > this.maxBeans) {
            console.log(`That's too much coffee beans! The coffee beans is now ${this.maxBeans} g.`);
            this.beans = this.maxBeans;
        }

        this.cups += Number(input('Write how many disposable cups you want to add:\n'));
        if (this.cups > this.maxCups) {
            console.log(`That's too many cups! There are now ${this.maxCups} cups.`);
            this.cups = this.maxCups;
        }
    }

    take() {
        console.log(`I gave you $${this.money}`);
        this.money = 0;
    }

    verifyAndBuy(product) {
        let needed = [];

        if (this.water < product.water) {
            needed.push("water");
        }

        if (this.milk < product.milk) {
            needed.push("milk");
        }

        if (this.beans < product.beans) {
            needed.push("coffee beans");
        }

        if (this.cups < product.cups) {
            needed.push("cups");
        }

        if (needed.length > 0) {
            let message = `Sorry! There's not enough of the following: ${needed}`;
            message += "\nPlease ask an attendant to re-stock the machine.\n";
            return message;
        }

        this.buy(product);
        return "I have enough resources, making you a coffee!\n";
    }

    status() {
        return `\nThe coffee machine has:
${this.water} ml of water
${this.milk} ml of milk
${this.beans} g of coffee beans
${this.cups} disposable cups
$${this.money} of money
`;
    }
};

const CoffeeProduct = class {
    constructor(water, milk, beans, cost) {
        this.water = water;
        this.milk = milk;
        this.beans = beans;
        this.cost = cost;
    }
};

const machine = new CoffeeMachine(550, 400, 540, 120, 9);
const espresso = new CoffeeProduct(250, 0, 16, 4);
const latte = new CoffeeProduct(350, 75, 20, 7);
const cappuccino = new CoffeeProduct(200, 100, 12, 6);
const products = [null, espresso, latte, cappuccino];
let keepGoing = true;

console.log("Welcome to netStash Coffee Company!\n");

do {
    let action = input("Write action (buy, fill, take, remaining, exit):\n");

    switch (action) {
        case "buy":
            let option = input('What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino:\n');
            option = Number(option);
            let product = products[option];
            if (product === undefined) {
                console.log("Unknown product!");
                break;
            }
            console.log(machine.verifyAndBuy(product));
            break;
        case "fill":
            machine.fill();
            break;
        case "take":
            machine.take();
            break;
        case "remaining":
            console.log(machine.status());
            break;
        case "exit":
            keepGoing = false;
            break;
        default:
            console.log("Unknown action!");
            break;
    }
} while (keepGoing);

console.log("\nThank you for your business, and enjoy your coffee!");
