DROP FUNCTION IF EXISTS public.get_recent_unfinished_books(p_user_id uuid);

CREATE OR REPLACE FUNCTION public.get_recent_unfinished_books(p_user_id uuid)
RETURNS TABLE(
    book_id uuid,
    title text,
    authors text[],
    chapters jsonb,
    chapter_index integer,
    last_read_at timestamptz
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        b.id AS book_id,
        b.title,
        b.authors,
        b.chapters,
        rp.chapter_index,
        rp.last_read_at
    FROM
        public.reading_progress AS rp
    JOIN
        public.books AS b ON rp.book_id = b.id
    WHERE
        rp.user_id = p_user_id AND rp.completed = false
    ORDER BY
        rp.last_read_at DESC
    LIMIT 4;
END;
$$;
