const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment");


async function createPost(postData) {
  const date_time = moment().format("YYYY-MM-DD HH:mm:ss");
  const completePostData = {
    ...postData,
    date_time,
    pic: [...postData.pic], // Wrap the single picture URL in an array
  };

  const newPost = await prisma.posts.create({
    data: completePostData,
  });

  return newPost;
}



async function getAllPosts() {
  const posts = await prisma.posts.findMany({
    include: {
      users: true,
    },
  });

  return posts;
}
async function getCommentsByPost(postId) {
  const comments = await prisma.comments.findMany({
    where: { postid: postId },
  });

  const userIds = comments
    .map((comment) => comment.userid)
    .filter((userid) => userid !== null); // Filter out null values

  const users = await prisma.users.findMany({
    where: { id: { in: userIds } },
  });

  const commentsWithUsers = comments.map((comment) => {
    const user = users.find((user) => user.id === comment.userid);
    return { ...comment, user }; // Add user data to the comment
  });

  return commentsWithUsers;
}


async function addComment(commentData) {
  const newComment = await prisma.comments.create({
    data: {
      userid: commentData.user,
      postid: commentData.post,
      comment: commentData.comment,
    },
  });

  return newComment;
}

async function addLikes(likeData) {
  const newLike = await prisma.likes.create({
    data: {
      userid: likeData.user,
      postid: likeData.post,
    },
  });

  const user = await prisma.users.findUnique({
    where: { id: likeData.user },
  });

  return { ...newLike, user };
}

async function getLikes(postId) {
  const likes = await prisma.likes.findMany({
    where: { postid: postId },
  });

  const users = await Promise.all(
    likes.map((like) =>
      prisma.users.findUnique({
        where: { id: like.userid },
      })
    )
  );

  const likesWithUsers = likes.map((like, index) => ({
    ...like,
    user: users[index],
  }));

  return likesWithUsers;
}


async function removeLike(likeData) {
  // Ensure that likeData and likeData.id are not undefined or null
  if (likeData && likeData.id) {
    try {
      const removedLike = await prisma.likes.delete({
        where: {
          id: likeData.id,
        },
      });
      return removedLike;
    } catch (error) {
      console.error('Error while deleting like:', error);
    }
  } else {
    console.error('Invalid likeData:', likeData);
  }
}


module.exports = { createPost, getAllPosts, getCommentsByPost, addComment, addLikes, getLikes, removeLike };


