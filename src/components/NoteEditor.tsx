import { useState } from "react";
import type { Note } from "../types/note";

interface NoteEditorProps {
  onClick: (note: Note) => void
};

function NoteEditor({ onClick }: NoteEditorProps) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  }

  const handleTextChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setText(e.target.value);
  }

  return (
    <div className="min-h-80 bg-card rounded-2xl shadow-sm transition-shadow p-6 flex flex-col">
      <label htmlFor="title">Title</label>
      <input 
        name="title" 
        id="title" 
        type="text" 
        value={title} 
        onChange={(e) => handleTitleChange(e)}
        className="
          border border-border rounded-lg 
          mt-1 mb-4 h-8 p-2 
          focus:outline-none focus:ring-1 focus:ring-primary/40
        ">
      </input>

      <label htmlFor="text">Text</label>
      <textarea 
        name="text" 
        id="text" 
        value={text} 
        onChange={(e) => handleTextChange(e)}
        className="
          border border-border rounded-lg 
          flex-1 
          mt-1 mb-4 p-2 
          focus:outline-none focus:ring-1 focus:ring-primary/40
        ">
      </textarea>

      <div className="w-full flex justify-end">
        <button 
          onClick={() => onClick({title, text, date: new Date()})}
          className="
            rounded-lg 
            bg-secondary hover:bg-secondary-hover transition 
            text-on-primary 
            w-20 h-8 
            active:scale-98 cursor-pointer
        ">
          Ok
        </button>
      </div>
    </div>
  );
}

export default NoteEditor;