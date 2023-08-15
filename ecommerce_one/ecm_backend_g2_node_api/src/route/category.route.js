
const contrl = require("../controller/category.controller")
const {upload} = require("../config/service")

const category = (app) => {
    app.get("/api/category/get-all",contrl.getAll)
    app.get("/api/category/get-one/:id",contrl.getOne)
    app.post("/api/category/create",upload.single("image_upload"),contrl.create)
    app.put("/api/category/update",upload.single("image_upload"),contrl.update)
    app.delete("/api/category/remove/:id",contrl.remove)
}

module.exports = category