const axios = require("axios")



async function getProducto(){
    try{
        const result =await axios.get('/producto/1')
        return result
    }
    catch(error){
        return error
    }
}

async function postProducto(){
    try{
        const result = await axios.post ('/agregar',
         {
             title:'compaz',
             price: 200.00,
             url:"https://cdn3.iconfinder.com/data/icons/education-209/64/microscope-lab-science-school-512.png"
         })
         return result
    }catch(error){
        return error
    
    }
}

Promise.all([getProducto(),postProducto()])
.then (function(response){
    const  result1 = response[0];
    const  result2 = response[1];
    console.log(result1,result2)
});