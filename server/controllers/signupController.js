const { where } = require('sequelize');
const User=require('../models/signup');

exports.signup=async(req,res)=>{
    const {name,email,password}=req.body;
      // Check if email already exists in the database
    const user=await User.findOne({where:{email:email}});
    if(user){
        return res.status(201).json({ message: 'User already exists' });
       
    }

     // Create a new user
  try {
    const newUser = await User.create({
      name: name,
      email: email,
      password: password
    });
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

exports.allUsers=async(req,res)=>{
    try {
        const users=await User.findAll();
        return res.status(201).json(users);
    } catch (error) {
        console.error(error);
    }
}

exports.signin= async (req, res) => {
try {
  const {email,password}=req.body;
  const user=await User.findOne({where :{email:email}});
  if(!user){
    return res.status(401).json({ message: 'User not found' });
  }
  if (password !== user.password) {
    return res.status(401).json({ message: 'User not authorized' });
  }
  res.json({ message: 'User login sucessful' });

} catch (error) {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong' });
}
}