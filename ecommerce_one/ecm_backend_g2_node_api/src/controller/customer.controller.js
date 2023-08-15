
const db = require("../config/db.cofig")
const bcript = require("bcrypt")

const create = (req,res) => {
    var body = req.body;
    var password = bcript.hashSync(body.password,10)
    var sqlInsert = "INSERT INTO customer (firstname,lastname,gender,username,password) VALUES (?,?,?,?,?)"
    var paramInsert = [body.firstname, body.lastname, body.gender, body.username, password]
    db.query(sqlInsert,paramInsert,(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                message : "Customer insert success!",
                data : rows
            })
        }
    })
}

const getList = (req,res) => {
    // db.query("sql statements",()=>{})
    db.query("SELECT * FROM customer;",(error,rows)=>{
        if(error){ //mean has some eorre
            res.json({
                error : true,
                message : error
            })
        }else{ // work well , rows data from table 
            res.json({
                list : rows,
            })
        }
    })
}

const getOne = (req,res) => {
    var customer_id = req.params.id
    var sql = "SELECT * FROM customer WHERE customer_id = ?"
    var sqlParams = [customer_id]
    db.query(sql,sqlParams,(error,rows)=>{
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

const update = (req,res) => {
   var body = req.body
   var sql = "UPDATE customer SET firstname=? , lastname=?, gender=?, password=? WHERE customer_id = ?"
   var sqlParams = [body.firstname, body.lastname, body.gender, body.password, body.customer_id]
   db.query(sql,sqlParams,(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                message : "Customer update success!",
                data : rows
            })
        }
   })
}

const remove = (req,res) => {
    var customer_id = req.params.id
    var sql = "DELETE FROM customer WHERE customer_id = ?"
    var sqlParams = [customer_id]
    db.query(sql,sqlParams,(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                message: "Customer delete success!",
                data : rows
            })
        }
    })
}

const login = (req,res) => {
    var {password,username} = req.body
    var messsage = {}
    if(password == null || password == ""){
        messsage.password = "Please fill in password!"
    }
    if(username == null || username == "" ){
        messsage.username = "Please fill in username!"
    }
    if(Object.keys(messsage).length > 0){
        res.json({
            error : true,
            messsage : messsage
        })
        return 
    }
    //username //has or not
    //password
    db.query("SELECT * FROM customer WHERE username = ?",[username],(error,rows)=>{
        if(!error){
            if(rows.length == 0){ // mean than username does not exist
                res.json({
                    error : true,
                    messsage : {
                        username : "Username does not exist!"
                    }
                })
            }else{ // username is avaliable in table
                var customer = rows[0]
                var passwordDb = customer.password
                var isCorrectPassword = bcript.compareSync(password,passwordDb) // true / false
                if(isCorrectPassword){
                    delete customer.password
                    res.json({
                        messsage : "Login success!",
                        profile:customer
                    })
                }else{
                    res.json({
                        error:true,
                        messsage:{
                            password : "Password incorrect!"
                        }
                    })
                }
            }
        }
    })


}

module.exports = {
    create,
    getList,
    getOne,
    update,
    remove,
    login
}