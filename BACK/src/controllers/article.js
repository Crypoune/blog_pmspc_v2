import fs from "fs";
import path from "path";
import formidable from "formidable";

import Article from "../model/Article.js";
import Media from "../model/Media.js";

// Stat sur les articles
const getStat = async (req, res) => {
  try {
    const [response] = await Article.stat();
    res.json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Récupérer tous les articles
const getAll = async (req, res) => {
  try {
    const [response] = await Article.findAll();
    res.json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Récupérer tous les articles avec les réactions
const getReactAll = async (req, res) => {
  try {
    const [response] = await Article.findReactAll();
    res.json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Récupérer un article par ID
const getById = async (req, res) => {
  try {
    const [response] = await Article.findById(req.params.id);
    if (!response.length) {
      res.status(404).json({ msg: "Article not found" });
      return;
    }
    const article = response[0];


    // Sécurisation des propriétés media_files et media_alts
    article.media_files = Array.isArray(article.media_files)
      ? article.media_files.filter((m) => m !== null && m !== undefined)
      : [];

    article.media_alts = Array.isArray(article.media_alts)
      ? article.media_alts.filter((alt) => alt !== null && alt !== undefined)
      : [];


    //  Si aucun média n'est présent, utiliser l'image principale de l'article
    if (article.media_files.length === 0) {
      article.media_files = [article.image];
      article.media_alts = [article.alt];
    }

    // Nettoyer les médias en supprimant les éléments `null`
    response[0].media_files =
      response[0].media_files?.filter((m) => m !== null) ?? [];
    response[0].media_alts =
      response[0].media_alts?.filter((alt) => alt !== null) ?? [];

    // Si aucun média n'est présent, utiliser l'image principale de l'article
    if (response[0].media_files.length === 0) {
      response[0].media_files = [response[0].image];
      response[0].media_alts = [response[0].alt];
    }

    res.json(response[0]);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Récupérer les "nb"  articles les plus récents
const getRecent = async (req, res) => {
  try {
    const [response] = await Article.findRecent(parseInt(req.params.nb, 10));
    res.json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { title, content, id_user, id_category, image, alt } = req.body;
    const datas = { title, content, id_user, id_category, image, alt };

    const [response] = await Article.create(datas);

    // Récupération de l'article créé pour le renvoyer au frontend
    const [createdArticle] = await Article.findInfoById(response.insertId);
    const article = createdArticle[0];
    article.media_files = [article.image];
    article.media_alts = [article.alt];
    if (createdArticle) {
      res.status(201).json({ msg: "Article crée", data: article });
    } else {
      res
        .status(404)
        .json({ msg: "Erreur lors de la récupération de l'article créé" });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const addMedia = (req, res) => {
  try {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(400).json({ msg: err.message });
        return;
      }
      for (const img of files.img) {
        const oldPath = img.filepath;
        const newPath = path.join(
          process.cwd(),
          "public",
          "img",
          img.originalFilename
        );
        fs.copyFile(oldPath, newPath, async (err) => {
          if (err) {
            res.status(500).send(err);
            return;
          }
          const [response] = await Media.addImage(
            img.originalFilename,
            alt,
            fields.articleId[0]
          );
          if (!response.affectedRows) {
            res.status(404).json({ msg: "Image not added" });
            return;
          }
        });
      }
      res.json({ msg: "Image added" });
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Mise à jour d'un article [data.title, data.content, data.image, data.alt, id]
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const [result] = await Article.update(data, id);

    // Récupération de l'article  modifié
    const [modifiedArticle] = await Article.findInfoById(id);

    if (!modifiedArticle) {
      return res.status(404).json({ msg: "Article not found" });
    }

    const article = modifiedArticle[0];

    if (result.affectedRows === 1) {
      res.status(200).json({ msg: "Article updated", data: article });
    } else {
      res.status(404).json({ msg: "Article not found" });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Mise à jour d'un article (y compris image principale et médias secondaires)
const update_all = (req, res) => {
  try {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(400).json({ msg: err.message });
        return;
      }

      // Mise à jour des données de l'article
      const articleId = req.params.id;
      const updatedData = {
        title: fields.title,
        content: fields.content,
        alt: fields.alt || "",
      };

      // Mise à jour de l'image principale
      if (files.preview) {
        const oldPath = files.preview.filepath;
        const newPath = path.join(
          process.cwd(),
          "public",
          "uploads",
          files.preview.originalFilename
        );

        fs.copyFile(oldPath, newPath, async (err) => {
          if (err) {
            res.status(500).json({ msg: "File upload error" });
            return;
          }

          updatedData.image = `/uploads/${files.preview.originalFilename}`;
        });
      }

      await Article.update(updatedData, articleId);

      // Mise à jour ou ajout des images secondaires
      if (files.media && Array.isArray(files.media)) {
        for (const img of files.media) {
          const oldPath = img.filepath;
          const newPath = path.join(
            process.cwd(),
            "public",
            "uploads",
            img.originalFilename
          );

          fs.copyFile(oldPath, newPath, async (err) => {
            if (err) {
              res.status(500).json({ msg: "File upload error" });
              return;
            }

            const imageUrl = `/uploads/${img.originalFilename}`;
            const altText = fields.alt || "";

            await Article.addImage(imageUrl, altText, articleId);
          });
        }
      }

      res.json({ msg: "Article and images updated" });
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Supprimer un article
const remove = async (req, res) => {
  try {
    const [response] = await Article.remove(req.params.id);
    if (!response.affectedRows) {
      res.status(404).json({ msg: "Article not deleted" });
      return;
    }
    res.json({ msg: "Article deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export {
  getStat,
  getAll,
  getReactAll,
  getRecent,
  getById,
  create,
  addMedia,
  update,
  remove,
};
