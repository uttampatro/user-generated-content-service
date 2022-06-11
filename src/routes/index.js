const express = require("express");
const {
  creatingArticle,
  getAllArticle,
  getArticle,
  deleteArticle,
  fetchArticleByUser,
} = require("../controllers/articles");
const { loginUser, registerUser } = require("../controllers/users");
const router = express.Router();

// Auth
router.post("/register", registerUser);
router.post("/login", loginUser);

//Article
router.post("/createArticle", creatingArticle);
router.get("/fetchAllArticles", getAllArticle);
router.get("/fetchArticle/:id", getArticle);
router.delete("/deleteArticle/:id", deleteArticle); 
router.get('/articlesByWriter/:id', fetchArticleByUser);


module.exports = router;
