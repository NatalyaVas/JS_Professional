const products = [
    { id: 1, title: 'Notebook', price: 2000, img: 'img/prod_1.png' },
    { id: 2, title: 'Mouse', price: 20, img: 'img/prod_1.png' },
    { id: 3, title: 'Keyboard', price: 200, img: 'img/prod_1.png' },
    { id: 4, title: 'Gamepad', price: 50, img: 'img/prod_1.png' },
];
const renderProduct = (param) => {
    return `<div class="product-item">
                <h3>${param.title}</h3>
                <img src = ${param.img}>
                <p>${param.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
}; //4.Принимаем название товара, стоимость и возвращаем верстку товара.
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item)); //2.В теле функции мы применили метод map, который возвращает массив. К каждому элементу массива мы применяем функцию renderProduct. В эту функцию мы передаем название товара и стоимость товара.
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList.join(' '); //3. Метод join преобразовал элементы массива,который вернул метод map, в строки. Таким образом, убрали запятую.
};

renderPage(products); //1.Запускаем функцию, в которую передаем массив products. List - массив объектов.