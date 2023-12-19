const cloudinary = require("cloudinary").v2;
const { createPost, getAllPosts, getCommentsByPost, addComment, addLikes, getLikes, removeLike} = require("../prisma/module/postModel");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
cloudinary.config({
  cloud_name: "di9jvr1du",
  api_key: "541267681874831",
  api_secret: "ygL3tYqGyGvZr4yaxw6_3ZR4R34",
});

exports.createPost = async (req, res) => {
  const data = req.body;

  try {
    if (data.pic) {
      // Multiple pictures were uploaded
      const picUrls = [];
      for (const pic of data.pic) {
        const result = await cloudinary.uploader.upload(pic);
        picUrls.push(result.secure_url);
      }
      data.pic = picUrls;
    } else {
      // Single picture was uploaded
      const result = await cloudinary.uploader.upload(data.pic);
      data.pic = result.secure_url;
    }

    const newPost = await createPost(data);
    res.send(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
};

exports.getAll = async (req, res) => {
  try {
    const allPosts = await getAllPosts();
    res.send(allPosts);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
};


exports.getCommentsByPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await getCommentsByPost(postId);
    res.send(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
};

exports.addComment = async (req, res) => {
  const commentData = req.body;

  try {
    const newComment = await addComment(commentData);
    res.send(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
};

exports.likePost = async (req, res, next) => {
  try {
    const likeData = {
      user: req.body.user,
      post: req.params.postId
    };
    const newLike = await addLikes(likeData);
    res.status(201).json(newLike);
  } catch (error) {
    next(error);
  }
};

exports.getPostLikes = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const likes = await getLikes(postId);
    res.status(200).json(likes);
  } catch (error) {
    next(error);
  }
};

exports.unlikePost = async (req, res, next) => {
  try {
    const likeData = {
      user: req.body.user,
      post: req.params.postId,
    };
    const removedLike = await removeLike(likeData);
    res.status(200).json(removedLike);
  } catch (error) {
    next(error);
  }
};
exports.update = async (req, res) => {
  try {
    const comment = await prisma.comments.update({
      where: { id: req.params.id },
      data: {
          bodyCom: req.body.bodyCom

      },
    });
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteComment = async (req, res) => {
  
  try {
      const comment = await prisma.comments.delete({
          where: { id: req.params.id }
      })
       res.status(200).json(comment)
  }
  catch (err) {
       res.status(500).json(err)
  }
}
exports.deletePost = async (req, res) => {
    
  try {
      const postss = await prisma.posts.delete({
          where: { id : req.params.id }
      })
       res.status(200).send(postss)
  }
  catch (err) {
       res.status(500).send(err)
  }
}

exports.updatePost = async (req, res) => {
  try {
    const updated = await prisma.posts.update({
      where: { id: req.params.id },
      data: {
        ...req.body
      },
    });
    res.status(200).json(updated);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
};
