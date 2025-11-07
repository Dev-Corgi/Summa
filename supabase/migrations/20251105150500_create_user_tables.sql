-- Create user_library table
CREATE TABLE public.user_library (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    book_id uuid NOT NULL REFERENCES public.summaries(id) ON DELETE CASCADE,
    added_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    UNIQUE(user_id, book_id)
);
COMMENT ON TABLE public.user_library IS 'Stores books saved by users to their personal library.';

-- Create reading_progress table
CREATE TABLE public.reading_progress (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    book_id uuid NOT NULL REFERENCES public.summaries(id) ON DELETE CASCADE,
    chapter_index INTEGER,
    completed BOOLEAN DEFAULT false,
    last_read_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    reading_time_seconds INTEGER DEFAULT 0,
    UNIQUE(user_id, book_id)
);
COMMENT ON TABLE public.reading_progress IS 'Tracks user reading progress for each book.';

-- Create highlights table
CREATE TABLE public.highlights (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    book_id uuid NOT NULL REFERENCES public.summaries(id) ON DELETE CASCADE,
    chapter_index INTEGER,
    highlighted_text TEXT NOT NULL,
    note TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
COMMENT ON TABLE public.highlights IS 'Stores user highlights and notes for books.';

-- Create book_stats table
CREATE TABLE public.book_stats (
    book_id uuid PRIMARY KEY REFERENCES public.summaries(id) ON DELETE CASCADE,
    view_count INTEGER DEFAULT 0,
    save_count INTEGER DEFAULT 0,
    completion_count INTEGER DEFAULT 0,
    average_reading_time INTEGER,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
COMMENT ON TABLE public.book_stats IS 'Stores statistics for each book, like view and save counts.';

-- RLS Policies for user-specific tables
ALTER TABLE public.user_library ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own library." ON public.user_library
    FOR ALL USING (auth.uid() = user_id);

ALTER TABLE public.reading_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own reading progress." ON public.reading_progress
    FOR ALL USING (auth.uid() = user_id);

ALTER TABLE public.highlights ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own highlights." ON public.highlights
    FOR ALL USING (auth.uid() = user_id);

-- book_stats is public, so no RLS is needed unless specific requirements arise.
