class Component {
    constructor(renderHookId) {
        console.log('component', renderHookId)
        this.hookId = renderHookId
    }
    createRootElement(tag, cssClass, attributes) {
        const rootElement = document.createElement(tag)
        rootElement.className = cssClass;
        if (attributes && attributes.length) {
            for (let attr in attributes) {
                rootElement.setAttribute(attr.name, attr.value)
            }
        }
        document.getElementById(this.hookId).append(rootElement)
        return rootElement;
    }
}
class ElementAttribute {
    constructor(attrName, attrValue) {
        this.name = attrName;
        this.value = attrValue;
    }
}

class Product {
    title;
    img;
    description;
    price;
    constructor(title, img, des, price) {
        this.title = title;
        this.img = img;
        this.description = des;
        this.price = price
    }
}

class ProductItem {
    constructor(product) {
        this.product = product;
    }
    addToCart() {
        console.log('adding to cart ..  ', this, this.product)
        App.productItemToCart(this.product)
    }
    render() {
        const productElement = document.createElement('li')
        productElement.className = 'product-item'
        productElement.innerHTML = `<div>
            <img src="${this.product.img}" alt="${this.product.title}"/>
            <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>\$${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>Add to Cart</button>
            </div>
            </div>`
        const addCartButton = productElement.querySelector('button')
        addCartButton.addEventListener('click', this.addToCart.bind(this))
        return productElement;
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
        const productList = document.createElement('ul')
        productList.className = 'product-list';
        for (const product of this.products) {
            const productElement = new ProductItem(product)
            productList.append(productElement.render());
        }
        return productList;
    }

}

class Cart extends Component {
    items = [];
    constructor(renderHookId) {
        super(renderHookId);
    }

    addProduct(product) {
        this.cartItems = [...this.items, product]
    }

    set cartItems(value) {
        this.items = value
        this.cartTotal.innerHTML = `<h2>Total:\$${this.totalAmount.toFixed(2)}</h2>`
    }

    get totalAmount() {
        const sum = this.items.reduce((prev, item) => prev + item.price, 0)
        return sum;
    }

    render() {
        const cartElement = this.createRootElement('section', 'cart', null)
        cartElement.innerHTML = `
        <h2>Total:\$${this.totalAmount}</h2>
        <button>order now</button>`;
        this.cartTotal = cartElement.querySelector('h2')
        return cartElement;
    }

}

class Shop {
    render() {
        const renderHookId = document.getElementById('app')
        this.cart = new Cart('app');
        this.cart.render();
        const productListElement = new ProductList().render();
        renderHookId.append(productListElement)
    }
}

class App {
    static init() {
        const shop = new Shop();
        shop.render();
        this.cart = shop.cart;
    }

    static productItemToCart(product) {
        this.cart.addProduct(product)
    }
}

App.init()