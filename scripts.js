
function add_items(array){

    for (let i = 0; i < array.length; i++){
        //Adding jump tags that are stored in an empty array, except for second element that stores the id name
        if (array[i][0] === '') {
            let item = document.createElement("div");
            item.setAttribute("id", array[i][1]);
            document.getElementById("products").appendChild(item);
        }else {
            //Create an item box with pictures etc.
            item_to_html(array[i], i);
        }
    }
}

function add_js_objects(js_obj){
    let counter = 0;
    for (let key in (js_obj)){
        //A localSession object has unneeded keys which are filtered out
        if (js_obj.hasOwnProperty(key)){
            counter++;

            let array = js_obj[key].split(',');
            let row  = document.createElement("tr");

            row.innerHTML =
                "           <th>" + counter + "</th>\n" +
                "           <th><a href='item.html' onclick=\"load_item('" + array + "')\">" +
                "                    <img class='item_img' src='coursework/assignment%201%20resources/" + array[4] + "' alt='" + array[0] + "'>" +
                "                 </a></th>\n" +
                "           <th>" + array[0] + "</th>\n" +
                "           <th>" + array[3] + "</th>";

            document.getElementById("sm").appendChild(row);

        }
    }

}

function item_to_html(array, i){


    let item = document.createElement("div");
    item.className = "item";

    item.innerHTML =
    "                 <a href='item.html' onclick=\"load_item('" + array + "')\">" +
    "                    <img class='item_img' src='coursework/assignment%201%20resources/" + array[4] + "' alt='" + array[0] + "'>" +
    "                 </a>" +
    "                 <div class='item_details'>" +
    "                     <h1 class='item_name'>" + array[0] + " - " + array[1] + "</h1>" +
    "                     <span class='item_description'>" + array[2] + "</span>" +
    "                     <span class='item_price'>" + array[3] + "</span>" +
    "                     <button class='item_buy_button' id='itemID" + i + "' onclick=\"add_to_cart('itemID" + i + "','" + array + "')\">Add to cart</button>" +
    "                </div>";

    document.getElementById("products").appendChild(item);

}

function add_to_cart(itemID, array){
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

function load_item(array){
    sessionStorage.setItem("item", array);
}




