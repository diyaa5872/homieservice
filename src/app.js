//express app
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app=express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:  true
}))

app.use(express.json({limit: '16kb'}))//means how much want to accept 'json' from express
app.use(express.urlencoded({extended: true,limit: '16kb'}))//for the url as when any data comes it gets changed by + or %
app.use(express.static("public"))//name of the folder that will be used to store some data like pdf files photos or jpeg
app.use(cookieParser())//can add secure cookies only in the server and only read secure cookies

export {app}