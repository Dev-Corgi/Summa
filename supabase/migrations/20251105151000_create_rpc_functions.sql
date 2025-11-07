-- Function to get distinct categories from the books table
CREATE OR REPLACE FUNCTION get_distinct_categories()
RETURNS TABLE(category TEXT)
LANGUAGE sql
AS $$
    SELECT DISTINCT category FROM public.summaries ORDER BY category;
$$;

-- Function to increment the view count for a book
CREATE OR REPLACE FUNCTION increment_view_count(book_id_param uuid)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO public.book_stats (book_id, view_count)
    VALUES (book_id_param, 1)
    ON CONFLICT (book_id)
    DO UPDATE SET view_count = book_stats.view_count + 1;
END;
$$;

-- Function to increment the completion count for a book
CREATE OR REPLACE FUNCTION increment_completion_count(book_id_param uuid)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO public.book_stats (book_id, completion_count)
    VALUES (book_id_param, 1)
    ON CONFLICT (book_id)
    DO UPDATE SET completion_count = book_stats.completion_count + 1;
END;
$$;

-- Function to increment the save count for a book
CREATE OR REPLACE FUNCTION increment_save_count(book_id_param uuid)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO public.book_stats (book_id, save_count)
    VALUES (book_id_param, 1)
    ON CONFLICT (book_id)
    DO UPDATE SET save_count = book_stats.save_count + 1;
END;
$$;
