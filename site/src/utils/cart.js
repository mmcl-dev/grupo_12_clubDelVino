module.exports = function Cart(oldCart) {
    // oldCart al inicio de la sesión está vacío.
    
    // un storedItem es un objeto
    //
    // { item : { product },
    //   qty  :XX,
    //   price: YY,
    //   category_name : 'Blend'
    // }


    // El carrito sería
    // 
    // { Items : { storedItem, storedItem, ..},
    //   totalQty : XX,
    //   totalPrice : YY,
    // }


    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = parseFloat(oldCart.totalPrice) || 0;
    
    // Método para sumar un item al carrito
    this.add = function (item, id, category_name) {
        // item es el producto a incluir
        // id es el id_product

        let storedItem = this.items[id];
        // console.log('Voy a agregar', item);

        if (!storedItem) {
            // Si ese producto no existe todavía en mi carrito, lo agrego
            storedItem = this.items[id] = {item: item, qty:0, price: 0, category_name: category_name};
        }

        storedItem.qty++;

        if (storedItem.item.offer) {
            storedItem.item.price = parseFloat(storedItem.item.offer_price);
        };

        storedItem.price = parseFloat(storedItem.item.price) * parseInt(storedItem.qty);
        this.totalQty++;
        this.totalPrice += parseFloat(storedItem.item.price);
                
        
    };

    // Método para borrar un item al carrito
    this.deleteOne = function (id) {
        
        // Reduzco la cantidad total del carrito en 1 y le resto el valor de ese item
        this.totalQty--;
        this.totalPrice = this.totalPrice - this.items[id].item.price;

        // Si habia un sólo item de ese producto, lo borro totalmente
        // sino, a ese producto le resto un item y reduzco el precio del item
        if (this.items[id].qty == 1) {
            delete this.items[id];
        } else {
            this.items[id].qty--;
            this.items[id].price-=this.items[id].item.price
        };

    }

    // Método para remover todos los items del carrito
    this.removefromCart = function (id) {
        
        this.totalQty = this.totalQty - this.items[id].qty;
        this.totalPrice = this.totalPrice - this.items[id].price;
        delete this.items[id];

    }

    // Método para generar un array con los productos del carrito
    this.generateArray = function() {
        // Este array nos sirve para mostrar el carrito
        let arrayCart = [];
        for (let id in this.items) {
            arrayCart.push(this.items[id]);
        }
        // console.log('EL ARRAY ES : ',arrayCart);
        
        return arrayCart;
    }
}
