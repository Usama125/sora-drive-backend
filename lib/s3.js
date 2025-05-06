const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const mime = require("mime-types");
const dotenv = require("dotenv");

dotenv.config();

const REGION = process.env.AWS_REGION;
const BUCKET = process.env.AWS_BUCKET_NAME;

const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

exports.generateUploadURL = async (fileName, fileType) => {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: fileName,
    ContentType: fileType,
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return url;
};

exports.getSignedGetUrl = async (fileName) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    ResponseContentType: mime.lookup(fileName) || 'application/octet-stream',
  });

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return signedUrl;
};