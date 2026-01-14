const express=require('express')
const router=express.Router();
const notesController=require('../controllers/notesController');
const {validateNotePost,validateNotePut,validateId}=require('../middleware/validation');

router.get('/',notesController.getAllNotes);
router.get('/:id',validateId,notesController.getNoteById);
router.post('/',validateNotePost,notesController.createNote);
router.put('/:id',validateId,validateNotePut,notesController.updateNote);
router.delete('/:id',validateId,notesController.deleteNote);


module.exports=router;