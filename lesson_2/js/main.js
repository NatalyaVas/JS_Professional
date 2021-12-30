const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductList {
    constructor(container='.products') {
        this.container = container; 
        this.goods = [];//массив товаров из JSON-документа
        this._getProducts() //После получения массива запускается then.
            .then(data => { //data - объект js из массивов.
                this.goods = data; // Записываем массив в goods.
                // console.log(data);
                this.render() //Запускаем render, который выведет наш массив на страничку
            });
        // this.getSum();
    }

    _getProducts(){ //_ - это нестрогая инкапсуляция.

        return fetch(`${API}/catalogData.json`) //путь до файла, из которого парсим данные. Часть пути сохранили в const. Получаем промис.
            .then(result => result.json()) //C помощью метода json мы получаем объект JS и вернем  промис. При успешном коннекте мы получаем массив объектов. 
            .catch(error => { //Если коннект не прошел, то сообщим об ошибке
                console.log(error);
            })
    }

    getSum() {
        let res = this.goods.reduce((sum, item) => sum + item.price, 0);
    }

    render() { 
        const block = document.querySelector(this.container); 
        for(let product of this.goods) { 
            const item = new ProductItem(product); 
            block.insertAdjacentHTML('beforeend', item.render());
        }
    }
}

class ProductItem {
    constructor(product, img='img/prod_1.png') { 
        this.title = product.product_name;
        this.id = product.id_product;
        this.price = product.price;
        this.img = img;
    }
    render() {
        return `<div class="product-item">
                 <h3>${this.title}</h3>
                 <img src = ${this.img}>
                 <p>${this.price}</p>
                 <button class="buy-btn">Купить</button>
             </div>`
    };
}


let list = new ProductList();

// class Cart {
//     addGoods() {
        
//     }
//     removeGoods(){

//     }
//     changeGoods(){

//     }
//     render(){ //вывести список всех товаров

//     }
// }

// class CartItem {
//     render() { //вывести список одного товара
        
//     }
// }

class Cart {
    constructor(container='.cart-block') {
        this.container = container; 
        this.goods = [];
        this._showCart();
        this._getCartBlock() 
            .then(data => { 
                this.goods = data.contents; 
                this.render();
            });
    }

    _getCartBlock(){ 
        return fetch(`${API}/getBasket.json`) 
            .then(result => result.json()) 
            .catch(error => { 
                console.log(error);
            })
    }

    render() { 
        const block = document.querySelector(this.container); 
        for(let product of this.goods) { 
            const item = new CartItem(); 
            block.insertAdjacentHTML('beforeend', item.render(product));
        }
    }

    _showCart() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('hidden');//toggle - если класс был, то он будет удален, а если не было, то добавлен.
        });
    }
}
class CartItem {
    render(product, img='img/prod_1.png') {
        return `<div class="cart-item">
                 <img class="cart-img" src = ${img}>
                 <div class="cart-text">
                    <h3 class="product-title">${product.product_name}</h3>
                    <p class="cart-price">${product.price}</p>
                    <p class="product-quantity">Количество:${product.quantity}</p>
                </div>
             </div>`
    };
}

new Cart();
