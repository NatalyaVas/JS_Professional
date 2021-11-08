class Cart {
    constructor() {
        this.getAllProducts(); //Суммировать все продукты в корзине.
        this.getSumCart(); //Суммировать цены в корзине.
    }
}

class CartItem {
    constructor() {
        
    }
}


class ProductList { //2.При создании объекта вызывается конструктор
    constructor(container='.products') { //Конструктор имеет параметры по умолчанию. В div c селектором products нужно вставить верстку.
        this.container = container; //3. Создаем глобальные переменные в нашем классе.
        this.goods = []; //Пока пустой массив товаров
        this._fetchProducts(); //4.Вызываем в текущем классе(нижнее подчеркивание) метод fetch.
        this.render(); //5.Вызываем метод вывода товаров на страницу.
        this.getSum(); //Вызываем метод расчета суммы
    }

    _fetchProducts() { //4.Вызов метода
        this.goods = [ //Обращаемся к нашему массиву goods, наполняем его товарами.
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }

    getSum() {
        return this.goods.reduce((sum, { price }) => sum + price, 0);
    }

    render() { //5. Вызываем метод
        const block = document.querySelector(this.container); //Ищем элемент верстки, у кот. селектор this.container. Это наш .products. Записали в переменную block.
        for(let product of this.goods) { //Обходим каждый товар нашего массива goods.
            const item = new ProductItem(product); //6.Создаем для каждого товара верстку, для этого создаем новый объект. В конструктор класса ProductItem передаем объект с товаром product.
            block.insertAdjacentHTML('beforeend', item.render()); //8. Наполняем наш товар версткой. Перед окончанием нашего блока мы вставим то, что вернет метод render.

        }//
    }
}

class ProductItem {
    constructor(product, img='img/prod_1.png') { // 7. Конструктор принимает объект товар и у всех товаров общая картинка. Наполняем наш товар свойствами. Извлекаем title, id...
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img; //Картинку берем из параметра по умолчания конструктора.
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


let list = new ProductList(); //1.С помощью new оздаем объект класса ProductList


// const products = [
//     { id: 1, title: 'Notebook', price: 2000, img: 'img/prod_1.png' },
//     { id: 2, title: 'Mouse', price: 20, img: 'img/prod_1.png' },
//     { id: 3, title: 'Keyboard', price: 200, img: 'img/prod_1.png' },
//     { id: 4, title: 'Gamepad', price: 50, img: 'img/prod_1.png' },
// ];
// const renderProduct = (param) => {
//     return `<div class="product-item">
//                 <h3>${param.title}</h3>
//                 <img src = ${param.img}>
//                 <p>${param.price}</p>
//                 <button class="buy-btn">Купить</button>
//             </div>`
// }; //4.Принимаем название товара, стоимость и возвращаем верстку товара.
// const renderPage = list => {
//     const productsList = list.map(item => renderProduct(item)); //2.В теле функции мы применили метод map, который возвращает массив. К каждому элементу массива мы применяем функцию renderProduct. В эту функцию мы передаем название товара и стоимость товара.
//     console.log(productsList);
//     document.querySelector('.products').innerHTML = productsList.join(' '); //3. Метод join преобразовал элементы массива,который вернул метод map, в строки. Таким образом, убрали запятую.
// };

// renderPage(products); //1.Запускаем функцию, в которую передаем массив products. List - массив объектов.