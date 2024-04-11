import express from 'express'
import ConnectDB from './config/ConnectDb.js';
import router from './routes/Route.js';
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import GenPaperModel from './models/GenPaper.js';
dotenv.config()
const app = express();
const port = process.env.PORT;
const DB_URL = process.env.DB_URL;
 
app.use(cors())  
ConnectDB(DB_URL);      
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({extended:true}))


async function deleteAllData(){
    const id = '65895cf927edc1d9e5ec09a2';
    await GenPaperModel.deleteMany({"creator.id":id});
}
 
app.use('/', router) 

app.listen(port,()=>{
    console.log(`Server running on http://localhost:8000`)
})