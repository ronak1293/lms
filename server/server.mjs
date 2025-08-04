import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.mjs'
import { clerkWebhooks } from './controllers/webhook.mjs'


const app=express()


//db

await connectDB()


app.use(cors())


app.get('/',(req,res)=> res.send("api working"))
app.post('/clerk',express.json(),clerkWebhooks)

const PORT=process.env.PORT||5000

app.listen(PORT,()=>{
  console.log(`server started on ${PORT}`);
  
})