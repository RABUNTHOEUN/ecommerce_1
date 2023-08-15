const contrl = require("../controller/payment_method.controller")
const paymentMethod = (app) => {
    app.get("/api/payment-method/get-all",contrl.getAll)
    app.get("/api/payment-method/get-one/:id",contrl.getOne)
    app.post("/api/payment-method/create",contrl.create)
    app.put("/api/payment-method/update",contrl.update)
    app.delete("/api/payment-method/remove/:id",contrl.remove)
}

module.exports = paymentMethod