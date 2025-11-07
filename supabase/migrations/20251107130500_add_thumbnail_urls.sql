-- Add thumbnail_url column to books table
ALTER TABLE public.books ADD COLUMN thumbnail_url text;

-- Add thumbnail_url column to collections table
ALTER TABLE public.collections ADD COLUMN thumbnail_url text;
