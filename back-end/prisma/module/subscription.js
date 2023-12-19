const { PrismaClient } = require('@prisma/client'); //to be used in the model
const { subscribe } = require('../../routes');
const prisma = new PrismaClient();



 userSubscribtion= async (userId)=>{
    const updatedUser = await prisma.users.update({
        where: { id: userId },
        data: { premium: true },
      });
      return updatedUser
}


module.exports = {userSubscribtion}