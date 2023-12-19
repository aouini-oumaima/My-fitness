const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getUser(req, res) {
  const userId = req.params.id;

  try {
    const user = await prisma.users.findUnique({ where: { id: userId } });
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving user");
  }
}


async function updateUser(req, res) {
  const userId = req.params.id;
  const { username, password, profilePic,firstName,lastName,followers,posts } = req.body;

  try {
    const updatedUser = await prisma.users.update({
      where: { id: Number(userId) },
      data: {
        username,
        password,
        profilePic,
        lastName,
        firstName,
        followers,
        posts,

      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  getUser,
  updateUser
};
