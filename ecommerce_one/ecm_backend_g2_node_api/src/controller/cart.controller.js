
const db = require("../config/db.cofig")
const {isEmptyOrNull} = require("../config/service")

const getAll = (req,res) => {
    var sql = "SELECT * FROM cart"
    db.query(sql,(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                list: rows
            })
        }
    })
}

const getCartByCustomer = (req,res) => {
    var {customer_id} = req.params
    if(isEmptyOrNull(customer_id)){
        res.json({
            error:true,
            message : "Param customer_id required!"
        })
    }
    var sql = "SELECT cart.product_id, cart.customer_id, cart.cart_id, cart.quantity, product.name, product.price, product.image "+
    " FROM cart "+
    " INNER JOIN product ON cart.product_id = product.product_id" +
    " WHERE cart.customer_id = ?"
    db.query(sql,[customer_id],(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                list: rows
            })
        }
    })
}

const getOne = (req,res) => {
    var {id} = req.params
    db.query("SELECT * FROM cart WHERE cart_id = ?",[id],(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                list: rows
            })
        }
    })
}
const create = (req,res) => {
    // customer_id FK 
    // product_id FK 
    // quantity
    var {customer_id, product_id, quantity} = req.body
    var message = {}
    if(isEmptyOrNull(customer_id)){
        message.customer_id = "customer_id required!"
    }
    if(isEmptyOrNull(product_id)){
        message.product_id = "product_id required!"
    }
    if(isEmptyOrNull(quantity)){
        message.quantity = "quantity required!"
    }
    if(Object.keys(message).length > 0 ){
        res.json({
            error : true,
            message : message
        })
        return
    }
    var sql = "INSERT INTO `cart` (customer_id, product_id, quantity) VALUES (?,?,?)"
    var sqlParam = [customer_id, product_id, quantity]
    db.query(sql,sqlParam,(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                message: "Cart add success!"
            })
        }
    })
    
}

const update = (req,res) => {
    var {customer_id, product_id, quantity, cart_id} = req.body
    var message = {}
    if(isEmptyOrNull(cart_id)){
        message.cart_id = "cart_id required!"
    }
    if(isEmptyOrNull(customer_id)){
        message.customer_id = "customer_id required!"
    }
    if(isEmptyOrNull(product_id)){
        message.product_id = "product_id required!"
    }
    if(isEmptyOrNull(quantity)){
        message.quantity = "quantity required!"
    }
    if(Object.keys(message).length > 0 ){
        res.json({
            error : true,
            message : message
        })
        return
    }
    var sql = "UPDATE `cart` SET customer_id=?, product_id=?, quantity=? WHERE cart_id = ?"
    var sqlParam = [customer_id, product_id, quantity, cart_id]
    db.query(sql,sqlParam,(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                message: "Cart update success!"
            })
        }
    })
}
const remove = (req,res) => {
    var {id} = req.params
    db.query("DELETE FROM cart WHERE cart_id = ?",[id],(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                message: "Delete cart success!"
            })
        }
    })
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
    getCartByCustomer
}