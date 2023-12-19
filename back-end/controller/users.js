const {addUser, getUserById, getUsers} = require("../prisma/module/users")
const cloudinary = require("../configs/cloudinary-config")
const { PrismaClient } = require('@prisma/client'); //to be used in the model
const prisma = new PrismaClient();

exports.addNewUser = async (req, res) => {
  try {
    const data = req.body;

    await cloudinary.uploader.upload(data.profilePic, (err, result) => {
      if (err) {
        console.log(err);
        throw new Error('Failed to upload profile picture');
      } else {
        data.profilePic = result.secure_url;
      }
    });

    const addUserResult = await addUser(data);
    res.send(addUserResult);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.updatePro = async(req,res)=>{
  try {
      const userr = await prisma.users.update({
          where: { id: req.params.id },
      data: {
          ...req.body
      },
      })
      res.status(200).json(userr)
  }
  catch (err) {
       res.status(500).json(err)
  }
}

exports.deletePro = async (req, res) => {
    
  try {
      const user = await prisma.users.delete({
          where: { id : req.params.id }
      })
       res.status(200).json(user)
  }
  catch (err) {
       res.status(500).json(err)
  }
}

exports.getUser=async (req, res)=>{
const id=req.params.id
console.log(id)
try {
  const user= await getUserById(id)
  res.send(user)
} catch (error){
  console.error(error);
  res.status(500).send('Internal Server Error');
}
 


}

exports.getAllUsers=async (req, res)=>{
  try {
    const user= await getUsers()
    res.send(user)
  } catch (error){
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
  }
