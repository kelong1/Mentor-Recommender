const express=require("express");
const app=express();
const cors=require("cors")
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const MenteeUrls=require("./Routes/menteeRoutes")
const mentorRoutes=require('./Routes/mentorRoutes')
const mentorShipsRoutes=require('./Routes/mentorshipRequests')
dotenv.config();
//mongoose.connect(process.env.MONGO_DB,{useNewUrlParser:true,UseUnifiedTopology:true},()=>console.log("Database is connected"));
app.use(express.json())
app.use(cors())

app.use('/app/mentees',MenteeUrls);
app.use('/app/mentors',mentorRoutes)
app.use('/app/mentorships',mentorShipsRoutes)
app.listen(process.env.PORT,()=>console.log("port is running at 7000"))
const connectToMongo = async () => {
    mongoose.connect(process.env.MONGO_DB, await console.log("Connected to mongo Successful")
       );
   }
   connectToMongo();