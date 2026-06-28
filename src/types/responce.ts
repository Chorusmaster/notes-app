export type AddNoteResponse = 
  | {success: true}
  | {success: false; error: string}