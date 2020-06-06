const router = require("express").Router();
const PostService = require("../../services/PostService");
const JwtService = require("../../services/JwtService");

router.get("/posts", async (req, res) => {
  const { dest, draw, length, start, date } = req.query;
  const posts = await PostService.getAll(dest, draw, length, start, date);
  res.json(posts);
});

router.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { slug } = req.query;
  const response = await PostService.getById(id, slug);
  res.json(response);
});

router.post("/posts", JwtService.verifyUserToken, async (req, res) => {
  const postData = req.body;
  const response = await PostService.insertPost(postData);
  res.json(response);
});

router.put("/posts", JwtService.verifyUserToken, async (req, res) => {
  const postData = req.body;
  const response = await PostService.editPost(postData);
  res.json(response);
});

router.delete("/posts/:id", JwtService.verifyUserToken, async (req, res) => {
  const { id } = req.params;
  const response = await PostService.deletePost(id);
  res.json(response);
});

module.exports = router;
