
//Recieves an two-dimentional array and displays the items on the product page
function displayItems(array) {

	for (let i = 0; i < array.length; i++) {
		// Adding jump tags that are stored in an empty array, except for second element that stores the id name
		if (array[i][0] === '') {
			let items = document.getElementsByClassName('item');
			//Adding the id to the last current displayed item
			items[items.length - 1].setAttribute('id', array[i][1]);
		} else {
			// Create an item box with pictures etc.
			itemToHtml(array[i], i);
		}
	}

}

//Gets the dictionary from the local Storage and displays the items in a table
function displayItemsInCart() {

	let keys = Object.keys(localStorage);
	let totalPrice = 0;

	for (let i = 0; i < keys.length; i++) {
		let array = localStorage.getItem(keys[i]).split(',');
		let row = document.createElement("tr");
		row.setAttribute('id', keys[i]);

		row.innerHTML =
			//The number of the row should start with "1"
			"           <td>" + (i + 1) + "</td>\n" +
			"           <td><a href='item.html' onclick=\"loadItem('" + array + "', '" + keys[i] + "')\">" +
			"                    <img class='item_img' src='coursework/assignment_1_resources/" + array[4] + "' alt='" + array[0] + "'>" +
			"                 </a>" +
			"           </td>" +
			"           <td>" + array[0] + "</td>" +
			//The "slice" will leave only the price
			"           <td>" + array[3].slice(5) + "</td>" +
			"<div class=\"items_quantity_button\" >" +
			"   <button onclick=\"addQuantity('" + i + "', '" + array[3].slice(7) + "')\">+</button> " +
			"       <div id=\"item_quantity" + i + "\" >1</div>" +
			"   <button onclick=\"decreaseQuantity('" + i + "', '" + keys[i] + "', '" + array[3].slice(7) + "')\">-</button>" +
			"</div>";

		document.getElementById("table_body").appendChild(row);


		totalPrice += parseFloat(array[3].slice(7));

	}

	document.getElementById('purchase_price').innerHTML += totalPrice;

}

//Recieves a one-dimentional array, and the ID of the item in localStorage
function itemToHtml(array, itemID) {

	let buttonText = "Add to cart";
	//Adds the checkmark if the item has been added to the cart
	if (localStorage.getItem("itemID" + itemID) !== null) {
		buttonText = "✔";
	}

	let item = document.createElement("div");
	item.className = "item";

	item.innerHTML =
		"                 <a href='item.html' onclick=\"loadItem('" + array + "', '" + itemID + "')\">" +
		"                    <img class='item_img' src='coursework/assignment_1_resources/" + array[4] + "' alt='" + array[0] + "'>" +
		"                 </a>" +
		"                 <div class='item_details'>" +
		"                     <h1 class='item_name'>" + array[0] + " - " + array[1] + "</h1>" +
		"                     <span class='item_description'>" + array[2] + "</span>" +
		"                     <span class='item_price'>" + array[3] + "</span>" +
		"                     <button class='item_buy_button' id='itemID" + itemID + "' onclick=\"addToCart('" + array + "','itemID" + itemID + "')\">" + buttonText + "</button>" +
		"                </div>";

	document.getElementById("products").appendChild(item);

}

//Recieves a one-dimentional string array to be stored locally
function addToCart(array, itemID) {
	let button = document.getElementById(itemID);
	if (localStorage.getItem(itemID) === null) {
		alert("The item was added to the cart");
		localStorage.setItem(itemID, array);
		button.textContent = "✔";

	//Happens when checkmark is clicked again
	} else {
		alert("The item is removed from the cart!");
		localStorage.removeItem(itemID);
		button.textContent = "Add to cart";
	}
}

//Recieves a one-dimentional string array to be stored temporarily
function loadItem(array, itemID) {
	sessionStorage.setItem("item", array);
	sessionStorage.setItem('ID', itemID);
}


//Clears localStorage 
function clearCart() {
	if (localStorage.length > 0) {
		let clear = confirm("Are you sure you want to clear the cart?");
		if (clear) {
			localStorage.clear();
		}
	} else {
		alert("The cart is already empty!");
	}


}

//Recieves the row's position and the item's price
function addQuantity(rowID, price) {
	let increaseButton = document.getElementById("item_quantity" + rowID);
	//Increases the counter, i.e. number of items
	increaseButton.innerText = (parseInt(increaseButton.innerText) + 1).toString();
	changePrice(price, 1);
}

////Recieves the row's position, the item's price, and items ID (in case it is needed to be deleted)
function decreaseQuantity(rowID, itemID, price) {
	let increaseButton = document.getElementById("item_quantity" + rowID);
	if (increaseButton.innerText === "1") {
		let deleteItemQuestion = confirm("Are you sure you want to delete this item from the cart?");
		if (deleteItemQuestion) {
			localStorage.removeItem(itemID);
			document.getElementById(itemID).innerHTML = "";
			changePrice(price, -1);
		}

	} else {
		increaseButton.innerText = (parseInt(increaseButton.innerText) - 1).toString();
		changePrice(price, -1);
	}
}

//Recieves a price change and !the "directon" - if negative one the price decreases, if positive one - increases
function changePrice(price, changePriceDirecton) {

	//The price and the price on the page should be parsed to perform sumation
	let purchasePrice = parseFloat(document.getElementById('purchase_price').innerHTML);
	purchasePrice += parseFloat(price) * changePriceDirecton;

	//The final price is fixed at two decimal places.
	document.getElementById('purchase_price').innerHTML = purchasePrice.toFixed(2);
}