const input = require('sync-input');
const ingredients = new Map(
    [
        ['water', {amount: 200, unit: 'ml'}],
        ['milk', {amount: 50, unit: 'ml'}],
        ['coffee beans', {amount: 15, unit: 'g'}]
    ]
);

let waterAdded = Number(input("Write how many ml of water the coffee machine has:\n"));
let milkAdded = Number(input("Write how many ml of milk the coffee machine has:\n"));
let beansAdded = Number(input("Write how many grams of coffee beans the coffee machine has:\n"));
let cupsNeeded = Number(input("Write how many cups of coffee you will need:\n"));

let cupsPossible = Math.min(
    Math.floor(waterAdded / ingredients.get('water').amount),
    Math.floor(milkAdded / ingredients.get('milk').amount),
    Math.floor(beansAdded / ingredients.get('coffee beans').amount)
);

if (cupsNeeded <= cupsPossible) {
    let result = "Yes, I can make that amount of coffee";
    let additionalCups = cupsPossible - cupsNeeded;
    if (additionalCups > 0) {
        result += ` (and even ${additionalCups} more than that)`;
    }
    console.log(result);
} else {
    console.log(`No, I can make only ${cupsPossible} cups of coffee`);
}
