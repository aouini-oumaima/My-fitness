
const express = require('express');
const router = express.Router();
const { getUserPosts } = require('../prisma/module/userspost');



router.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  const userPosts = await getUserPosts(userId);
  res.json(userPosts);
});

module.exports = router;