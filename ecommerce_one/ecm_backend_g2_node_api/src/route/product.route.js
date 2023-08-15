const contrl = require("../controller/product.controller")
const {upload} = require("../config/service")
const product = (app) => {
    app.get("/api/product/get-all",contrl.getAll)
    app.get("/api/product/get-one/:id",contrl.getOne)
    app.post("/api/product/create",upload.single("image"),contrl.create)
    app.put("/api/product/update",upload.single("image"),contrl.update)
    app.delete("/api/product/remove/:id",contrl.remove)
}

module.exports = product