var _ = require('underscore');
function Menu(meals){
	this.meals = meals;
};
function Meal(data){
	this.meal = data.meal;
	this.price = data.price;
};
function Table(menu){
	this.meals = [];
	this.menu = menu;
}

Table.prototype.order = function(mealName){
	var order = _.find(this.menu.meals, function(meal){
		return meal.meal == mealName;
	});
	if(order != undefined){
		this.meals.push(order);
	}
};

Table.prototype.bill = function(){
	var subTotal = 0;
	var taxRate = 0.1;
	var tipRate = 0.15;
	_.each(this.meals, function(meal){
		subTotal += meal.price;
	});
	var tax = subTotal * taxRate;
	var tips = subTotal * tipRate;
	var total = subTotal + tax + tips;
	console.log('Subtotal:' + subTotal);
	console.log('Tips(15%):' + tips);
	console.log('Tax(10%):' + tax);
	console.log('Total:' + total);
};

var meal1 = new Meal({
	meal: 'Smoked Bacon',
	price: 17
});

var meal2 = new Meal({
	meal: 'Pulled Pork',
	price: 15
});

var meal3 = new Meal({
	meal: 'Roasted Chicken',
	price: 12
});

var menu1 = new Menu([meal1,meal2,meal3]);

var table1 = new Table(menu1);

table1.order('Smoked Bacon');
table1.order('Pulled Pork');
table1.order('Pop Corn');
console.log(table1.meals);
table1.bill();
