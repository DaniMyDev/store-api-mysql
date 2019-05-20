class Order {
    constructor(productId, username, quantity){
        this.id = buildId(5);
        this.username = username;
        this.product_id = productId;
        this.quantity = quantity;
    }
}

function buildId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return 'O' + result;
}

module.exports = Order;