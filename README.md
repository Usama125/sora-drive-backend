# 🚀 Sora Drive – Backend

Sora Drive is a cloud-based file management system. This backend is built using **Node.js, Express, MongoDB**, and **AWS S3**, supporting secure file storage, authentication, folder-based organization, and signed URL access.

---

## ✨ Features

- ✅ Firebase Authentication (verify user sessions)
- ✅ Upload files securely to AWS S3 (images, videos, PDFs, audio)
- ✅ Signed URL generation for upload & preview
- ✅ Folder-based file organization and navigation
- ✅ Upload progress tracking and cancel support
- ✅ Dynamic file preview:
  - Image viewer
  - PDF viewer (in new tab)
  - Video player
  - Audio player
- ✅ File deletion with cleanup from MongoDB and S3
- ✅ Real-time frontend sync via API
- ✅ Modular and clean codebase structure

---

## 🛠 Tech Stack

- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **AWS S3** (signed URLs for upload & access)
- **Firebase Admin SDK** (authentication)
- **dotenv** for environment config

---

## ⚙️ Environment Variables

Create a `.env` file with:

```env
PORT=3001
FIREBASE_ADMIN_SDK=firebase-service-account.json file path
MONGO_URI=your_mongodb_uri

AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_s3_bucket_region
AWS_BUCKET_NAME=your_s3_bucket_name
