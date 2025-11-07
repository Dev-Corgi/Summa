// This file will be populated by the Supabase CLI
// npx supabase gen types typescript --project-id <your-project-id> > types/database.ts

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      // We'll add the tables here as we define them, or let the CLI do it.
      books: {
        Row: {}; // The data expected to be returned from a "select"
        Insert: {}; // The data expected passed to an "insert"
        Update: {}; // The data expected passed to an "update"
      };
      user_library: {
        Row: {};
        Insert: {};
        Update: {};
      };
      reading_progress: {
        Row: {};
        Insert: {};
        Update: {};
      };
      highlights: {
        Row: {};
        Insert: {};
        Update: {};
      };
      book_stats: {
        Row: {};
        Insert: {};
        Update: {};
      };
    };
    Views: {
      // ...
    };
    Functions: {
      // ...
    };
  };
}
