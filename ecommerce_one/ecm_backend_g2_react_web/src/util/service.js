import dayjs from "dayjs"

export const image_path = "http://localhost:81/project/image_ecm_g2/"

var lang = {
    1:{ // EN
        "title_category" : "Category",
        "btn_save" : "Save",

        home : "Home",
        category : "Category",
        // ...
    },
    2:{ // KH
        "title_category" : "ប្រភេទ",
        "btn_save" : "រក្សាទុក",

        home : "ទំព័រដើម1",
        category : "ប្រភេទ1",
        // ...
    },
    
}
export const getText = (keyworkd,default_text) => {
    const lang_id = localStorage.getItem("langId") || 1
    return lang[lang_id][keyworkd] ? lang[lang_id][keyworkd] : default_text
}

export const dateForClient = (date) => {
   if(date != null){
    return dayjs(date).format("DD/MM/YYYY")
   }
   return null
}

export const dateForServer = (date) => {
    if(date != null){
     return dayjs(date).format("YYYY-MM-DD")
    }
    return null
 }