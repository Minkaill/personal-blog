import ArticleModel from "../models/Article.model.js";

export const getAll = async (req, res) => {
  try {
    const articles = await ArticleModel.find().populate("user").exec();
    res.json(articles);
  } catch (error) {
    res.status(500).json({
      message: "Не удалось получить статьи :(",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const articleId = req.params.id;

    ArticleModel.findOneAndUpdate(
      {
        _id: articleId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          return res.status(500).json({
            message: "Не удалось вернуть статью :(",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Cтатья не найдена",
          });
        }

        res.json(doc);
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Не удалось получить статьи :(",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const articleId = req.params.id;

    ArticleModel.findOneAndDelete(
      {
        _id: articleId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не удалось удалить статью :(",
          });
        }

        if (!doc) {
          return res.status(500).json({
            message: "Статья не найдена :(",
          });
        }

        res.json({
          success: true,
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Не удалось удалить статью :(",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new ArticleModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось создать статью :(",
    });
  }
};

export const update = async (req, res) => {
  try {
    const articleId = req.params.id;

    await ArticleModel.updateOne(
      {
        _id: articleId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags,
      }
    );

    res.json({
      success: true,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось обновить статью :(",
    });
  }
};
