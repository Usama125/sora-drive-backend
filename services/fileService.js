const File = require("../models/File");

exports.createFolder = async ({ name, parent, userId }) => {
  const folder = new File({ name, type: "folder", parent, userId });
  return await folder.save();
};

exports.uploadFile = async ({ name, url, parent, userId }) => {
  const file = new File({ name, url, type: "file", parent, userId });
  return await file.save();
};

exports.getFilesByParent = async (parent, userId) => {
  return await File.find({ parent, userId });
};

exports.renameItem = async (id, name, userId) => {
  return await File.findOneAndUpdate({ _id: id, userId }, { name }, { new: true });
};

exports.deleteItem = async (id, userId) => {
  const item = await File.findOne({ _id: id, userId });
  if (!item) return null;

  await File.deleteMany({ parent: id });
  await item.deleteOne();
  return item;
};

exports.getItemById = async (id, userId) => {
  return await File.findOne({ _id: id, userId });
};

exports.getBreadcrumbTrail = async (folderId, userId) => {
  if (!folderId || folderId === "root") {
    return [{ name: "My Drive", id: "root" }];
  }

  const trail = [];
  let current = await File.findOne({ _id: folderId, userId });

  while (current) {
    trail.unshift({ name: current.name, id: current._id.toString() });
    if (!current.parent) break;
    current = await File.findOne({ _id: current.parent, userId });
  }

  trail.unshift({ name: "My Drive", id: "root" });
  return trail;
};
