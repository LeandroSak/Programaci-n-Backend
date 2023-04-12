
const http = require("./app")
const minimist = require("minimist")
const cluster = require("cluster")
const numCPUs = require("os").cpus().length
const {ApolloServer} = require('apollo-server-express')
const {typeDefs} = require('./src/graphql/typeDefs')
const {resolvers} = require('./src/graphql/resolvers')

const options = { alias: { p: "port" } }
const data = minimist(process.argv.slice(2), options)
//const PORT = data.port || 8080
const PORT = data.port || 8080

const logger = require("./src/logger/logger.js")

async function start(){
    
    http.listen(PORT, () => logger.log("info",`Server fork up and running on port ${PORT}, pid: ${process.pid}`))
}
    
start()


