const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.json()) //add allow body paremeter
app.use(cors({ origin : "*"}))

app.get("/",(req,res)=>{ // localhost:8080/
    res.send("Hello welcome Node ")
})

require("./src/route/customer.route")(app)
require("./src/route/category.route")(app)
require("./src/route/product.route")(app)
require("./src/route/address.route")(app)
require("./src/route/cart.route")(app)
require("./src/route/order.route")(app)
require("./src/route/payment_method.route")(app)
require("./src/route/order_status.route")(app)


// require("./src/route/user.route")(app)
// require("./src/route/product.route")(app)

app.listen(8080,()=>{
    console.log("http://localhost:8080/")
})