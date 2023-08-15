
const db = require("../config/db.cofig")
const {isEmptyOrNull} = require("../config/service")

const getAll = (req,res) => {
    db.query("SELECT * FROM order_status",(error,rows)=>{
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
    db.query("SELECT * FROM order_status WHERE order_status_id = ?",[id],(error,rows)=>{
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
    
    var {name, code} = req.body
    var message = {} 
    if(isEmptyOrNull(name)){
        message.name = "Please fill in order status name!"
    }
    if(isEmptyOrNull(code)){
        message.code = "Please fill in order status code!"
    }
    var sql = "INSERT INTO `order_status` (`name`, `code`) VALUES (?,?)"
    var sqlParam = [name, code, sort_order]
    db.query(sql,sqlParam,(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                message: "Create success!"
            })
        }
    })
}

const update = (req,res) => {
    var {name, code, status , order_status_id} = req.body
    var message = {} 
    if(isEmptyOrNull(order_status_id)){
        message.order_status_id = "Please fill in payment method id!"
    }
    if(isEmptyOrNull(name)){
        message.name = "Please fill in payment method name!"
    }
    if(isEmptyOrNull(code)){
        message.code = "Please fill in payment method code!"
    }
    var sql = "UPDATE `order_status` SET `name`=?, `code`=?, `status`=? WHERE order_status_id = ? "
    var sqlParam = [name, code, status , order_status_id]
    db.query(sql,sqlParam,(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                message: "Update success!"
            })
        }
    })
}
const remove = (req,res) => {
    var {id} = req.params
    db.query("DELETE FROM order_status WHERE order_status_id = ?",[id],(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                message: "Delete  completed!"
            })
        }
    })
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}