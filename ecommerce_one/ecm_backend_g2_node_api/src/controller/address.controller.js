
const db = require("../config/db.cofig")
const {isEmptyOrNull} = require("../config/service")

const getAll = (req,res) => {
    db.query("SELECT * FROM address",(error,rows)=>{
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
    db.query("SELECT * FROM address WHERE address_id = ?",[id],(error,rows)=>{
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
    // customer_id 
    // province_id
    // firstname
    // lastname
    // tel
    // email
    // address_description

    var {customer_id,province_id,firstname,lastname,tel,email,address_description} = req.body
    var message = {}
    if(isEmptyOrNull(customer_id)){
        message.customer_id = "customer_id required!"
    }
    if(isEmptyOrNull(province_id)){
        message.province_id = "please select province!"
    }
    if(isEmptyOrNull(firstname)){
        message.firstname = "please fill in firstname!"
    }
    if(isEmptyOrNull(lastname)){
        message.lastname = "please fill in lastname!"
    }
    if(isEmptyOrNull(tel)){
        message.tel = "please fill in tel!"
    }

    if(Object.keys(message).length > 0 ){
        res.json({
            error : true,
            message:message
        })
        return 
    }

    var sql = "INSERT INTO `address` (customer_id,province_id,firstname,lastname,tel,email,address_description) VALUES (?,?,?,?,?,?,?)"
    var sqlParam = [customer_id,province_id,firstname,lastname,tel,email,address_description]
    db.query(sql,sqlParam,(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                message: "Address create success!"
            })
        }
    })
    
}

const update = (req,res) => {
    var {customer_id,province_id,firstname,lastname,tel,email,address_description,address_id} = req.body
    var message = {}
    if(isEmptyOrNull(address_id)){
        message.address_id = "address_id required!"
    }
    if(isEmptyOrNull(customer_id)){
        message.customer_id = "customer_id required!"
    }
    if(isEmptyOrNull(province_id)){
        message.province_id = "please select province!"
    }
    if(isEmptyOrNull(firstname)){
        message.firstname = "please fill in firstname!"
    }
    if(isEmptyOrNull(lastname)){
        message.lastname = "please fill in lastname!"
    }
    if(isEmptyOrNull(tel)){
        message.tel = "please fill in tel!"
    }

    if(Object.keys(message).length > 0 ){
        res.json({
            error : true,
            message:message
        })
        return 
    }

    var sql = "UPDATE `address` SET customer_id=?, province_id=?, firstname=?, lastname=?, tel=?, email=?, address_description=? WHERE address_id = ?"
    var sqlParam = [customer_id,province_id,firstname,lastname,tel,email,address_description,address_id]
    db.query(sql,sqlParam,(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                message: "Address update success!"
            })
        }
    })
}
const remove = (req,res) => {
    var {id} = req.params
    db.query("DELETE FROM address WHERE address_id = ?",[id],(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                message: "Delete address completed!"
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