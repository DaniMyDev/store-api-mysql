class Product {
    constructor(name, category, price, url) {
        this.id = buildId(5);
        this.name = name;
        this.category = category;
        this.price = price;
        this.url = url;
    }
}

function buildId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return 'P' + result;
}

module.exports = Product;