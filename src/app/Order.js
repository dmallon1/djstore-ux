export class Order {
    constructor(email, first_name, last_name, address1, address2, city, state, zip_code, card_token, captcha_token, total, cart_product_instances) {
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.state = state;
        this.zip_code = zip_code;
        this.card_token = card_token;
        this.captcha_token = captcha_token;
        this.total = total;
        this.cart_product_instances = cart_product_instances;
    }
};
