import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNote, modifyNote, deleteNote } from "../services/api";
import Form from "../components/Form";


const DetailPage = () => {
  const [ note, setNote ] = useState();
  const [ isReadMode, setIsReadMode] = useState(true);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getNote(id).then(data => {
      setNote(data)
    })
  }, []);

  const updateTitle = (value) => {
        setNote({...note, title: value});
    };

    const updateContent = (value) => {
        setNote({...note, content: value});
    };

    const updatePhoto = (value) => {
        setNote({...note, photo: value});
    };

  const handleClickEdit = () => {
    setIsReadMode(false);
  };

  const handleClickSave = () => {
    modifyNote(note,id).then(() => {
      setIsReadMode(true);
    })
  };

  const handleClickDelete = () => {
    deleteNote(id).then(() => {
      navigate("/");
    })
  };

  return (
      <>
        <h1>Detalle de la nota</h1>
        <Form 
          title={note?.title}
          content={note?.content}
          photo={note?.photo}
          isDisabled={isReadMode}
          updateTitle={updateTitle}
          updateContent={updateContent}
          updatePhoto={updatePhoto}
        />
        {/* Así solo se muestra el botón cuando no se está editando */}
        {isReadMode && <button onClick={handleClickEdit}>Editar nota</button>}
        {!isReadMode && <button onClick={handleClickSave}>Guardar nota</button>}

        <button onClick={handleClickDelete}>Eliminar nota</button>
      </>
  );
};

export default DetailPage;