import { useState, useMemo, useEffect } from "react";

import type { Note, NoteResponse } from "./types/note.ts";
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

import { api } from "./api/api.ts";

function App() {
  const [editedNote, setEditedNote] = useState<null | Note | "new">(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchString, setSearchString] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [isRegistered, setIsRegistered] = useState(true);

  useEffect(() => {
    const checkRegistration = async () => {
      try {
        await api.get("/auth/me");
        setIsRegistered(true);
      } catch {
        setIsRegistered(false);
      }
    };

    const loadTasks = async () => {
      try {
        const response = await api.get<NoteResponse[]>("/notes");
        const fetchedNotes: NoteResponse[] = response.data;

        const notes = fetchedNotes.map((note) => ({
          id: note._id,
          category: note.category,
          title: note.title,
          text: note.text,
          date: new Date(note.date),
        }));

        setNotes(notes);
      } catch {
        setNotes([]);
      }
    };

    checkRegistration();
    loadTasks();
  }, []);

  const logout = async () => {
    try {
      await api.post("/logout");
      setIsRegistered(false);
    } catch {
      setIsRegistered(true);
    }
  };

  const addNote = async (note: Note): Promise<AddNoteResponse> => {
    if (!note.title) {
      return { success: false, error: "Title must not be empty" };
    }
    if (notes.some((n) => n.title == note.title)) {
      return { success: false, error: "Title must be unique" };
    }

    try {
      const result = await api.post("/notes", note);
      const createdNote = {
        ...note,
        id: result.data.id,
      };
      setNotes((prev) => [...prev, createdNote]);
      setEditedNote(null);
      return { success: true };
    } catch {
      return { success: false, error: "Something went wrong" };
    }
  };

  const updateNote = async (updated: Note): Promise<void> => {
    try {
      await api.put(`/notes/${updated.id}`, updated);
      setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
      setEditedNote(null);
    } catch {
      console.error("Something went wrong");
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch {
      console.error("Something went wrong");
    }
  };

  const closeNoteEditor = () => {
    setEditedNote(null);
  };

  /** Sorts notes array by date */
  const sortNotes = (notesList: Note[]) => {
    return notesList.toSorted((a, b) => b.date.getTime() - a.date.getTime());
  };

  /** Filters notes array by active tab (category) */
  const filterNotesByTab = (notesList: Note[], tab: Tab) => {
    if (tab === "all") return notesList;
    return notesList.filter((n) => n.category === tab);
  };

  /** Filters notes array by search string */
  const searchNotes = (notesList: Note[], searchStr: string) => {
    const searchStrLower = searchStr.trim().toLowerCase();
    if (!searchStrLower) return notesList;

    return notesList.filter(
      (n) =>
        n.title.toLowerCase().includes(searchStrLower) ||
        n.text.toLowerCase().includes(searchStrLower),
    );
  };

  /** Notes filtered by search string, category and sorted by date */
  const processedNotes = useMemo(
    () =>
      sortNotes(filterNotesByTab(searchNotes(notes, searchString), activeTab)),
    [notes, searchString, activeTab],
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isRegistered={isRegistered} logOut={logout} />

      {isRegistered ? (
        <>
          <header className="bg-surface-elevated">
            <div className="w-full flex flex-col items-center pt-20 px-4">
              <h1 className="text-6xl sm:text-7xl inline-block pb-4 font-semibold bg-gradient-primary bg-clip-text text-transparent">
                Notes App
              </h1>
              <SearchBar
                value={searchString}
                onChange={(value: string) => setSearchString(value)}
              />
            </div>

            <CategoryTabs
              activeTab={activeTab}
              switchTab={(tab) => setActiveTab(tab)}
            />
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
      ) : (
        <RegistrationPanel closeForm={() => setIsRegistered(true)} />
      )}

      <Footer />
    </div>
  );
}

export default App;
