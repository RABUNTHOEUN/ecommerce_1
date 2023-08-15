
const customerContoller = require("../controller/customer.controller")
const customer = (app) => { // arrow function
    app.post("/api/customer/create",customerContoller.create)
    app.get("/api/customer/get-list",customerContoller.getList)
    app.get("/api/customer/get-one/:id",customerContoller.getOne)
    app.put("/api/customer/update",customerContoller.update)
    app.delete("/api/customer/remove/:id",customerContoller.remove)
    app.post("/api/customer/login",customerContoller.login)
}
module.exports = customer
