const input = require('sync-input')
const ingredients = new Map(
    [
        ['water', {amount: 200, unit: 'ml'}],
        ['milk', {amount: 50, unit: 'ml'}],
        ['coffee beans', {amount: 15, unit: 'g'}]
    ]
);

let totals = "";
let cups = Number(input("Write how many cups of coffee you will need:\n"));

for (let item of Array.from(ingredients.keys())) {
    let details = ingredients.get(item);
    let totalAmount = cups * details.amount;
    totals = totals.concat(`\n${totalAmount} ${details.unit} of ${item}`);
}

console.log(`For ${cups} cups of coffee you will need:${totals}`);
