const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const usermediaModel=require("../models/menteeModel")




const RegisterUser=async(req,res)=>{
    const {
        email,
        password,
        username,
        accountType,
        about,
        experience,
        education,
      } = req.body;
        try {
            if(!email||!password||!username||!accountType||!about||!experience||!education){
                res.status(400)
                throw new Error("Please add all fields")
            }
            const userExists=await usermediaModel.findOne({email})
            if(userExists){
                res.status(400)
                throw new Error("User already exists")
            }

            const salt=await bcrypt.genSalt(10)
            const hashedPassword=await bcrypt.hash(password,salt)

            const user =await  usermediaModel.create({
                email,
                password:hashedPassword,
                username,
                accountType,
                about,
                experience,
                education,
            })
            if(user){
                res.status(201).json({
                    _id:user.id,
                    email:user.email,
                    username:user.username,
                    accountType:user.accountType,
                    about:user.about,
                    experience:user.experience,
                    education:user.education,
                    token:generateToken(user._id)
                   
                })
            }else{
                res.status(400)
                throw new Error('invalid user data')
            }
            
        } catch (error) {
            console.error(error)
        }
}
const loginUser=async(req,res)=>{
    const{email,password}=req.body
    try {
        const user=await  usermediaModel.findOne({email})

        if(user && (await bcrypt.compare(password,user.password)) ){
            res.json({
                _id:user.id,
                email:user.email,
                username:user.username,
                accountType:user.accountType,
                about:user.about,
                experience:user.experience,
                education:user.education,
                token:generateToken(user._id)
            })
            
        }else{
            res.status(400)
            throw new Error("invalid credentials")
        }
    } catch (error) {
        console.error(error)
    }

}

const  generateToken=(_id)=>{
    return jwt.sign({_id},process.env.JWT_SECRET,{
        expiresIn:"1h",
    })
} 
 const getMe=(async(req,res)=>{
   
    res.status(200).json(req.user)
      
    
 })

module.exports={
    RegisterUser,
    loginUser,
    getMe
}