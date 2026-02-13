-- Create memories table for Gallery section
CREATE TABLE IF NOT EXISTS memories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  phone_photo_url TEXT NOT NULL,
  ghibli_edit_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create vault table for Message Vault section
CREATE TABLE IF NOT EXISTS vault (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  open_when TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create puzzles table for Puzzles section
CREATE TABLE IF NOT EXISTS puzzles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  hashed_answer TEXT NOT NULL,
  artwork_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE vault ENABLE ROW LEVEL SECURITY;
ALTER TABLE puzzles ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access
-- You can modify these policies based on your security requirements
CREATE POLICY "Allow public read access on memories"
  ON memories FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access on vault"
  ON vault FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access on puzzles"
  ON puzzles FOR SELECT
  USING (true);

-- Optional: Insert sample data
INSERT INTO memories (title, description, phone_photo_url, ghibli_edit_url) VALUES
  ('Sunset Dreams', 'Where the sky meets the heart', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'),
  ('Garden of Love', 'Blooming with affection', 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800', 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800'),
  ('Starry Nights', 'Under the same stars', 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800', 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800'),
  ('Ocean Whispers', 'Tales of the deep blue', 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800', 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800');

INSERT INTO vault (open_when, message) VALUES
  ('you need a smile', 'You are loved more than you know. Your smile lights up the world, and I''m so grateful to be a part of your life.'),
  ('you''re feeling down', 'Remember that tough times don''t last, but tough people do. You''re one of the strongest people I know, and I believe in you completely.'),
  ('you miss me', 'I''m thinking of you too, always. Distance means nothing when someone means everything. You''re in my heart, no matter where we are.');

-- Insert sample puzzles
-- Note: You'll need to hash your actual answers using SHA-256
-- The hashed_answer values below are examples. Replace them with your actual hashed answers.
-- You can use an online SHA-256 hash tool or the hashString function in lib/hash.ts
INSERT INTO puzzles (question, hashed_answer, artwork_url) VALUES
  ('What grows stronger with time?', '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae', ''),
  ('Invisible but always felt?', '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae', ''),
  ('Connects two souls forever?', '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae', '');
