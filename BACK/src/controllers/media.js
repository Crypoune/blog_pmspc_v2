import Media from "../model/Media.js";
import fs from "fs";
import path from "path";
import formidable from "formidable";

const getStat = async (req, res) => {
  try {
    const [response] = await Media.stat();
    res.json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const create = async (req, res) => {

  try {
    const { image, alt, id_article } = req.body;

    const [result] = await Media.addImage(image, alt, id_article);

    if (result.affectedRows === 0) {
      throw new Error("Unable to add media");
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
        return res.status(400).json({ msg: err.message });
      }

      // Vérifier si des fichiers sont présents
      if (!files || !files.media) {
        return res.status(400).json({ msg: "No media files uploaded" });
      }

      // Chemin pour sauvegarder les fichiers
      const mediaFiles = [];

      for (const file of files.media) {
        const oldPath = file.filepath;
        const newPath = path.join(
          process.cwd(),
          "public",
          "media",
          file.originalFilename
        );

        // Copier le fichier dans le dossier public
        fs.copyFile(oldPath, newPath, async (err) => {
          if (err) {
            return res.status(500).json({ msg: "Error copying media file" });
          }

          // Ajouter l'entrée du média dans la base de données
          const [mediaResponse] = await Media.addMedia({
            name: file.originalFilename,
            alt: fields.alt ? fields.alt[0] : null,
            id_article: fields.article_id[0],
          });

          // Vérifier si l'image a été ajoutée
          if (!mediaResponse.affectedRows) {
            return res
              .status(500)
              .json({ msg: "Error saving media in the database" });
          }

          // Ajouter le fichier au tableau des médias
          mediaFiles.push(file.originalFilename);
        });
      }

      // Une fois terminé, renvoyer une réponse
      res.json({ msg: "Media files added", mediaFiles });
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getMediaByArticleId = async (req, res) => {
  try {
    const [response] = await Media.findByArticleId(req.params.article_id);

    if (!response.length) {
      return res.status(404).json({ msg: "No media found for this article" });
    }

    res.json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const removeMedia = async (req, res) => {
  try {
    const mediaId = req.params.media_id;

    // Supprimer le fichier du système
    const [mediaResponse] = await Media.findById(mediaId);

    if (!mediaResponse.length) {
      return res.status(404).json({ msg: "Media not found" });
    }

    const fileName = mediaResponse[0].name;
    const filePath = path.join(process.cwd(), "public", "media", fileName);

    // Supprimer le fichier du serveur
    fs.unlink(filePath, async (err) => {
      if (err) {
        return res
          .status(500)
          .json({ msg: "Error deleting media file from server" });
      }

      // Supprimer l'entrée de la base de données
      const [deleteResponse] = await Media.remove(mediaId);

      if (!deleteResponse.affectedRows) {
        return res
          .status(500)
          .json({ msg: "Error deleting media from the database" });
      }

      res.json({ msg: "Media deleted successfully" });
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export { getStat, addMedia, getMediaByArticleId, create, removeMedia };
