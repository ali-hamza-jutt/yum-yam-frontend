import React, { useState, useEffect } from 'react';
import './TextEditor.css';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';


const TextEditor = () => {
  const [notes, setNotes] = useState([]);
  const [editorContent, setEditorContent] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // Index of the note being edited

  useEffect(() => {
    // Load saved notes from local storage on component mount
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  const handleChange = (event) => {
    setEditorContent(event.target.value);
  };

  const handleSave = () => {
    if (editIndex !== null) {
      // Update existing note
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = editorContent;
      setNotes(updatedNotes);
      setEditIndex(null);
    } else {
      // Save new note
      const newNotes = [...notes, editorContent];
      setNotes(newNotes);
    }
    localStorage.setItem('notes', JSON.stringify(notes));
    setEditorContent('');
    setIsEditable(false);
  };

  const handleAddNote = () => {
    setIsEditable(true);
    setEditorContent('');
    setEditIndex(null); // Reset edit mode
  };

  const handleCancel=()=>{
    setIsEditable(false);
  }

  const handleEditNote = (index) => {
    setIsEditable(true);
    setEditorContent(notes[index]);
    setEditIndex(index);
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  return (
    <div className="text-editor">
      <div className="text-editor-header">
        <h2>Notes</h2>
        <button className='add-note-button' onClick={handleAddNote}>
          <NoteAddOutlinedIcon style={{ margin: '5px', color: '#3a9691' }} />
          Add Note
        </button>
      </div>

      {!notes.length && !isEditable ? (
        <div className="empty-placeholder">
          <NoteAltOutlinedIcon style={{height:'142px',width:'142px',stroke:1}}/>
          <p className="placeholder-title">Jot is Down</p>
          <p className="placeholder-text">
            Got an idea, reminder, or some inspiration? Save a private note
            here for next time.
          </p>
        </div>
      ) : (
        <>
          {!notes.length || isEditable ? (
            <textarea
              value={editorContent}
              onChange={handleChange}
              rows="10"
              cols="50"
              placeholder="Write your notes here..."
              style={{ resize: 'none' }}
              disabled={!isEditable}
            />
          ) : (
            <div className="notes-list">
              {notes.map((note, index) => (
                <div key={index} className="note-item">
                  <p>{note}</p>
                  <div className="note-actions">
                    <button className='edit-delete' onClick={() => handleEditNote(index)}>
                      <EditOutlinedIcon />
                    </button>
                    <button  className='edit-delete' onClick={() => handleDeleteNote(index)}>
                      <DeleteOutlineOutlinedIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
         <div className="buttons">
  {isEditable && (
    <>
      <button onClick={handleSave}>
        {editIndex !== null ? 'Edit' : 'Save'}
      </button>
      <button onClick={handleCancel}>Cancel</button>
    </>
  )}
</div>
        </>
      )}
    </div>
  );
};

export default TextEditor;
