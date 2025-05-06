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
PORT=5000
MONGO_URI=your_mongodb_uri

AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_bucket_name
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key

FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY_ID=your_key_id
FIREBASE_PRIVATE_KEY="your_private_key" # Must wrap in quotes
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_CLIENT_ID=your_firebase_client_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
