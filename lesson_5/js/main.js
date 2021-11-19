const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        filtered: [],
        imgCatalog: 'https://via.placeholder.com/200х150',
        userSearch: '',
        show: false
    },
    methods: {
        getJson(url){ 
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        filter(){
            const regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test)
        },
        addProduct(product){
            console.log(product.id_product);
        }
    },
    mounted(){
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
            this.getJson(`getProducts.json`)
                .then(data => {
                    for(let el of data) {
                        this.products.push(el);
                        this.filtered.push(el);
                    }
                });
    }
})