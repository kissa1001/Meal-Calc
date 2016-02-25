#!/usr/bin/env node

var _ = require('underscore');
var program = require('commander');

function Menu(meals){
	this.meals = meals;
};

Menu.prototype.show = function(){
	_.each(this.meals, function(meal){
		console.log(meal.display());
	});
};

function Meal(data){
	this.meal = data.meal;
	this.price = data.price;
};

Meal.prototype.display = function(){
	return this.meal +' - $'+ this.price;
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
	else{
		console.log(mealName + ' does not exist in our menu!');
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
var table2 = new Table(menu1);


function list(val){
	return val.split(',');
};

program
	.option('--menu', 'Print the menu meals')
	.option('--order <meals>','takes comma-separated meal orders', list)
	.parse(process.argv);

if(program.menu){
	menu1.show();
}
else{
	table = new Table(menu1);
	_.each(program.order, function(meal){
		table.order(meal);
	});
	table.bill();
}