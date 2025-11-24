import 'react';

const Form = ( { title, content, photo, updateTitle, updateContent, updatePhoto, isDisabled = false } ) => {

    const handleChangeTitle = (ev) => {
        updateTitle(ev.target.value);
    };

    const handleChangeContent = (ev) => {
        updateContent(ev.target.value);
    };

    const handleChangePhoto = (ev) => {
        const file = ev.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updatePhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <label htmlFor='title'>Título</label>
            <input id="title" name="title" value={title} onChange={handleChangeTitle} disabled={isDisabled} />

            <label htmlFor='content'>Contenido</label>
            <textarea id="content" name="content" value={content} onChange={handleChangeContent} disabled={isDisabled} />

            <label htmlFor='photo'>Foto</label>
            <input type="file" id="photo" name="photo" onChange={handleChangePhoto} disabled={isDisabled} />

            {photo && <img src={photo} />}
        </>
    )
}

export default Form;