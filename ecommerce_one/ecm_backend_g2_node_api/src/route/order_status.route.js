const contrl = require("../controller/orderStatus.controller")
const orderStatus = (app) => {
    app.get("/api/order_status/get-all",contrl.getAll)
    app.get("/api/order_status/get-one/:id",contrl.getOne)
    app.post("/api/order_status/create",contrl.create)
    app.put("/api/order_status/update",contrl.update)
    app.delete("/api/order_status/remove/:id",contrl.remove)
}

module.exports = orderStatus