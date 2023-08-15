
const db = require("../config/db.cofig")
const {isEmptyOrNull} = require("../config/service")

const getAll = (req,res) => {
    db.query("SELECT * FROM payment_method",(error,rows)=>{
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
    db.query("SELECT * FROM payment_method WHERE payment_method_id = ?",[id],(error,rows)=>{
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
    
    var {name, code, sort_order} = req.body
    var message = {} 
    if(isEmptyOrNull(name)){
        message.name = "Please fill in payment method name!"
    }
    if(isEmptyOrNull(code)){
        message.code = "Please fill in payment method code!"
    }
    var sql = "INSERT INTO `payment_method` (`name`, `code`, `sort_order`) VALUES (?,?,?)"
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
    var {name, code, status , sort_order, payment_method_id} = req.body
    var message = {} 
    if(isEmptyOrNull(payment_method_id)){
        message.payment_method_id = "Please fill in payment method id!"
    }
    if(isEmptyOrNull(name)){
        message.name = "Please fill in payment method name!"
    }
    if(isEmptyOrNull(code)){
        message.code = "Please fill in payment method code!"
    }
    var sql = "UPDATE `payment_method` SET `name`=?, `code`=?, `status`=?, `sort_order`=? WHERE payment_method_id = ? "
    var sqlParam = [name, code, status , sort_order, payment_method_id]
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
    db.query("DELETE FROM payment_method WHERE payment_method_id = ?",[id],(error,rows)=>{
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