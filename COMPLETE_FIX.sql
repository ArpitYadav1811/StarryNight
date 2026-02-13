-- ============================================
-- COMPLETE FIX: Recreate Table & Insert Data
-- ============================================
-- Copy and paste this ENTIRE script into SQL Editor
-- Then click "Run"

-- Step 1: Drop existing table (WARNING: This deletes all data!)
-- Uncomment the next line ONLY if you want to start fresh
-- DROP TABLE IF EXISTS memories CASCADE;

-- Step 2: Create table with CORRECT schema
CREATE TABLE IF NOT EXISTS memories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  real_image_url TEXT NOT NULL,
  ghibli_image_url TEXT NOT NULL,
  caption TEXT,
  category TEXT DEFAULT 'adventure',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 3: Enable Row Level Security
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;

-- Step 4: Drop existing policy if it exists
DROP POLICY IF EXISTS "Allow public read access on memories" ON memories;

-- Step 5: Create public read policy
CREATE POLICY "Allow public read access on memories"
  ON memories FOR SELECT
  USING (true);

-- Step 6: Clear any existing data (optional - uncomment if needed)
-- DELETE FROM memories;

-- Step 7: Insert your 6 memories
INSERT INTO memories (real_image_url, ghibli_image_url, caption, category) VALUES
  ('https://hbrnpnjcomejtgdcbnsy.supabase.co/storage/v1/object/public/private/WhatsApp%20Image%202026-02-13%20at%2010.07.48%20PM.jpeg', 'https://hbrnpnjcomejtgdcbnsy.supabase.co/storage/v1/object/public/private/Gemini_Generated_Image_loza1jloza1jloza.png', 'Sunset Dreams - Where the sky meets the heart', 'adventure'),
  ('https://hbrnpnjcomejtgdcbnsy.supabase.co/storage/v1/object/public/private/WhatsApp%20Image%202026-02-13%20at%2010.07.49%20PM.jpeg', 'https://hbrnpnjcomejtgdcbnsy.supabase.co/storage/v1/object/public/private/Gemini_Generated_Image_zelzy5zelzy5zelz.png', 'Garden of Love - Blooming with affection', 'adventure'),
  ('https://hbrnpnjcomejtgdcbnsy.supabase.co/storage/v1/object/public/private/WhatsApp%20Image%202026-02-13%20at%209.57.43%20PM.jpeg', 'https://hbrnpnjcomejtgdcbnsy.supabase.co/storage/v1/object/public/private/WhatsApp%20Image%202026-02-13%20at%209.57.44%20PM%20(1).jpeg', 'Starry Nights - Under the same stars', 'adventure'),
  ('https://hbrnpnjcomejtgdcbnsy.supabase.co/storage/v1/object/public/private/WhatsApp%20Image%202026-02-13%20at%209.57.44%20PM%20(2).jpeg', 'https://hbrnpnjcomejtgdcbnsy.supabase.co/storage/v1/object/public/private/WhatsApp%20Image%202026-02-13%20at%209.57.44%20PM.jpeg', 'Ocean Whispers - Tales of the deep blue', 'adventure'),
  ('https://hbrnpnjcomejtgdcbnsy.supabase.co/storage/v1/object/public/private/WhatsApp%20Image%202026-02-13%20at%209.57.45%20PM%20(1).jpeg', 'https://hbrnpnjcomejtgdcbnsy.supabase.co/storage/v1/object/public/private/WhatsApp%20Image%202026-02-13%20at%209.57.45%20PM%20(2).jpeg', 'Morning Coffee - Our favorite moments together', 'adventure'),
  ('https://hbrnpnjcomejtgdcbnsy.supabase.co/storage/v1/object/public/private/WhatsApp%20Image%202026-02-13%20at%209.57.45%20PM.jpeg', 'https://hbrnpnjcomejtgdcbnsy.supabase.co/storage/v1/object/public/private/WhatsApp%20Image%202026-02-13%20at%209.57.46%20PM.jpeg', 'Beautiful Moments Together', 'adventure');

-- Step 8: Verify the data
SELECT COUNT(*) as total_memories FROM memories;
-- Should return: 6

-- Step 9: Test read access
SELECT id, real_image_url, ghibli_image_url, caption FROM memories LIMIT 1;
-- Should return: 1 row with your data
