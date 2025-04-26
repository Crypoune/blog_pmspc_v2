import { useContext, useEffect, useState } from "react";
import { UserContext } from "/src/context/UserContext";
import Button from "/src/Components/Partials/Button";

function ArticleMedia({ id_article = 0, media_files = [], media_alts = [] }) {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaAlts, setMediaAlts] = useState([]);
  const [updatedMediaFiles, setUpdatedMediaFiles] = useState([]);
  const [updatedMediaAlts, setMUpdatedMdiaAlts] = useState([]);
  const { isAdmin, userId } = useContext(UserContext);
  const [IsModified, setIsModified] = useState(false);

  /*
    setMediaFiles(media_files);
    setMediaAlts(media_alts);
    useEffect(() => {
        // S'assurer qu'il y ait toujours une ligne vide à la fin
        if (mediaFiles[mediaFiles.length - 1] !== "") {
            setMediaFiles([...mediaFiles, ""]);
            setMediaAlts([...mediaAlts, ""]);
        }
    }, [mediaFiles, mediaAlts, IsModified]);
    
    */
  const handleMediaFilesChange = (e, index) => {
    const updatedMediaFiles = [...mediaFiles];
    updatedMediaFiles[index] = e.target.value;

    setMediaFiles(updatedMediaFiles);

    // Ajouter une ligne vide si le dernier champ n'est plus vide
    if (index === mediaFiles.length - 1 && e.target.value !== "") {
      setMediaFiles([...updatedMediaFiles, ""]);
    }
  };

  const handleMediaAltsChange = (e, index) => {
    const updatedMediaAlts = [...mediaFiles];
    updatedMediaAlts[index] = e.target.value;

    setMediaFiles(updatedMediaAlts);

    // Ajouter une ligne vide si le dernier champ n'est plus vide
    if (index === mediaAlts.length - 1 && e.target.value !== "") {
      setMediaAlts([...updatedMediaAlts, ""]);
    }
  };

  if (!isAdmin()) {
    return <> </>;
  }

  return (
    <div className="flex flex-col gap-2">
      <section className="media_files">
        <p>Fichiers media :</p>
        {media_files.map((index) => (
          <input
            key={String(index)}
            id={String(index)}
            type="text"
            value={media_files[index]}
            minLength="2"
            maxLength="40"
            onChange={(e) => handleMediaFilesChange(e, index)}
            placeholder={`${index}`}
          />
        ))}
      </section>
      <section className="media_alts">
        <p>Fichiers alts :</p>
        {media_alts.map((index) => (
          <input
            key={String(index)}
            id={String(index)}
            type="text"
            value={media_alts[index]}
            minLength="2"
            maxLength="40"
            onChange={(e) => handleMediaAltsChange(e, index)}
            placeholder={`${index}`}
          />
        ))}
      </section>
    </div>
  );
}
export default ArticleMedia;
