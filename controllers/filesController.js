const fileService = require("../services/fileService");
const { generateUploadURL, getSignedGetUrl } = require("../lib/s3");

exports.getFolderContents = async (req, res) => {
  try {
    const folderId = req.params.id || null;
    const userId = req.user.uid;

    const allItems = await fileService.getFilesByParent(folderId, userId);
    const folders = allItems.filter(item => item.type === "folder");
    const files = allItems.filter(item => item.type === "file");

    const breadcrumbs = await fileService.getBreadcrumbTrail(folderId, userId);

    res.json({ folders, files, breadcrumbs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createFolder = async (req, res) => {
  try {
    let { name, parent } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });
    if (parent === "root") parent = null;

    const folder = await fileService.createFolder({ name, parent, userId: req.user.uid });
    res.status(201).json(folder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSignedFileUrl = async (req, res) => {
  const { fileName } = req.query;

  if (!fileName) {
    return res.status(400).json({ error: "Missing file name" });
  }

  try {
    const signedUrl = await getSignedGetUrl(fileName);
    return res.json({ url: signedUrl });
  } catch (err) {
    console.error("Failed to generate signed URL:", err);
    return res.status(500).json({ error: "Failed to generate signed URL" });
  }
};

exports.getSignedUploadUrl = async (req, res) => {
  try {
    const { fileName, fileType } = req.query;
    if (!fileName || !fileType) return res.status(400).json({ error: "Missing parameters" });

    const url = await generateUploadURL(fileName, fileType);
    res.json({ url });
  } catch (err) {
    console.error("Signed URL error", err);
    res.status(500).json({ error: "Failed to generate signed URL" });
  }
};

exports.uploadFile = async (req, res) => {
  try {
    const { name } = req.body;

    let parent = req.body.parent === "root" ? null : req.body.parent || null;
    
    const newFile = await fileService.uploadFile({
      name,
      url: `s3://${name}`, // not actual URL, you can use this as reference
      userId: req.user.uid,
      parent,
    });

    res.status(201).json(newFile);
  } catch (err) {
    console.error("Upload DB error", err);
    res.status(500).json({ error: "Upload failed" });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const parent = req.query.parent || null;
    const files = await fileService.getFilesByParent(parent, req.user.uid);
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.renameItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const item = await fileService.renameItem(id, name, req.user.uid);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await fileService.deleteItem(id, req.user.uid);
    if (!result) return res.status(404).json({ error: "Item not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFileDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await fileService.getItemById(id, req.user.uid);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
