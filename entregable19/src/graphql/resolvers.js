const { get } = require('mongoose');
const Producto = require('../../database/mongoDB/models/productos-model')

const resolvers = {
    Query:{

        getAllProducts: async () =>{
            const productos = await Producto.find()
            return productos
        },
        async getProduct(_,{id}){
            const product = await Producto.findById(id)
            return product
        }
    },
    Mutation:{
        createProduct: async (_,{producto}) =>{
            const {title, price, url} = producto
            const newProduct = new Producto({title,price,url})
            await newProduct.save()
            return newProduct
        },
        async deleteProduct(_,{id}){
            await Producto.findByIdAndDelete(id)
            return 'producto eliminado'
        },
        async updateProduct(_, { id, producto }) {
            const { title, price,url } = producto;
            const newProduct = await Producto.findByIdAndUpdate(
              id,
              {
                $set: {
                  title,
                  price,
                  url
                },
              },
              {
                new: true,
              }
            );
            return newProduct;
          },
        
    }
};


module.exports = {resolvers}

