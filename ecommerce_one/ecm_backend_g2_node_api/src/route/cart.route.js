const contrl = require("../controller/cart.controller")
const cart = (app) => {
    app.get("/api/cart/get-all",contrl.getAll)
    app.get("/api/cart/get-one/:id",contrl.getOne)
    app.get("/api/cart/get-cart-by-customer/:customer_id",contrl.getCartByCustomer)
    app.post("/api/cart/create",contrl.create)
    app.put("/api/cart/update",contrl.update)
    app.delete("/api/cart/remove/:id",contrl.remove)
}

module.exports = cart