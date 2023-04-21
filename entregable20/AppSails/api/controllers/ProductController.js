/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    list:function(req,res){
        Product.find({}).exec(function(err, product){
            if(err){
                res.send(500,{error:'Database error'})
            }
            res.render('pages/productos',{listProducts: product, listExist: true})
        })
    },
    add:function(req,res){
        const data = req.body
        Product.create({title:data.title, price: data.price, url: data.url}).exec(function(err, product){
            if(err){
                res.send(500,{error:'Database error'})
            }
            res.redirect('/')
        })
    }
}

