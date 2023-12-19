const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getUser(userId) {
  const user = await prisma.users.findUnique({
    where: { id: userId },
  });
  return user;
}

async function updateUser(userId, data) {
    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: {
        username: data.username,
        password: data.password,
        profilePic: data.profilePic,
        lastName:data.lastName,
        firstName:data.firstName,
        followers:data.followers,
        posts:data.posts
      },
    });
    return updatedUser;
  }

module.exports = getUser,updateUser;