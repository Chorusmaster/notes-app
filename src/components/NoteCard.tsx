import type { Note } from '../types/note';

function NoteCard(props: {note: Note}) {
  return (
    <div className="min-h-80 bg-card rounded-2xl shadow-sm transition-shadow p-6 flex flex-col">
      <h2 className="text-2xl mb-2">{props.note.title}</h2>
      <p className="flex-1 text-text-secondary">{props.note.text}</p>
      <p className="w-full flex justify-end">{props.note.date.toLocaleDateString("uk-UA")}</p>
    </div>
  );
}

export default NoteCard;