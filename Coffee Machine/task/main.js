'use strict';
const input = require('sync-input');

const CoffeeMachine = class {
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
        this.milk += Number(input('Write how many ml of milk you want to add:\n'));
        this.beans += Number(input('Write how many grams of coffee beans you want to add:\n'));
        this.cups += Number(input('Write how many disposable cups you want to add:\n'));
    }

    take() {
        console.log(`I gave you $${this.money}`);
        this.money = 0;
    }

    verifyAndBuy(product) {
        let message = "Sorry, not enough ";
        if (this.water < product.water) {
            return message + "water!";
        }

        if (this.milk < product.milk) {
            return message + "milk!";
        }

        if (this.beans < product.beans) {
            return message + "coffee beans!";
        }

        if (this.cups < product.cups) {
            return message + "cups!";
        }

        this.buy(product);
        return "I have enough resources, making you a coffee!";
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
