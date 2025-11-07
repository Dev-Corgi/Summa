CREATE OR REPLACE FUNCTION get_recent_unfinished_books(p_user_id uuid)
RETURNS TABLE (
  book_id uuid,
  title text,
  authors text[],
  summary_chapters jsonb,
  chapter_index integer,
  last_read_at timestamptz
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    s.id as book_id,
    s.title,
    s.authors,
    s.summary_chapters,
    rp.chapter_index,
    rp.last_read_at
  FROM
    public.reading_progress AS rp
  JOIN
    public.summaries AS s ON rp.book_id = s.id
  WHERE
    rp.user_id = p_user_id
    AND rp.completed = false
  ORDER BY
    rp.last_read_at DESC
  LIMIT 4;
END;
$$ LANGUAGE plpgsql;