const contrl = require("../controller/order.controller")
const order = (app) => {
    app.get("/api/order/get-all",contrl.getAll)
    app.get("/api/order/get-one/:id",contrl.getOne)
    app.get("/api/order/get-order-by-customer",contrl.getOrderByCustomer)
    app.post("/api/order/create",contrl.create)
    app.put("/api/order/update",contrl.update)
    app.delete("/api/order/remove/:id",contrl.remove)
}

module.exports = order