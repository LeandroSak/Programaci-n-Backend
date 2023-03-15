import { createLogger, format , transports} from "winston"
const { combine, timestamp } = format;

const logger = createLogger({
    format: combine(
        timestamp(),
        format.simple()
    ),
    transports:[
        new transports.Console({
            level:"info"
        }),
        new transports.File({
            filename: "warn.log",
            level: "warn"
        }),
        new transports.File({
            filename: "error.log",
            level: "error"
        })
    ]
})

export default logger