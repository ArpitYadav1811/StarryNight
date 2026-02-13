# 📸 Image Integration Guide

This guide explains where to put your images and how to integrate them into your StarryNight application.

## 🎯 Overview

Your application needs images in **two places**:
1. **Gallery/Memories** - Each memory needs 2 images (real photo + Ghibli edit)
2. **Puzzles** - Each puzzle can have 1 reward image (optional but recommended)

Images are stored as **URLs in your Supabase database**, not as files in your project.

---

## 📁 Option 1: Supabase Storage (Recommended)

This is the **best option** for production. Images are stored in Supabase and served via CDN.

### Step 1: Create Storage Bucket in Supabase

1. Go to your Supabase project: https://app.supabase.com
2. Click **Storage** in the left sidebar
3. Click **New bucket**
4. Name it: `memories` (or `images`)
5. Make it **Public** (so images can be accessed without authentication)
6. Click **Create bucket**

### Step 2: Upload Images

1. Click on your bucket name
2. Click **Upload file** or drag & drop
3. Upload your images:
   - **For Memories**: Upload both `real-photo-1.jpg` and `ghibli-edit-1.jpg`
   - **For Puzzles**: Upload `reward-artwork-1.jpg`

### Step 3: Get Public URLs

After uploading, click on an image to see its details. Copy the **Public URL** which looks like:
```
https://[your-project-ref].supabase.co/storage/v1/object/public/memories/real-photo-1.jpg
```

### Step 4: Update Your Database

You have **two options** to add image URLs to your database:

#### Option A: Update CSV Files (Easiest)

1. Open `demo-data/memories.csv`
2. Replace the placeholder URLs with your Supabase Storage URLs:

```csv
real_image_url,ghibli_image_url,caption,category
https://[your-project].supabase.co/storage/v1/object/public/memories/photo1-real.jpg,https://[your-project].supabase.co/storage/v1/object/public/memories/photo1-ghibli.jpg,
https://[your-project].supabase.co/storage/v1/object/public/memories/photo2-real.jpg,https://[your-project].supabase.co/storage/v1/object/public/memories/photo2-ghibli.jpg,Garden of Love - Blooming with affection,adventure
```

3. Open `demo-data/puzzles.csv`
4. Replace reward image URLs:

```csv
step_number,question,correct_answer,reward_image_url
1,What grows stronger with time?,love,https://[your-project].supabase.co/storage/v1/object/public/memories/reward1.jpg
```

5. Import the updated CSV files into Supabase (see `demo-data/IMPORT_INSTRUCTIONS.md`)

#### Option B: Update Directly in Supabase Dashboard

1. Go to **Table Editor** in Supabase
2. Click on `memories` table
3. Click **Insert row** or edit existing rows
4. Paste your image URLs into `real_image_url` and `ghibli_image_url` columns
5. Repeat for `puzzles` table with `reward_image_url`

---

## 🌐 Option 2: External Image Hosting

If you prefer to use external hosting (Cloudinary, Imgur, etc.):

### Using Cloudinary (Free tier available)

1. Sign up at https://cloudinary.com
2. Upload your images
3. Get the **Delivery URL** for each image
4. Add URLs to your database (same process as Option 1, Step 4)

### Using Imgur (Free)

1. Go to https://imgur.com
2. Upload images
3. Right-click image → **Copy image address**
4. Add URLs to your database

### Using Any Image Hosting Service

Just make sure:
- ✅ Images are publicly accessible (no authentication required)
- ✅ URLs are HTTPS (secure)
- ✅ URLs are direct links to the image file (not a page containing the image)

---

## 💻 Option 3: Local Files (Development Only)

**⚠️ Warning**: This only works for local development. For production, use Option 1 or 2.

### Step 1: Create Public Folder

1. In your project root, create a folder named `public`:
   ```
   StarryNight/
   ├── public/          ← Create this folder
   │   ├── images/      ← Create this subfolder
   │   │   ├── memories/
   │   │   └── puzzles/
   ```

### Step 2: Add Your Images

Place your images in the folder structure:
```
public/
└── images/
    ├── memories/
    │   ├── photo1-real.jpg
    │   ├── photo1-ghibli.jpg
    │   ├── photo2-real.jpg
    │   └── photo2-ghibli.jpg
    └── puzzles/
        ├── reward1.jpg
        └── reward2.jpg
```

### Step 3: Use Local Paths in Database

In your CSV files or Supabase, use paths like:
```csv
real_image_url,ghibli_image_url,caption,category
/images/memories/photo1-real.jpg,/images/memories/photo1-ghibli.jpg,Sunset Dreams,adventure
```

**Note**: These paths start with `/` and are relative to the `public` folder.

---

## 📝 Quick Reference: Image URLs Format

### Supabase Storage URL Format:
```
https://[project-ref].supabase.co/storage/v1/object/public/[bucket-name]/[filename]
```

Example:
```
https://abcdefghijklmnop.supabase.co/storage/v1/object/public/memories/photo1-real.jpg
```

### Local File URL Format:
```
/images/[folder]/[filename]
```

Example:
```
/images/memories/photo1-real.jpg
```

### External Hosting URL Format:
```
https://[hosting-service]/[path]/[filename]
```

Example (Cloudinary):
```
https://res.cloudinary.com/your-cloud/image/upload/v1234567890/photo1.jpg
```

---

## ✅ Checklist

- [ ] Decide on storage method (Supabase Storage recommended)
- [ ] Upload images to chosen storage
- [ ] Get public URLs for all images
- [ ] Update `memories.csv` with real and Ghibli image URLs
- [ ] Update `puzzles.csv` with reward image URLs
- [ ] Import updated CSV files into Supabase
- [ ] Test images load correctly in the app

---

## 🎨 Image Requirements

### For Memories:
- **Real Photo**: Original photo (JPG, PNG, or WebP)
- **Ghibli Edit**: AI-edited Studio Ghibli style version
- **Size**: 800-1200px width recommended
- **Aspect Ratio**: 4:3 works best

### For Puzzles:
- **Reward Artwork**: Ghibli-style artwork
- **Size**: 800-1200px width recommended
- **Aspect Ratio**: 4:3 works best

---

## 🐛 Troubleshooting

**Problem**: Images not showing
- ✅ Check URL is accessible in browser (paste URL directly)
- ✅ Check URL is HTTPS (not HTTP)
- ✅ Check URL doesn't require authentication
- ✅ Check for typos in database URLs
- ✅ Check browser console for CORS errors

**Problem**: Images loading slowly
- ✅ Optimize image sizes (compress before uploading)
- ✅ Use Supabase Storage (CDN) for faster delivery
- ✅ Consider using WebP format for smaller file sizes

**Problem**: CORS errors
- ✅ Make sure Supabase Storage bucket is set to **Public**
- ✅ Check bucket policies allow public access

---

## 📚 Next Steps

After setting up images:
1. Test your gallery section displays images correctly
2. Test puzzle rewards appear when puzzles are solved
3. Add more memories and puzzles as needed
4. Consider adding image optimization (compression, WebP conversion)

---

## 💡 Pro Tips

1. **Naming Convention**: Use descriptive names like `photo1-real.jpg`, `photo1-ghibli.jpg` to keep pairs organized
2. **Batch Upload**: Upload all images at once to Supabase Storage for efficiency
3. **Backup**: Keep original images backed up locally
4. **Optimization**: Compress images before uploading to reduce load times
5. **Testing**: Test with a few images first before uploading everything



1-https://hbrnpnjcomejtgdcbnsy.supabase.co/storage/v1/object/public/private/Gemini_Generated_Image_loza1jloza1jloza.png

2-https://hbrnpnjcomejtgdcbnsy.supabase.co/storage/v1/object/public/private/Gemini_Generated_Image_zelzy5zelzy5zelz.png

3-https://hbrnpnjcomejtgdcbnsy.supabase.co/storage/v1/object/public/private/WhatsApp%20Image%202026-02-13%20at%2010.07.48%20PM.jpeg

4-https://hbrnpnjcomejtgdcbnsy.supabase.co/storage/v1/object/public/private/WhatsApp%20Image%202026-02-13%20at%2010.07.49%20PM.jpeg

5-https://hbrnpnjcomejtgdcbnsy.supabase.co/storage/v1/object/public/private/WhatsApp%20Image%202026-02-13%20at%209.57.43%20PM.jpeg

6-https://hbrnpnjcomejtgdcbnsy.supabase.co/storage/v1/object/public/private/WhatsApp%20Image%202026-02-13%20at%209.57.44%20PM%20(1).jpeg

7-https://hbrnpnjcomejtgdcbnsy.supabase.co/storage/v1/object/public/private/WhatsApp%20Image%202026-02-13%20at%209.57.44%20PM%20(2).jpeg

8-https://hbrnpnjcomejtgdcbnsy.supabase.co/storage/v1/object/public/private/WhatsApp%20Image%202026-02-13%20at%209.57.44%20PM.jpeg

9-https://hbrnpnjcomejtgdcbnsy.supabase.co/storage/v1/object/public/private/WhatsApp%20Image%202026-02-13%20at%209.57.45%20PM%20(1).jpeg

10-https://hbrnpnjcomejtgdcbnsy.supabase.co/storage/v1/object/public/private/WhatsApp%20Image%202026-02-13%20at%209.57.45%20PM%20(2).jpeg

11-https://hbrnpnjcomejtgdcbnsy.supabase.co/storage/v1/object/public/private/WhatsApp%20Image%202026-02-13%20at%209.57.45%20PM.jpeg

12-https://hbrnpnjcomejtgdcbnsy.supabase.co/storage/v1/object/public/private/WhatsApp%20Image%202026-02-13%20at%209.57.46%20PM.jpeg