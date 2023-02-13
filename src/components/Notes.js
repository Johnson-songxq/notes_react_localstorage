import Note from "./Note";
import "../css/Note.css";
import CreateNote from "./CreateNote";
import { useEffect, useState } from "react";
// import { v4 as uuid } from "uuid";
import uuid from "react-uuid";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [inputText, setInputText] = useState("");

  const textHandler = (e) => {
    setInputText(e.target.value);
  };

  const saveHandler = () => {
    setNotes((prevState) => [
      ...prevState,
      {
        id: uuid(),
        text: inputText,
      },
    ]);

    setInputText("");
  };

  const deleteNote = (id) => {
    const filterdNotes = notes.filter((note) => note.id !== id);
    setNotes(filterdNotes);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Notes"));
    if (data && data.length > 0) {
      setNotes(data);
    }
  }, []);

  useEffect(() => {
    //saving data to local storage
    localStorage.setItem("Notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="notes">
      {notes.map((note) => (
        <Note
          key={note.id}
          text={note.text}
          id={note.id}
          deleteNote={deleteNote}
        />
      ))}

      <CreateNote
        textHandler={textHandler}
        inputText={inputText}
        saveHandler={saveHandler}
      />
    </div>
  );
}

export default Notes;
