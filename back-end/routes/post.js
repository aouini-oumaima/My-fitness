var express = require("express");
var router = express.Router();

const post = require("../controller/postController");

router.post("/create", post.createPost);
router.get("/", post.getAll);
router.get("/:postId/comments", post.getCommentsByPost);
router.post("/:postId/comments", post.addComment);
router.post("/:postId/likes", post.likePost);
router.get("/:postId/likes", post.getPostLikes);
router.delete("/:postId/likes", post.unlikePost);
router.delete("/delete/:id",post.deletePost)
router.put("/update/:id",post.updatePost)
router.put("/comments/:id", post.update);
router.delete("/comments/:id",post.deleteComment);


module.exports = router;
