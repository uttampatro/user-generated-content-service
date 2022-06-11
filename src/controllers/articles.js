const {
  createArticle,
  fetchAllArticle,
  fetchArticle,
  deletingArticle,
  getArticlesByWriter,
} = require("../services/articleService");

const creatingArticle = async (req, res) => {
  const userId = req.body.userId;
  const title = req.body.title;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;

  const article = await createArticle({
    userId,
    title,
    description,
    imageUrl,
  });
  return res.json(article);
};

const getAllArticle = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    
    const articleList = await fetchAllArticle({ page, limit });
    return res.json(articleList);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getArticle = async (req, res) => {
  try {
    const id = req.params.id;
    const article = await fetchArticle({
      _id: id,
    });
    return res.json(article);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const id = req.params.id;
    const article = await deletingArticle({
      _id: id,
    });
    return res.json("delete article successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const fetchArticleByUser = async(req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit) : 4;

        const id = req.params.id;
        const articles = await getArticlesByWriter(id, {page, limit})
        return res.json(articles)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "Something went wrong",
        });
    }
}

module.exports = { creatingArticle, getAllArticle, getArticle, deleteArticle , fetchArticleByUser};
