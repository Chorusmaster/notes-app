import type { Tab } from "../models/tabs"

export interface Note {
  id: string,
  category: Tab,
  title: string,
  text: string,
  date: Date
};

export interface NoteResponse {
  _id: string,
  category: Tab,
  title: string,
  text: string,
  date: string
};