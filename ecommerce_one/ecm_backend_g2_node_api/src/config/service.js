const multer = require("multer")

const image_path = "C:/xampp/htdocs/project/image_ecm_g2" // image_path for stor

const isEmptyOrNull = (value) => {
    if(value == null || value == ""){
        return true
    }
    return false
}

const upload = multer({
    storage : multer.diskStorage({
        destination : function(req,file,callback){
            callback(null,image_path)
        }
    }),
    limits : {
        fileSize : 1024 * 1024 * 3 // 3MB
    }
})


const isEmail = (value) => {

}

module.exports = {
    isEmptyOrNull,
    isEmail,
    upload
}