# How to Import CSV Files into Supabase

## 📋 Step-by-Step Guide

### Step 1: Prepare Your CSV Files

The CSV files are located in the `demo-data/` folder:
- `memories.csv` - Gallery memories
- `vault.csv` - Vault messages
- `puzzles.csv` - Puzzle questions

### Step 2: Import into Supabase

#### Option A: Using Supabase Dashboard (Recommended)

1. **Go to Supabase Dashboard**
   - Navigate to [https://app.supabase.com](https://app.supabase.com)
   - Select your project

2. **Open Table Editor**
   - Click on **Table Editor** in the left sidebar
   - Select the table you want to import data into (e.g., `memories`, `vault`, or `puzzles`)

3. **Import CSV**
   - Click the **Insert** button (or the three dots menu)
   - Select **Import data from CSV**
   - Choose your CSV file
   - Map the columns (Supabase should auto-detect them)
   - Click **Import**

4. **Repeat for Each Table**
   - Import `memories.csv` into the `memories` table
   - Import `vault.csv` into the `vault` table
   - Import `puzzles.csv` into the `puzzles` table

#### Option B: Using SQL Editor

1. **Go to SQL Editor**
   - Click on **SQL Editor** in the left sidebar
   - Click **New query**

2. **Use INSERT Statements**

For each table, you can copy and paste the SQL below:

**Memories:**
```sql
INSERT INTO memories (real_image_url, ghibli_image_url, caption, category) VALUES
  ('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', 'Sunset Dreams - Where the sky meets the heart', 'adventure'),
  ('https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800', 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800', 'Garden of Love - Blooming with affection', 'adventure'),
  ('https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800', 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800', 'Starry Nights - Under the same stars', 'adventure'),
  ('https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800', 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800', 'Ocean Whispers - Tales of the deep blue', 'adventure'),
  ('https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800', 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800', 'Morning Coffee - Our favorite moments together', 'adventure');
```

**Vault:**
```sql
INSERT INTO vault (mood_tag, message_content, unlock_date) VALUES
  ('you need a smile', 'You are loved more than you know. Your smile lights up the world, and I''m so grateful to be a part of your life. Every day with you is a gift, and I cherish every moment we share together.', NULL),
  ('you''re feeling down', 'Remember that tough times don''t last, but tough people do. You''re one of the strongest people I know, and I believe in you completely. I''m here for you, always.', NULL),
  ('you miss me', 'I''m thinking of you too, always. Distance means nothing when someone means everything. You''re in my heart, no matter where we are. Our love transcends any physical distance.', NULL),
  ('you need encouragement', 'You are capable of amazing things. I''ve seen your strength, your kindness, and your determination. Keep going - you''ve got this, and I''m cheering you on every step of the way.', NULL),
  ('you''re celebrating', 'Congratulations! I''m so proud of you and all that you''ve accomplished. This is just the beginning of many more wonderful achievements. Let''s celebrate together!', NULL),
  ('you''re feeling grateful', 'I''m grateful for you every single day. Your presence in my life has brought so much joy, love, and happiness. Thank you for being exactly who you are.', NULL);
```

**Puzzles:**
```sql
INSERT INTO puzzles (step_number, question, correct_answer, reward_image_url) VALUES
  (1, 'What grows stronger with time?', 'love', 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800'),
  (2, 'Invisible but always felt?', 'love', 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800'),
  (3, 'Connects two souls forever?', 'love', 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800'),
  (4, 'What makes life worth living?', 'love', 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800'),
  (5, 'The answer to everything?', 'love', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800');
```

3. **Run the Query**
   - Click **Run** or press `Ctrl+Enter` (Windows) / `Cmd+Enter` (Mac)

## ⚠️ Important Notes

### For Puzzles CSV:
- The `correct_answer` values in the demo CSV are all set to **"love"** as examples
- **You should change these** to match your actual puzzle answers
- Answers are compared case-insensitively (so "Love", "LOVE", and "love" all work)

### For Images:
- The demo CSV files use placeholder Unsplash image URLs
- **Replace these** with your actual photo URLs:
  - Upload to a service like Cloudinary, Imgur, or Supabase Storage
  - Or use your own hosted images
  - Update the URLs in the CSV before importing

### Column Mapping:
- Make sure the CSV column names match your table column names exactly
- Supabase will auto-detect, but verify the mapping before importing
- The `id` and `created_at` columns are auto-generated, so don't include them in CSV

## ✅ After Importing

1. **Verify Data**
   - Check each table in the Table Editor to confirm data was imported
   - Make sure all rows are present

2. **Test Your App**
   - Restart your Next.js dev server
   - Check that data appears in:
     - Gallery section (memories)
     - Vault section (messages)
     - Puzzles section (questions)

3. **Customize**
   - Replace placeholder images with your actual photos
   - Update puzzle answers and hashes
   - Add more messages, memories, and puzzles!

## 🎨 Adding Your Own Images

To add your own images:

1. **Upload to Supabase Storage** (Recommended):
   - Go to Storage in Supabase dashboard
   - Create a bucket (e.g., "valentine-images")
   - Upload your images
   - Copy the public URL
   - Update the CSV with your URLs

2. **Or Use External Hosting**:
   - Upload to Cloudinary, Imgur, or similar
   - Copy the image URLs
   - Update the CSV

## 📝 Next Steps

After importing the demo data:
1. Customize the messages in `vault.csv` with your own personal messages
2. Replace image URLs with your actual photos
3. Update puzzle questions and generate new answer hashes
4. Add more rows to each CSV as needed
5. Re-import or use the Supabase dashboard to add more data
