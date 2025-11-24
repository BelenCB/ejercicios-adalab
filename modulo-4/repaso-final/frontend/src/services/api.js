export const getNotes = () => {
    return fetch("http://localhost:3000/notes")
        .then((response) => response.json())
        .then((data) => {
            const cleanData = data.map((item) => {
                return {
                    id: item.id_note,
                    title: item.title,
                    content: item.content,
                    photo: item.photo
                };
            });
            return cleanData;
        })
        .catch((error) => {
            console.log(error);
        });
};

export const addNote = (data) => {
    return fetch("http://localhost:3000/add-note", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then(() => {
            return;
        })
        .catch((error) => {
            console.log(error);
        });
};

export const getNote = (id) => {
    return fetch(`http://localhost:3000/note/${id}`)
        .then((response) => response.json())
        .then((data) => {
           const cleanData = data.map((item) => {
                return {
                    id: item.id_note,
                    title: item.title,
                    content: item.content,
                    photo: item.photo
                };
            });
            return cleanData[0]; 
        })
        .catch((error) => {
            console.log(error);
        });
};

export const modifyNote = (data, id) => {
    return fetch(`http://localhost:3000/modify-note/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then(() => {
            return;
        })
        .catch((error) => {
            console.log(error);
        });
};

export const deleteNote = (id) => {
    return fetch(`http://localhost:3000/delete-note/${id}`, {
        method: "PATCH",
    })
        .then((response) => response.json())
        .then(() => {
            return;
        })
        .catch((error) => {
            console.log(error);
        });
};