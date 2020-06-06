const router = require("express").Router();
const PostService = require("../../services/PostService");
const JwtService = require("../../services/JwtService");

router.get("/posts", async (req, res) => {
  //   console.log(req.query);
  const { dest } = req.query;
  const posts = await PostService.getAll(dest);
  res.json(posts);
});

router.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { slug, draw, length, start } = req.query;
  const response = await PostService.getById(id, slug, draw, length, start);
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
  console.log(response);
  res.json(response);
});

router.delete("/posts/:id", JwtService.verifyUserToken, async (req, res) => {
  const { id } = req.params;
  const response = await PostService.deletePost(id);
  res.json(response);
});

module.exports = router;
