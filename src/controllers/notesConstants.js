const NOTES_QUERIES= Object.freeze({
    GET_ALL_NOTES:'SELECT * FROM notes ORDER BY created_at DESC',
    GET_NOTE_BY_ID:'SELECT * FROM notes WHERE id=$1',
    CREATE_NOTE:'INSERT INTO notes (title,content) VALUES ($1,$2) RETURNING *',
    UPDATE_NOTE:'UPDATE notes SET title=COALESCE ($1,title), content=COALESCE($2,content), updated_at=NOW() WHERE id=$3 RETURNING *',
    DELETE_NOTE:'DELETE FROM notes WHERE id=$1 RETURNING *'
});

const NOTES_ERRORS=Object.freeze({
    ID_NOT_FOUND:"El id de la nota no existe en el sistema"
});
module.exports={NOTES_QUERIES,NOTES_ERRORS}