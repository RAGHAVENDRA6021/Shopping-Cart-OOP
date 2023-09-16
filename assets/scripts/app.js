class Product {
    // title = 'DEFAULT';
    // imageUrl;
    // description;
    // price;

    constructor(title, image, desc, price) {
        this.title = title;
        this.imageUrl = image;
        this.description = desc;
        this.price = price;
    }
}

class ProductItem {
    constructor(product) {
        this.product = product;
    }

    addToCart() {
        console.log('Adding product ...')
        console.log(this.product)
        App.addToCart(this.product)
    }

    render() {
        const prodEl = document.createElement('li');
        prodEl.className = 'product-item';
        prodEl.innerHTML = `
        <div>
          <img src="${this.product.imageUrl}" alt="${this.product.title}" >
          <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>\$${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `;
        const addCartButton = prodEl.querySelector('button')
        addCartButton.addEventListener('click', this.addToCart.bind(this))
        return prodEl;
    }
}

class ProductList {
    products = [
        new Product(
            'A Pillow',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1bu3XEkiRsNoaFIiLenqhJVKH0hknw5Ux_A&usqp=CAU',
            'A soft pillow!',
            19.99
        ),
        new Product(
            'A Carpet',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ardabil_Carpet.jpg/397px-Ardabil_Carpet.jpg',
            'A carpet which you might like - or not.',
            89.99
        )
    ];



    render() {
        const prodList = document.createElement('ul');
        prodList.className = 'product-list';
        for (const prod of this.products) {
            const product = new ProductItem(prod);
            const prodEl = product.render();
            prodList.append(prodEl);

        }
        return prodList
    }

}

class ShoppingCart {
    items = [];
    set cartItems(values) {
        this.items = values
        this.totalOutput.innerHTML = `<h2>Total : \$${this.totalAmount.toFixed(2)}</h2>`
    }

    addProduct(product) {
        this.cartItems = [...this.items, product]
    }

    get totalAmount() {
        const sum = this.items.reduce((prevPrice, item) => prevPrice + item.price, 0)
        return sum
    }

    render() {
        const cartEl = document.createElement('section');
        cartEl.innerHTML = `<h2>Total : \$${0}</h2>
      <button>Order Now!</button>`;
        cartEl.className = 'cart'
        this.totalOutput = cartEl.querySelector('h2')
        return cartEl
    }
}

class Shop {
    render() {
        const renderHook = document.getElementById('app')
        this.cart = new ShoppingCart();
        const cartEle = this.cart.render();
        const productList = new ProductList();
        const prodListEle = productList.render();
        renderHook.append(cartEle);
        renderHook.append(prodListEle)
    }
}



class App {
    static init() {
        const shop = new Shop();
        shop.render();
        this.cart = shop.cart;
    }

    static addToCart(product) {
        this.cart.addProduct(product)
    }
}

App.init();