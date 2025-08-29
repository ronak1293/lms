import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.mjs'
import { clerkWebhooks, stripeWebhooks } from './controllers/webhook.mjs'
import educatorRouter from './routes/educatorRoutes.mjs'
import { clerkMiddleware } from '@clerk/express'
import connectCloudinary from './configs/cloudinary.mjs'
import courseRouter from './routes/courseRoute.mjs'
import userRouter from './routes/userRoutes.mjs'
import {clerkClient} from '@clerk/express'

import { getAuth } from '@clerk/express'
const app=express()


//db

await connectDB()

//conn cloudinary
await connectCloudinary()

//middlewares
app.use(cors())
app.use(
  clerkMiddleware()
);


app.get('/',async (req,res)=> {
 const users= await clerkClient.users.getUserList();
  res.send(users)})
app.post('/clerk', express.raw({ type: 'application/json' }), clerkWebhooks)
app.use('/api/educator',express.json(),educatorRouter)
app.use('/api/course',express.json(),courseRouter);
app.use('/api/user',express.json(),userRouter);
app.post('/stripe',express.raw({type:'application/json'}),stripeWebhooks)


const PORT=process.env.PORT||5000

app.listen(PORT,()=>{
  console.log(`server started on ${PORT}`);
  
})