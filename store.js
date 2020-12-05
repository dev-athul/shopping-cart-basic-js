if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready();
}

function ready(){

    var addToCartbuttons=document.getElementsByClassName('shop-item-button');
    for(var i=0;i<addToCartbuttons.length;i++){
        addToCartbuttons[i].addEventListener('click',addToCartClicked);
    }

    var purchaseButton=document.getElementsByClassName('btn-purchase')[0];
    purchaseButton.addEventListener('click',purchaseButtonClicked);
}

function purchaseButtonClicked(){
    
   
    var cartItems=document.getElementsByClassName('cart-items')[0];
    if(cartItems.hasChildNodes()){
        alert('Thank You for your purchase, Your order placed');
    }
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild);
    }
    updateTotal();
}

function addToCartClicked(event){
    var shopItem=event.target.parentElement.parentElement;
    var title=shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price=shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imageSource=shopItem.getElementsByClassName('shop-item-image')[0].src;
    addItemToCart(title,price,imageSource);
    updateTotal();
}

function addItemToCart(title,price,imageSource){
    var cartRow=document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems=document.getElementsByClassName('cart-items')[0];
    var cartItemNames=cartItems.getElementsByClassName('cart-item-title');

    for(var i=0; i<cartItemNames.length;i++){
        if(title==cartItemNames[i].innerText){
            alert(`You have already buy ${title}`);
            return
        }
    }

    var cartRowContents=`
    <div class="cart-item cart-column">
          <img src="${imageSource}" alt="" class="cart-item-image" width="100" height="100"/>
          <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input type="number" value="1" class="cart-quantity-input">
            <button class="btn-danger btn" type="button">REMOVE</button>
        </div>
    `
    cartRow.innerHTML=cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged);
}

function removeCartItem(event){
    var cartItemElement=event.target.parentElement.parentElement;
    cartItemElement.remove();
    updateTotal(); 
}

function quantityChanged(event){
    var input=event.target;
    if(isNaN(input.value)||input.value<=0){
        input.value=1;       
    }
    updateTotal();
}

function updateTotal(){
   

    var cartItemContainer=document.getElementsByClassName('cart-items')[0]; 
    var cartRows=cartItemContainer.getElementsByClassName('cart-row');  

        
    var total=0;  

    for(var i=0;i<cartRows.length;i++){
        var priceElement=cartRows[i].getElementsByClassName('cart-price')[0];
        var price=parseFloat(priceElement.innerText.replace('$',''));
        var quantityElement=cartRows[i].getElementsByClassName('cart-quantity-input')[0];
        var quantity=quantityElement.value;
       
       total=total+(price*quantity);
       console.log(price,quantityElement, quantityElement.value,total);
    }
    total=Math.round(total*100)/100;
    document.getElementsByClassName('cart-total-price')[0].innerText='$ '+total; 
}
