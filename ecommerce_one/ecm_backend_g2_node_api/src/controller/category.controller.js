
const db = require("../config/db.cofig")

const getAll = (req,res) => {
    var text_search = req.query?.text_search
    console.log(req.query)
    var sql = "SELECT * FROM category" 
    if(text_search != null){
        sql += " WHERE name LIKE '%"+text_search+"%' "
    }
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
    db.query("SELECT * FROM category WHERE category_id = ?",[id],(error,rows)=>{
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
    
    var {name,description} = req.body

    var image = null 
    if(req.file){
        image = req.file.filename
    }

    if(name == null || name == ""){
        res.json({
            error : true,
            message : "Please fill in category name!"
        })
        return 
    }

    var sql = "INSERT INTO `category` (`name`, `description`, `image`) VALUES (?,?,?)"
    var sqlParam = [name,description,image]
    db.query(sql,sqlParam,(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                message: "Category create success!"
            })
        }
    })
    
}

const update = (req,res) => {
    var {category_id,name,description} = req.body
    if(name == null || name == ""){
        res.json({
            error : true,
            message : "Please fill in category name!"
        })
        return 
    }else if(category_id == null || category_id == ""){
        res.json({
            error : true,
            message : "Parameter category id required!"
        })
    }

    var image = null 
    if(req.file){
        image = req.file.filename
    }

    var sql = "UPDATE category set name = ?, description = ?, image=IFNULL(?,image) WHERE category_id = ?"
    var sqlParam = [name,description,image,category_id]
    db.query(sql,sqlParam,(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                message: "Category update success!"
            })
        }
    })
}
const remove = (req,res) => {
    var {id} = req.params
    db.query("DELETE FROM category WHERE category_id = ?",[id],(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                message: "Delete category completed!"
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