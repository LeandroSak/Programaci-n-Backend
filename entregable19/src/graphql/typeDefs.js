const {gql} = require('apollo-server-express')



const typeDefs = gql`

    type Productos {
        id:ID
        title:String
        price:Float
        url:String
    }
    input productoInput{
        title:String
        price: Float
        url: String
    }
    type Query{

        getAllProducts: [Productos]
        getProduct(id:ID): Productos
    }

    type Mutation {
        createProduct(producto: productoInput): Productos
        deleteProduct(id:ID): String
        updateProduct(id: ID, producto: productoInput): Productos
    }



`;

module.exports = {typeDefs}