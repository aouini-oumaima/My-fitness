const { PrismaClient } = require('@prisma/client'); //to be used in the model
const prisma = new PrismaClient();



async function addUser(data) {  
  console.log(data)
  const user = await prisma.users.create({
    data: { id : data.id,
    username : data.username,
    firstname:  data.firstname, 
    lastname  : data.lastname,
    email  : data.email,
    profilepic: data.profilePic,
    premium  :   false,
    followers : data.followers,
    birthday :  data.birthday,
    follows    :data.follows,
    }
  })

 

  
}
async function getUserById(id) {
  const user = await prisma.users.findUnique({
    where: {
      id: id,
    },
  });

  return user;
}
async function getUsers(){
  const user = await prisma.users.findMany({});

  return user;
}


module.exports = {addUser, getUserById,getUsers}