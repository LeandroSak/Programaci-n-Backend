const app = require("./app")

const PORT = process.env.PORT || 4000
app.set('port', PORT)

app.listen(app.get('port'), () =>{
    console.info("server up and running in port: "+ app.get('port'))
})