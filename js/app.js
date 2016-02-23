$(function(){

function Menu(meals){
	this.meals = meals;
};

 Menu.prototype.show = function(){
 	var template = Handlebars.compile($('#meal-template').html());
    $('#menu').append(template(menu.meals));
 };

Menu.prototype.addTable = function(){
	$('.addTable').on('click', function(){
		$('#dinnerHall').append('<ul class="table"></ul>');
	});
}

Menu.prototype.order = function(){
	$('.meal').on('click', function(){
		var newOrder = $(this).clone();
		$('.table').last().append(newOrder);
	});
};

var taxRate = 0.1;
var tipRate = 0.15;
Menu.prototype.billCalc = function(){
	var itemPrice = parseInt(menu.meals[0].price);
	var subTotal=0;
	var tax=0;
	var tips=0;
	var total=0;
	$('.meal').on('click', function(){
		subTotal += itemPrice;
		tax = subTotal*taxRate;
		tips = subTotal*tipRate;
		total = Math.round((subTotal + tax + tips)*100)/100;
		$('.table').last().append("Subtotal: $"+subTotal+"</br>Tax: $"+tax+"</br>Tips(15%): $"+tips+"</br>Total: $" + total);
	});
};

function Meal(data){
	this.meal = data.meal;
	this.price = data.price;
};

var meal1 = new Meal({
	meal: 'Pulled Pork',
	price: '15$'
});

var meal2 = new Meal({
	meal: 'Smoked Bacon',
	price: '17$'
});

var meal3 = new Meal({
	meal: 'Roasted Chicken',
	price: '12$'
});
var meal4 = new Meal({
	meal: 'Grilled Turkey',
	price: '20$'
});

var meal5 = new Meal({
	meal: 'Prime Rib',
	price: '18$'
});

var meal6 = new Meal({
	meal: 'Steak with honey sauce',
	price: '25$'
});

var meal7 = new Meal({
	meal: 'Grilled Shrimp',
	price: '35$'
});

var meal8 = new Meal({
	meal: 'Baked Salmon with Butter',
	price: '40$'
});

var meal9 = new Meal({
	meal: 'Grilled Rock Lobster',
	price: '50$'
});

var menu = new Menu([meal1, meal2, meal3, meal4, meal5, meal6, meal7, meal8, meal9]);

menu.show();
menu.order();
menu.addTable();
menu.billCalc();
});