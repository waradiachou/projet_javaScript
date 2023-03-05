let add_to_cart_btns = document.getElementsByClassName('btn-primary')
let main_container = document.getElementsByTagName('tbody')[0]
let quantity_fields = document.getElementsByClassName('num')
let removeBtns = document.getElementsByClassName('uk-button-danger')


console.log("nombre de boutons :" + add_to_cart_btns.length);

for (let i = 0; i < add_to_cart_btns.length; i++) {
    add_to_cart_btns[i].addEventListener('click', addToCart)
}

function addToCart(event) {

    console.log("appel de la fonction");
 
    let btn = event.target
    let btn_parent = btn.parentElement
    let btn_grandparent = btn.parentElement.parentElement 
    let itemName = btn_parent.children[0].innerText
    let itemPrice = btn_parent.children[1].innerText
    let itemImage = btn_grandparent.children[0].src

    let itemContainer = document.createElement('tr')
    itemContainer.innerHTML = `<td><input class="uk-checkbox" type="checkbox"></td>
    <td><img class="uk-preserve-width uk-border-circle" src="${itemImage}" width="40" alt=""></td> 
    <td class="uk-table-link">
        <h3 class = "item-name">${itemName}</h3>
    </td>
    <td class="uk-text-truncate item-price"><h3>${itemPrice}</h3></td>
    <td><input type = 'number' class = 'num' value = '1'></td>
    <td class="uk-text-truncate total-price"><h3>${itemPrice}</h3></td>
    <td><button class="uk-button uk-button-danger" type="button">Remove</button></td>`

    main_container.append(itemContainer)

    for (let i = 0; i < quantity_fields.length; i++) {
        quantity_fields[i].addEventListener('click', updateTotal)
    }


    for (let i = 0; i < removeBtns.length; i++) {
        removeBtns[i].addEventListener('click', removeItem)
    }

    grandTotal()
     
}

function updateTotal(event){
    number_of_items = event.target
    number_of_items_parent = number_of_items.parentElement.parentElement 
    price_field = number_of_items_parent.getElementsByClassName('item-price')[0]
    total_field = number_of_items_parent.getElementsByClassName('total-price')[0]
    price_field_content = price_field.children[0].innerText.replace('$', '')
    total_field.children[0].innerText = '$' + number_of_items.value * price_field_content

    if(isNaN(number_of_items.value) || number_of_items.value <= 0){
        number_of_items.value = 1
    }
    grandTotal()

}

function grandTotal(){
    let total = 0
    let grand_total = document.getElementsByClassName('grand-total')[0]
    let total_price = document.getElementsByClassName('total-price') 
    for (let i = 0; i < total_price.length; i++) {
        total_price_content = Number(total_price[i].innerText.replace('$', ''))
        total += total_price_content
    }
    grand_total.children[0].innerText = '$' + total
    grand_total.children[0].style.fontWeight = ' bold'
    console.log(total)
}
function removeItem(event){
    remove_btn = event.target
    remove_btn_grandparent = remove_btn.parentElement.parentElement
    remove_btn_grandparent.remove()
    grandTotal() 
}
    
