import { useEffect, useState } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css"
function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);
  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((error) => alert(error));
  };
  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status == 204) alert("note was deleted");
        else alert("Note deleted");
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status == 201) alert("note is created");
        else alert("failed");
        getNotes();
      })
      .catch((err) => alert(err));
  };
  return (
    <div>
      <div>
        <h2>Write Your Notes Here</h2>
        <h3>Your Notes</h3>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
        <br />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          name="content"
          id="content"
          required
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
export default Home;
