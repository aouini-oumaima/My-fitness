const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
// const { v4: uuidv4 } = require('uuid');


async function addFollow(data) {
  const { current_user_id, foreign_user_ids } = data;
  console.log(data,"MODULE")
  try {
    const follow = await prisma.follows.create({
      data: {
        current_user_ids: data.current_user_ids,
        foreign_user_ids: data.foreign_user_ids,
      },
        });
        console.log(follow);
        return follow
  } catch (error) {  
    console.error(error);
  }
}
   


async function getAllCurrent(id) {
  try {
    const currentFollow = await prisma.follows.findMany({
      where: {
        current_user_ids: {
          equals: id.id,
        },
      },
    });
    return currentFollow
  } catch (error) {
    console.error(error);
  }
}

async function getAllForeign(id) {
  try {
    const foreignUsers = await prisma.follows.findMany({
      where: {
        foreign_user_ids: {
          equals: id.id,
        },
      },
    });
    return foreignUsers
  } catch (error) {
    console.error(error); 
  }
}

module.exports = {addFollow , getAllCurrent,getAllForeign}
