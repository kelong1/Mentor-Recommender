const jwt=require("jsonwebtoken");

const Mentor=require("../models/mentorModel")

const loginUser= async (req, res) => {
    try {
      const { name } = req.body;
  
      // Check if the mentor with the provided name exists
      const mentor = await Mentor.findOne({ name });
      if(mentor ){
        res.json({
            _id:mentor.id,
            name:mentor.name,
            position:mentor.position,
            about:mentor.about,
            token:generateToken(mentor._id)
        })
        
    }else{
        res.status(400)
        throw new Error("invalid credentials")
    }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
const  generateToken=(_id)=>{
    return jwt.sign({_id},process.env.JWT_SECRET,{
        expiresIn:"1h",
    })
} 
 const getMe=(async(req,res)=>{
   
    res.status(200).json(req.user)
      
    
 })

module.exports={
    loginUser,
    getMe
}