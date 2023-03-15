
import app from './app.js'
import logger from './src/logger/logger.js'
const PORT = process.env.PORT || 4000
app.set('port', PORT)

app.listen(app.get('port'), () =>{
    logger.log("info",`Server fork up and running on port ${PORT}, pid: ${process.pid}`)
})