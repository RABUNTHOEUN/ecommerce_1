
const db = require("../config/db.cofig")
const {isEmptyOrNull} = require("../config/service")

const getAll = (req,res) => {
    var sql = "SELECT * FROM order"
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
const getOrderByCustomer = (req,res) => {
    var sql = "SELECT cart.cart_id, cart.quanity, product.name, product.price "+
    " FROM cart "+
    " INNER JOIN product ON cart.product_id = product.product_id" +
    " WHERE cart.customer_id = ?"
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
const getOne = (req,res) => {
    var {id} = req.params
    db.query("SELECT * FROM order WHERE order_id = ?",[id],(error,rows)=>{
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
    
    var {
        customer_id ,
        address_id,
        comment,
        payment_method_id,
        payment_method_name,
        payment_date,
    } = req.body
    var message = {}

    if( isEmptyOrNull(customer_id)){
        message.customer_id = "customer_id required!"
    }

    if( isEmptyOrNull(payment_method_id)){
        message.payment_method_id = "payment_method_id required!"
    }
    if( isEmptyOrNull(payment_method_name)){
        message.payment_method_name = "payment_method_name required!"
    }

    if(Object.keys(message).length > 0){
        res.json({
            error:true,
            message:message
        })
        return
    }

    // address info(firstname,lastname....) by address_id
        var sql = " SELECT a.*,p.name as province_name "+
        " FROM address a "+
        " INNER JOIN province p ON a.province_id = p.province_id"
        " WHERE a.address_id = ? ";
        var param = [address_id]
        db.query(sql,param,(e1,r1)=>{//get address info
            if(!e1){
                if(r1.length > 0){
                    var address = r1[0];
                    sql = " SELECT c.*, p.name as product_name, p.price, (c.quantity * p.price) as total"+
                    " FROM cart c" +
                    " INNER JOIN product p ON c.product_id = p.product_id" +
                    " WHERE c.customer_id = ?"
                    param = [customer_id]
                    db.query(sql,param,(e2,r2)=>{ // get cart by customer // array item that customer has add to bag
                        if(!e2){
                            if(r2.length > 0){
                                var product_order = r2 // 
                                var total_order = 0;
                                var total_item = 0;
                                product_order.map((item,index)=>{
                                    total_order += item.total
                                    total_item += item.quantity
                                })
                                var sqlOrder = "INSERT INTO `order` "+
                                " (customer_id, address_id, firstname, lastname, email, tel, province_id, province_name, address, total_item, total_order, comment, payment_method_id, payment_method_name, payment_date, order_status_id, order_status_name)"+
                                " VALUE"+
                                " (?,?,?,?, ?,?,?,?, ?,?,?,?, ?,?,?,?,?)";
                                var order_status_id = 1,order_status_name = "Pending" // defuat statu order
                                var sqlOrderParam = [customer_id,address_id,address.firstname, address.lastname, address.email, address.tel, address.province_id, address.province_name, address.address_description, total_item , total_order, comment, payment_method_id, payment_method_name,payment_date,order_status_id,order_status_name]
                                db.query(sqlOrder,sqlOrderParam,(e3,r3)=>{ // add data to table order
                                    if(!e3){
                                        // added to order success
                                        // added item to order_product
                                        var order_id = r3.insertId // get id ofter insert
                                        var is_error = 0
                                        product_order.map((item,index)=>{ // back up product from cart by customer to order_product
                                            var sqlProductOrder = "INSERT INTO order_product (order_id,product_id,product_name,price,quantity) VALUE (?,?,?,?,?) "
                                            var sqlProductOrderParam = [order_id, item.product_id, item.product_name, item.price, item.quantity]
                                            
                                            db.query(sqlProductOrder,sqlProductOrderParam,(e4,r4)=>{
                                                if(!e4){
                                                    // re stock 
                                                    var sqlReStock = "UPDATE product SET quantity = (quantity-?) WHERE product_id = ?"
                                                    var sqlReStockParam = [item.quantity,item.product_id]
                                                    db.query(sqlReStock,sqlReStockParam,(e5,r5)=>{})
                                                }else{
                                                    is_error = 1
                                                }
                                            })
                                        })

                                        if(is_error == 0){
                                            // remove cart
                                            var removeCart = "DELETE FROM cart WHERE customer_id = ?"
                                            db.query(removeCart,[customer_id],(e5,r5)=>{})
                                            res.json({
                                                message:"Your order success!"
                                            })
                                        }else{
                                            res.json({
                                                error:true,
                                                message:"Something wrong!"
                                            })
                                        }

                                    }else{
                                        res.json({
                                            error:true,
                                            message : e3
                                        })
                                    }
                                })
                            }else{
                                res.json({
                                    error : true,
                                    message : "Please add item to cart before checkout!"
                                })
                            }
                        }else{
                            res.json({
                                error:true,
                                message:e2
                            })
                        }
                    })
                }else{
                    res.json({
                        error:true,
                        message:"Address not found!"
                    })
                }
            }else{
                res.json({
                    error : true,
                    message : e1
                })
            }
        })
    
}

const createTMP = (req,res) => {
    // customer_id FK 

    // firstname
    // lastname 
    // tel 
    // email 
    // address
    // comment

    // total_order 

    // payment_method 
    // order_status
    
    var {customer_id, firstname, lastname, tel, email, address, comment, total_order, payment_method, order_status} = req.body
    var message = {}
    if(isEmptyOrNull(customer_id)){
        message.customer_id = "customer_id required!"
    }
    if(isEmptyOrNull(firstname)){
        message.firstname = "firstname required!"
    }
    if(isEmptyOrNull(lastname)){
        message.lastname = "lastname required!"
    }
    if(isEmptyOrNull(tel)){
        message.tel = "tel required!"
    }
    if(isEmptyOrNull(address)){
        message.address = "address required!"
    }
    if(isEmptyOrNull(total_order)){
        message.total_order = "total_order required!"
    }
    if(isEmptyOrNull(payment_method)){
        message.payment_method = "payment_method required!"
    }
    if(isEmptyOrNull(order_status)){
        message.order_status = "order_status required!"
    }
    if(Object.keys(message).length > 0 ){
        res.json({
            error : true,
            message : message
        })
        return
    }
    var sql = "INSERT INTO `order` (customer_id, firstname, lastname, tel, email, address, comment, total_order, payment_method, order_status) VALUES (?,?,?,?,?,?,?,?,?,?)"
    var sqlParam = [customer_id, firstname, lastname, tel, email, address, comment, total_order, payment_method, order_status]
    db.query(sql,sqlParam,(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            // order_id, name,  price, qauntity, total

            
            // select cart by customer_id => to insert table order_product
            var sql  = "SELECT  p.name, p.price, c.quantity, (p.price * c.quantity) as total "+
            " FROM cart c" +
            " INNER JOIN product p ON c.poduct_id = p.product_id"
            " WHERE c.customer_id = ? ";

            db.query(sql,[customer_id],(error1,rows1)=>{
                if(!error1){
                    var data = []
                    data = rows1

                    var sqlOrderProduct = "INSERT INTO order_product (order_id, name,  price, qauntity, total ) VALUES (?,?,?,?,?)"
                    data.map((item,index)=>{
                        var paramsSql = [rows.insertId, item.name, item.price, item.quantity, item.total]
                        db.query(sqlOrderProduct,paramsSql,(error2,rows2)=>{
                            if(!error2){
                                res.json({
                                    message:"You have order successfully!"
                                })
                            }else{
                                res.json({
                                    error:true,
                                    message:error2
                                })
                            }
                        })
                    })
                    
                }
            })

            res.json({
                message: "Thank you. You have complete order!"
            })
        }
    })
    
}
const update = (req,res) => {
    var {order_id, order_status} = req.body
    var message = {}
    if(isEmptyOrNull(order_id)){
        message.order_id = "order_id required!"
    }
    if(isEmptyOrNull(order_status)){
        message.order_status = "order_status required!"
    }
    
    if(Object.keys(message).length > 0 ){
        res.json({
            error : true,
            message : message
        })
        return
    }
    var sql = "UPDATE `order` SET order_status=? WHERE order_id = ?"
    var sqlParam = [order_status, order_id]
    db.query(sql,sqlParam,(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                message: "Change status order success!"
            })
        }
    })
}
const remove = (req,res) => {
    var {id} = req.params
    db.query("DELETE FROM order WHERE order_id = ?",[id],(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                message: "Delete order success!"
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
    getOrderByCustomer
}