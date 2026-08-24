import { useState } from "react";

import type { Note } from "../types/note";
import type { AddNoteResponse } from "../types/responce";
import { isCategory, type Category } from "../models/categories.ts";

import { CATEGORIES } from "../models/categories.ts";

interface NoteEditorProps {
  note?: Note;
  onSave: (note: Note) => Promise<AddNoteResponse> | Promise<void>;
  onCancel: () => void
};

function NoteEditor({ note, onSave, onCancel }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title ?? "");
  const [text, setText] = useState(note?.text ??"");
  const [titleError, setTitleError] = useState("");
  const [category, setCategory] = useState<Category>(CATEGORIES[0].value);

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
    setTitleError("")
  }

  const handleTextChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setText(e.target.value);
  }

  const handleCategoryChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    if(isCategory(e.target.value)) setCategory(e.target.value);
  }

  const save = async () => {
    const result = await onSave({
      id: note?.id ?? crypto.randomUUID(),
      category,
      title, 
      text, 
      date: note?.date ?? new Date()
    });
    if (result && !result.success) setTitleError(result.error);
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
          mt-1 h-8 p-2 
          focus:outline-none focus:ring-1 focus:ring-primary/40
        ">
      </input>
      {titleError && (
        <p className="mt-1 text-sm text-danger">
          {titleError}
        </p>
      )}

      <label htmlFor="text">Text</label>
      <textarea 
        name="text" 
        id="text" 
        value={text} 
        onChange={(e) => handleTextChange(e)}
        className="
          border border-border rounded-lg 
          flex-1 
          mt-1 my-4 p-2 
          focus:outline-none focus:ring-1 focus:ring-primary/40
        ">
      </textarea>

      <div className="w-full flex justify-between">
        <select 
          value={category}
          onChange={handleCategoryChange}
          className="
            rounded-md 
            w-24 h-8 border-2
            border-muted-light text-muted
            cursor-pointer
            focus:outline-none focus:ring-1 focus:ring-primary/40
          "
        >
          {CATEGORIES.map(({value, label}) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <div className="flex gap-2">
          <button 
            onClick={() => onCancel()}
            className="
              rounded-lg 
              w-20 h-8 border-2
              border-muted-light text-muted
              hover:border-muted-light/60 hover:text-muted/60 transform duration-200
              active:scale-98 cursor-pointer
          ">
            Cancel
          </button>

          <button 
            onClick={save}
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
    </div>
  );
}

export default NoteEditor;