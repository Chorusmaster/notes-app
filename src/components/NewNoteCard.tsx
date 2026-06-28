interface NewNoteCardProps {
  onClick: () => void
}

function NewNoteCard({ onClick }: NewNoteCardProps) {
  return (
    <button
      onClick={onClick}
      className="
      min-h-80 rounded-2xl border-2 border-dashed text-2xl cursor-pointer
      border-primary text-primary bg-transparent
      hover:border-secondary hover:text-secondary hover:bg-gradient-primary-soft
      transition duration-300 ease-in-out
    "
    >
      <span className="font-medium">+</span> New note
    </button>   
  );
}

export default NewNoteCard;