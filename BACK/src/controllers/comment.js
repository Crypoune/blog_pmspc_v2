import Comment from "../model/Comment.js";

const getStat = async (req, res) => {
  try {
    const [response] = await Comment.stat();
    res.json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getAllFromArticleId = async (req, res) => {
  try {
    const { id } = req.params;
    const [comments] = await Comment.findAllFromArticleId(id);
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { content, id_article, id_user } = req.body;
    const data = {
      content: content,
      id_article: parseInt(id_article),
      id_user: parseInt(id_user),
    };

    if (!content || !id_user || !id_article) {
      return res.status(400).json({ msg: "Unable to add an empty comment." });
    }

    if (isNaN(data.id_user) || isNaN(data.id_article)) {
      return res.status(400).json({ msg: "Invalid user or article ID." });
    }

    const [result] = await Comment.addCommentToArticle(data);

    if (result.affectedRows === 0) {
      throw new Error("Unable to add your comment");
    }
    res.status(201).json({ msg: "Your comment has been successfully sent" });
  } catch (err) {
    console.error("Error while adding comment", err);
    res.status(500).json({ msg: err.message });
  }
};

export { getStat, getAllFromArticleId, addComment };
