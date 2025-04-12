const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Create unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// Filter function to check if the file is allowed
const fileFilter = (req, file, cb) => {
  // Accept images, videos, and documents
  const fileTypes = /jpeg|jpg|png|gif|webp|mp4|mov|pdf|doc|docx|xls|xlsx|ppt|pptx/;
  const mimetype = fileTypes.test(file.mimetype);
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Error: File type not supported!'));
};

// Set up Multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter: fileFilter
});

// Middleware for single file upload
const uploadSingle = (fieldName) => {
  return (req, res, next) => {
    const uploadField = upload.single(fieldName);
    
    uploadField(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ message: 'File size cannot exceed 10MB' });
        }
        return res.status(400).json({ message: err.message });
      } else if (err) {
        // An unknown error occurred
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  };
};

// Middleware for multiple file upload
const uploadMultiple = (fieldName, maxCount) => {
  return (req, res, next) => {
    const uploadFields = upload.array(fieldName, maxCount);
    
    uploadFields(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ message: 'File size cannot exceed 10MB' });
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
          return res.status(400).json({ message: `Too many files, maximum allowed is ${maxCount}` });
        }
        return res.status(400).json({ message: err.message });
      } else if (err) {
        // An unknown error occurred
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  };
};

module.exports = { uploadSingle, uploadMultiple }; 