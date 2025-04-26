import Reaction from "../model/Reaction.js";

// Stat sur les réactions
const getStat = async (req, res) => {
  try {
    const [response] = await Reaction.stat();
    res.json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Ajouter une réaction
const addReaction = async (req, res) => {
  try {
    const { id_user, id_article, reaction_type } = req.body;
    await Reaction.removeReaction(id_user, id_article);

    await Reaction.addReaction(id_user, id_article, reaction_type);
    res.status(201).json({ msg: "Reaction added successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Obtenir les réactions pour un article
const getReactionsByArticle = async (req, res) => {
  try {
    const { id_article } = req.params;
    const [reactions] = await Reaction.findByArticleId(id_article);
    res.status(200).json(reactions);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Obtenir les réactions pour un utilisateur et pour un article
const getReactionsUserByArticle = async (req, res) => {
  try {
    const { id_article } = req.params;
    const { id_user } = req.params;
    const [reactions] = await Reaction.findUserByArticleId(id_user, id_article);
    res.status(200).json(reactions);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Mettre à jour une réaction
const updateReaction = async (req, res) => {
  try {
    const { id_reaction } = req.params;
    const { newReaction_Type } = req.body;
    await Reaction.updateReaction(id_user, id_article, newReaction_Type);
    res.status(200).json({ msg: "Reaction updated successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Compter les reactions d'un article
const countReactionsByArticle = async (req, res) => {
  try {
    const { id_article } = req.params;
    const [reactions] = await Reaction.countReactionsByArticleId(id_article);
    res.status(200).json(reactions);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Supprimer une réaction
const removeReaction = async (req, res) => {
  try {
    const { id_reaction } = req.params;
    await Reaction.removeReaction(id_reaction);
    res.status(200).json({ msg: "Reaction removed successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export { getStat, addReaction, getReactionsByArticle, updateReaction, removeReaction, countReactionsByArticle };
