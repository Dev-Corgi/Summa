-- Create the collections table
CREATE TABLE public.collections (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    title text NOT NULL,
    description text,
    image_type text DEFAULT 'stack'::text,
    curator text,
    CONSTRAINT collections_pkey PRIMARY KEY (id)
);

-- Create the collection_items table to link books to collections
CREATE TABLE public.collection_items (
    collection_id uuid NOT NULL,
    book_id uuid NOT NULL,
    "position" integer,
    CONSTRAINT collection_items_pkey PRIMARY KEY (collection_id, book_id),
    CONSTRAINT collection_items_collection_id_fkey FOREIGN KEY (collection_id) REFERENCES public.collections(id) ON DELETE CASCADE,
    CONSTRAINT collection_items_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id) ON DELETE CASCADE
);

-- Enable RLS for the new tables
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collection_items ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access
CREATE POLICY "Allow public read access to collections" ON public.collections FOR SELECT USING (true);
CREATE POLICY "Allow public read access to collection items" ON public.collection_items FOR SELECT USING (true);
