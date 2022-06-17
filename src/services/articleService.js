const Article = require("../entity/Article");
const User = require("../entity/User");

const createArticle = async ({ userId, title, description, imageUrl }) => {
  const user = await User.findOne({ _id: userId }).select(["email"]);
  const article = new Article({
    title: title,
    description: description,
    imageUrl: imageUrl,
    createdBy: user,
  });
  await article.save();
  return article;
};

const fetchAllArticle = async ({ limit, page }) => {
  const articleList = await Article.find()
    .populate("createdBy", (select = ["email"]))
    .skip(page > 0 ? (page - 1) * limit : 0)
    .limit(limit)
    .exec();

  const totalArticleCount = await Article.countDocuments();
  return {
    articleList: articleList,
    pagination: { limit, page, count: totalArticleCount },
  };
};

const fetchArticle = async (id) => {
  const article = await Article.findOne({ _id: id }).populate(
    "createdBy",
    (select = ["email"])
  );
  return article;
};

const deletingArticle = async (_id) => {
  const article = await Article.findByIdAndDelete(_id);
  return article;
};

const getArticlesByWriter = async (id, { limit, page }) => {
  const user = await User.findOne({ _id: id });
  const articles = await Article.find({ createdBy: user })
    .skip(page > 0 ? (page - 1) * limit : 0)
    .limit(limit)
    .exec();
  const totalArticleCount = await Article.countDocuments({ createdBy: user });
  return {
    articleList: articles,
    pagination: { limit, page, count: totalArticleCount },
  };
};

const generateRandomFilename = (filePath) => {
  return (
    Date.now() + "_" + (Math.random() * 1000000).toFixed() + "_" + filePath
  );
};

const getRandomArticles = async () => {
  const articleList = await Article.find().populate(
    "createdBy",
    (select = ["email"])
  );
  let newItems = [];
  for (let i = 0; i < 3; i++) {
    let idx = Math.floor(Math.random() * articleList.length);
    newItems.push(articleList[idx]);
    articleList.splice(idx, 1);
  }
  return newItems;
};

const updateArticle = async (_id, { title, description, imageUrl }) => {
  const article = await Article.findById(_id);
  article.title = title || article.title;
  article.description = description || article.description;
  article.imageUrl = imageUrl || article.imageUrl;

  await article.save();
  return article;
};

module.exports = {
  createArticle,
  fetchArticle,
  fetchAllArticle,
  deletingArticle,
  getArticlesByWriter,
  generateRandomFilename,
  getRandomArticles,
  updateArticle,
};
