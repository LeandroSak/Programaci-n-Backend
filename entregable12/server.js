
const http = require("./app")
const minimist = require("minimist")


const options = {alias:{p:"port"}}
const data = minimist(process.argv.slice(2),options)
const PORT = data.port || 8080


http.listen(PORT, () => console.info(`Server up and running on port ${PORT}`))