import { supabase } from "../lib/supabase";
import { Note } from "../types/note";

export const notesService = {
  async getNotes() {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async createNote(note: Partial<Note>) {
    const { data, error } = await supabase
      .from("notes")
      .insert([note])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateNote(id: string, updates: Partial<Note>) {
    const { data, error } = await supabase
      .from("notes")
      .update(updates)
      .match({ id })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteNote(id: string) {
    const { error } = await supabase.from("notes").delete().match({ id });

    if (error) throw error;
  },
};
