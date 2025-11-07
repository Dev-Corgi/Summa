-- Rename the table
ALTER TABLE public.summaries RENAME TO books;

-- Rename columns in the newly named 'books' table
ALTER TABLE public.books RENAME COLUMN summary_introduction TO introduction;
ALTER TABLE public.books RENAME COLUMN summary_chapters TO chapters;
ALTER TABLE public.books RENAME COLUMN summary_conclusion TO conclusion;

-- Rename constraints for clarity and consistency
ALTER TABLE public.books RENAME CONSTRAINT summaries_pkey TO books_pkey;
ALTER TABLE public.books RENAME CONSTRAINT summaries_openlibrary_id_key TO books_openlibrary_id_key;

-- Drop old foreign key constraints from other tables
ALTER TABLE public.book_stats DROP CONSTRAINT book_stats_book_id_fkey;
ALTER TABLE public.reading_progress DROP CONSTRAINT reading_progress_book_id_fkey;
ALTER TABLE public.user_library DROP CONSTRAINT user_library_book_id_fkey;

-- Add new foreign key constraints pointing to the 'books' table
ALTER TABLE public.book_stats ADD CONSTRAINT book_stats_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id);
ALTER TABLE public.reading_progress ADD CONSTRAINT reading_progress_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id);
ALTER TABLE public.user_library ADD CONSTRAINT user_library_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id);
