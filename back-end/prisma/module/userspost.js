const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


async function getUserPosts(userId) {
  const userPosts = await prisma.posts.findMany({
    where: {
        userid: userId,
    },
  });
  return userPosts;
}

module.exports = { getUserPosts };