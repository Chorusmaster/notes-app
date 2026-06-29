import { useState, useMemo } from "react";

import type { Note } from "./types/note.ts";
import type { AddNoteResponse } from "./types/responce.ts";

import type { Tab } from "./models/tabs.ts";

import RegistrationPanel from "./components/RegistrationPanel.tsx";

import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import CategoryTabs from "./components/CategoryTabs";

import NoteCard from "./components/NoteCard";
import NewNoteCard from "./components/NewNoteCard";
import NoteEditor from "./components/NoteEditor";

import Footer from "./components/Footer";

function App() {
  const [editedNote, setEditedNote] = useState<null | Note | "new">(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchString, setSearchString] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [isRegistered, setIsRegistered] = useState(true);

  const addNote = (note: Note): AddNoteResponse => {
    if (!note.title) {
      return { success: false, error: "Title must not be empty" };
    }
    if (notes.some((n) => n.title == note.title)) {
      return { success: false, error: "Title must be unique" };
    }

    setNotes((prev) => [...prev, note]);
    setEditedNote(null);
    return { success: true };
  };

  const updateNote = (updated: Note): void => {
    setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
    setEditedNote(null);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const closeNoteEditor = () => {
    setEditedNote(null);
  };

  /** Sorts notes array by date */
  const sortNotes = (notesList: Note[]) => {
    return notesList.toSorted((a, b) => b.date.getTime()-a.date.getTime());
  }

  /** Filters notes array by active tab (category) */
  const filterNotesByTab = (notesList: Note[], tab: Tab) => {
    if (tab === "all") return notesList;
    return notesList.filter(n => n.category === tab);
  }

  /** Filters notes array by search string */
  const searchNotes = (notesList: Note[], searchStr: string) => {
    const searchStrLower = searchStr.trim().toLowerCase();
    if (!searchStrLower) return notesList;

    return notesList.filter(
      (n) => 
        n.title.toLowerCase().includes(searchStrLower) 
        || n.text.toLowerCase().includes(searchStrLower)
    );
  }

  /** Notes filtered by search string, category and sorted by date */
  const processedNotes = useMemo(
    () => sortNotes(
      filterNotesByTab(
        searchNotes(notes, searchString), 
      activeTab)
    ), 
    [notes, searchString, activeTab]
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isRegistered={isRegistered} logOut={() => setIsRegistered(false)} />

      {
        isRegistered ?
        (<>
          <header className="bg-surface-elevated">
            <div className="w-full flex flex-col items-center pt-20 px-4">
              <h1 className="text-6xl sm:text-7xl inline-block pb-4 font-semibold bg-gradient-primary bg-clip-text text-transparent">
                Notes App
              </h1>
              <SearchBar value={searchString} onChange={(value: string) => setSearchString(value)} />
            </div>

            <CategoryTabs activeTab={activeTab} switchTab={(tab) => setActiveTab(tab)} />
          </header>

          <main className="flex-1 bg-surface">
            <div className="h-full px-4 sm:px-8 lg:px-16 py-18 grid gap-12 grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]">
              {editedNote == "new" ? (
                <NoteEditor
                  onSave={(note: Note) => addNote(note)}
                  onCancel={closeNoteEditor}
                />
              ) : (
                <NewNoteCard onClick={() => setEditedNote("new")} />
              )}
              {processedNotes.map((note) =>
                editedNote !== null &&
                editedNote !== "new" &&
                note.id == editedNote?.id ? (
                  <NoteEditor
                    key={note.id}
                    note={editedNote}
                    onSave={(note: Note) => updateNote(note)}
                    onCancel={closeNoteEditor}
                  />
                ) : (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onUpdate={() => setEditedNote(note)}
                    onDelete={() => deleteNote(note.id)}
                  />
                ),
              )}
            </div>
          </main>
          </>
        ) :
        (
          <RegistrationPanel />
        )
      }

      <Footer />
    </div>
  );
}

export default App;
