import type { Note } from '../types/note';

interface NoteCardProps {
  note: Note;
  onUpdate: (note: Note) => void;
  onDelete: (note: Note) => void;
}

function NoteCard({ note, onUpdate, onDelete }: NoteCardProps) {
  const onUpdateClick = () => {
    onUpdate(note);
  }

  const onDeleteClick = () => {
    onDelete(note);
  }

  return (
    <div className="min-h-80 bg-card rounded-2xl shadow-sm transition-shadow p-6 flex flex-col">
      <h2 className="text-2xl mb-2">{note.title}</h2>
      <p className="flex-1 text-text-secondary">{note.text}</p>
      <div className='flex justify-between w-full mt-2'>
        <div className='flex-1 flex'>
          <button 
            onClick={onUpdateClick}
            className="
              h-full px-2 
              rounded-md
              text-muted bg-transparent 
              hover:text-muted-light transform duration-200
              active:scale-98 cursor-pointer
            "
          >
            Edit
          </button>
          <button 
            onClick={onDeleteClick}
            className="
              h-full px-2 
              rounded-md
              text-danger bg-transparent 
              hover:text-danger-hover transform duration-200
              active:scale-98 cursor-pointer
            "
          >
            Delete
          </button>
        </div>
        <div>{note.date.toLocaleDateString("uk-UA")}</div>
      </div>
    </div>
  );
}

export default NoteCard;