const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const controller = require("../controllers/filesController");
const upload = require("../middlewares/multer");

// ✅ Static routes first
router.post("/create-folder", auth, controller.createFolder);
router.post("/upload", auth, upload.single("file"), controller.uploadFile);
router.get("/list", auth, controller.getFolderContents);       // root folder
router.get("/list/:id", auth, controller.getFolderContents);   // nested folder

// ✅ Dynamic routes after static ones
router.get("/:id", auth, controller.getFileDetails);
router.put("/:id/rename", auth, controller.renameItem);
router.delete("/:id", auth, controller.deleteItem);

router.get("/", auth, controller.getFiles); // optional legacy/default fallback
router.get("/s3/sign", auth, controller.getSignedUploadUrl);
router.get("/s3/view", controller.getSignedFileUrl);

module.exports = router;
