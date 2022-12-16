
function display_items(array){

    for (let i = 0; i < array.length; i++){
        // Adding jump tags that are stored in an empty array, except for second element that stores the id name
        if (array[i][0] === '') {
            let item = document.createElement("div");
            item.setAttribute("id", array[i][1]);
            document.getElementById("products").appendChild(item);
        }else {
            // Create an item box with pictures etc.
            item_to_html(array[i], i);
        }
    }
}

function add_items_to_cart(js_obj, i){
    let counter = 0;
    for (let key in (js_obj)){
        //A localSession object has unneeded keys which are filtered out
        if (js_obj.hasOwnProperty(key)){
            counter++;

            let array = js_obj[key].split(',');
            let row  = document.createElement("tr");

            row.innerHTML =
                "           <td>" + counter + "</td>\n" +
                "           <td><a href='item.html' onclick=\"load_item('" + array + "', '" + i + "')\">" +
                "                    <img class='item_img' src='coursework/assignment_1_resources/" + array[4] + "' alt='" + array[0] + "'>" +
                "                 </a></td>\n" +
                "           <td>" + array[0] + "</td>\n" +
                //The "slice" will leave only the price
                "           <td>" + array[3].slice(5) + "</td>" +
                "<div class=\"items_quantity_button\" > <button onclick=\"change_quantity('" + counter + "', '" + i + "', '" + 1 + "')\">+</button> <div id=\"item_quantity" + counter + "\" >1</div><button onclick=\"change_quantity('" + counter + "', '" + i + "', '" + -1 + "')\">-</button></div>";

            document.getElementById("table_body").appendChild(row);

        }
    }
}

function item_to_html(array, itemID){
    let button_text = "Add to cart";
    if ( localStorage.getItem("itemID" + itemID) !== null){
        button_text = "✔";
    }


    let item = document.createElement("div");
    item.className = "item";

    item.innerHTML =
    "                 <a href='item.html' onclick=\"load_item('" + array + "', '" + itemID + "')\">" +
    "                    <img class='item_img' src='coursework/assignment_1_resources/" + array[4] + "' alt='" + array[0] + "'>" +
    "                 </a>" +
    "                 <div class='item_details'>" +
    "                     <h1 class='item_name'>" + array[0] + " - " + array[1] + "</h1>" +
    "                     <span class='item_description'>" + array[2] + "</span>" +
    "                     <span class='item_price'>" + array[3] + "</span>" +
    "                     <button class='item_buy_button' id='itemID" + itemID + "' onclick=\"add_to_cart('" + array + "','itemID" + itemID + "')\">" + button_text + "</button>" +
    "                </div>";

    document.getElementById("products").appendChild(item);

}

function add_to_cart(array, itemID){
    let button = document.getElementById(itemID);
    if (localStorage.getItem(itemID) === null){
        alert("The item was added to the cart");
        localStorage.setItem(itemID, array);
        button.textContent = "✔";

    } else {
        alert("The item is removed from the cart!")
        localStorage.removeItem(itemID);
        button.textContent = "Add to cart";
    }
}

function load_item(array, itemID){
    sessionStorage.setItem("item", array);
    sessionStorage.setItem('ID', itemID);
}



function clear_cart(){
    let clear = false;

    if (localStorage.length > 0){
        clear = confirm("Are you sure you want to clear the cart?");
    } else {
        alert("The cart is already empty!")
    }

    if (clear){
        localStorage.clear()
    }
}

function change_quantity(row_ID, itemID, n){
    let increase_button = document.getElementById("item_quantity" + row_ID);
    if (parseInt(increase_button.innerText) > 1){
        increase_button.innerText = (parseInt(increase_button.innerText) + parseInt(n)).toString();
    } else {
        let delete_item = confirm("Are you sure you want to delete this item from the cart?")
        if (delete_item){
            console.log("itemID" + itemID)
            localStorage.removeItem("itemID" + itemID);
        }
    }


}

