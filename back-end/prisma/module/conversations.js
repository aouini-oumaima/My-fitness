const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment");


async function createConversation(res) {

  const ischat = await prisma.chat.findMany({
    where: {
      users: {
        hasEvery: [res.user1, res.user2],
      },
    },
  });
  console.log(ischat);
  if (ischat.length>0){
    const messages = await prisma.messages.findMany({
      where: {
        chat: ischat[0].id,
      },
    });
    return [ischat,messages]
  }
else {


  
  const conversation = await prisma.chat.create({
    data: {
      
      users: [res.user1, res.user2],
    
      latestmessage: "",
   
    },
  });
console.log(conversation)
 return [[conversation],[]]
}
    
  }

  async function findUsers(res) {
    const users = await prisma.users.findMany({
      where: {
        AND: [
          { id: res.user1 },
          { id: res.user2 },
        ],
      },
    });
  
 return users
  }

async function handleMessage(msg){
  const message = await prisma.messages.create({
    data: msg
  });
return message
}

async function latestMessage(conv){
  const latest = await prisma.chat.update({
    where: {
      id: conv.id
    },
    data: {
      latestmessage: conv.msg
    }
  });
return latest
}

async function getConversation(uid) {
  const conversations = await prisma.$queryRaw
  `SELECT c.id, array_agg(json_build_object('id', u.id, 'username', u.username, 'firstname', u.firstname, 'lastname', u.lastname, 'email', u.email, 'profilepic', u.profilepic, '	premium', u.premium, 'followers', u.followers, 'birthday', u.birthday, 'follows', u.follows  )) as users, c.latestmessage
  FROM chat AS c
  JOIN users AS u ON c.users @> ARRAY[u.id]
  WHERE c.users @> ARRAY[${uid}]
  GROUP BY c.id;
  `;

  return conversations.map((conversation) => ({
    id: conversation.id,
    users: conversation.users,
    latestmessage: conversation.latestmessage,
  }));
}



  module.exports ={createConversation,findUsers, handleMessage, latestMessage, getConversation}
  