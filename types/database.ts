export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      book_stats: {
        Row: {
          average_reading_time: number | null
          book_id: string
          completion_count: number | null
          save_count: number | null
          updated_at: string
          view_count: number | null
        }
        Insert: {
          average_reading_time?: number | null
          book_id: string
          completion_count?: number | null
          save_count?: number | null
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          average_reading_time?: number | null
          book_id?: string
          completion_count?: number | null
          save_count?: number | null
          updated_at?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "book_stats_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: true
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      books: {
        Row: {
          author_bio: string | null
          authors: string[] | null
          category: string | null
          chapters: Json | null
          conclusion: string | null
          created_at: string
          fts: unknown
          generated_at: string | null
          id: string
          introduction: string | null
          isbn: string | null
          openlibrary_id: string
          published_year: number | null
          short_description: string | null
          thumbnail_url: string | null
          title: string
        }
        Insert: {
          author_bio?: string | null
          authors?: string[] | null
          category?: string | null
          chapters?: Json | null
          conclusion?: string | null
          created_at?: string
          fts?: unknown
          generated_at?: string | null
          id?: string
          introduction?: string | null
          isbn?: string | null
          openlibrary_id: string
          published_year?: number | null
          thumbnail_url?: string | null
          title: string
        }
        Update: {
          author_bio?: string | null
          authors?: string[] | null
          category?: string | null
          chapters?: Json | null
          conclusion?: string | null
          created_at?: string
          generated_at?: string | null
          id?: string
          introduction?: string | null
          isbn?: string | null
          openlibrary_id?: string
          published_year?: number | null
          thumbnail_url?: string | null
          title?: string
        }
        Relationships: []
      }
      collection_items: {
        Row: {
          book_id: string
          collection_id: string
          position: number | null
        }
        Insert: {
          book_id: string
          collection_id: string
          position?: number | null
        }
        Update: {
          book_id?: string
          collection_id?: string
          position?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "collection_items_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_items_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
        ]
      }
      collections: {
        Row: {
          categories: string[] | null
          curator: string | null
          description: string | null
          fts: unknown
          id: string
          image_type: string | null
          short_description: string | null
          thumbnail_url: string | null
          title: string
        }
        Insert: {
          categories?: string[] | null
          curator?: string | null
          description?: string | null
          id?: string
          image_type?: string | null
          short_description?: string | null
          thumbnail_url?: string | null
          title: string
        }
        Update: {
          categories?: string[] | null
          curator?: string | null
          description?: string | null
          id?: string
          image_type?: string | null
          short_description?: string | null
          thumbnail_url?: string | null
          title?: string
        }
        Relationships: []
      }
      reading_progress: {
        Row: {
          book_id: string
          chapter_index: number | null
          completed: boolean | null
          id: string
          last_read_at: string
          reading_time_seconds: number | null
          user_id: string
        }
        Insert: {
          book_id: string
          chapter_index?: number | null
          completed?: boolean | null
          id?: string
          last_read_at?: string
          reading_time_seconds?: number | null
          user_id: string
        }
        Update: {
          book_id?: string
          chapter_index?: number | null
          completed?: boolean | null
          id?: string
          last_read_at?: string
          reading_time_seconds?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reading_progress_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      user_library: {
        Row: {
          added_at: string
          book_id: string
          id: string
          user_id: string
        }
        Insert: {
          added_at?: string
          book_id: string
          id?: string
          user_id: string
        }
        Update: {
          added_at?: string
          book_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_library_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_distinct_categories: {
        Args: never
        Returns: {
          category: string
        }[]
      }
      get_recent_unfinished_books: {
        Args: { p_user_id: string }
        Returns: {
          authors: string[]
          book_id: string
          chapter_index: number
          chapters: Json
          last_read_at: string
          thumbnail_url: string
          title: string
        }[]
      }
      increment_completion_count: {
        Args: { book_id_param: string }
        Returns: undefined
      }
      increment_save_count: {
        Args: { book_id_param: string }
        Returns: undefined
      }
      increment_view_count: {
        Args: { book_id_param: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
