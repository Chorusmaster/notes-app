import { useState } from 'react';
import type { Note } from './types/note.ts';

import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import CategoryTabs from './components/CategoryTabs';

import NoteCard from './components/NoteCard';
import NewNoteCard from './components/NewNoteCard';
import NoteEditor from './components/NoteEditor';

import Footer from './components/Footer';

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = (note: Note) => {
    setNotes(prev => [...prev, note]);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <header className="bg-surface-elevated">
        <div className="w-full flex flex-col items-center pt-20 px-4">
          <h1 className="text-6xl sm:text-7xl inline-block pb-4 font-semibold bg-gradient-primary bg-clip-text text-transparent">
            Notes App
          </h1>
          <SearchBar />
        </div>

        <CategoryTabs />
      </header>

      <main className="flex-1 bg-surface">
        <div className="h-full px-4 sm:px-8 lg:px-16 py-18 grid gap-12 grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]">
          {isEditing ? 
            <NoteEditor onClick={(note: Note) => {addNote(note); setIsEditing(false)}} /> : 
            <NewNoteCard onClick={() => setIsEditing(true)} />
          }
          {notes.map(note => (
            <NoteCard note={note} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
