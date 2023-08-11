const multer = require("multer");
const cloudnary = require("../configs/cloudnary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const uploadImageStorage = multer.diskStorage({
  destination: "public",
  filename: (req, file, cb) => {
    // console.log(file);
    cb(null, file.originalname);
  },
  fileFilter(req, file, cb) {
    // console.log(file, file.mimetype)
    const fileType = file.originalname.split(".")[1];
    console.log(file);
    if (['jpeg','png','jpg'].includes(fileType)) {
      cb(undefined, true);
    } else {
      cb({ message: "Unsupported File format" }, false);
    }
  },
  limits:{fileSize:1024*1024*3}
});

const uploadImagePdfStorage = multer.diskStorage({
  destination: "public",
  filename: (req, file, cb) => {
    // console.log(file);
    cb(null, file.originalname);
  },
  fileFilter(req, file, cb) {
    // console.log(file, file.mimetype)
    const fileType = file.originalname.split(".")[1];
    console.log(file);
    if (['jpeg','png','jpg','pdf'].includes(fileType)) {
      cb(undefined, true);
    } else {
      cb({ message: "Unsupported File format" }, false);
    }
  },
  limits:{fileSize:1024*1024*3}
}); 

const uploadPDFStorage = multer.diskStorage({
  destination: "public",
  filename: (req, file, cb) => {
    console.log(file);
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },

  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf|PDF|docx|DOCX|ppt|pptx)$/)) {
      return cb(new Error("Please upload a valid document file"), false);
    }
    cb(undefined, true);
  },
});

const uploadVideoStorage = multer.diskStorage({
  destination: "public",
  filename: (req, file, cb) => {
    console.log(file);
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },

  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(mp4|mov|wmv|avi|MP4|MOV|WMV|AVI)$/)) {
      return cb(new Error("Please upload a valid video file"), false);
    }
    cb(undefined, true);
  },
});


 const fileFilter = (req, file, cb) => {
     if (!file.originalname.match(/\.(jpg|jpeg|png|PNG|JPEG|JPG)$/)) {
      cb(new Error("Please upload a valid image file type"), false);
     }
      cb(undefined, true);
  }


const importfileFilter = (req, file, cb) => {
     if (!file.originalname.match(/\.(XLSX|xlsx)$/)) {
       cb(new Error("Please upload a valid xlsx file only"), false);
     }
     cb(undefined, true);
};
   
 const pdfFilter = (req, file, cb) => {
     if (!file.originalname.match(/\.(pdf|docx|ppt|PDF|DOCX|PPT)$/)) {
      cb(new Error("Please upload a valid pdf file type"), false);
     }
      cb(undefined, true);
}
  
const videoFilter = (req, file, cb) => {

    if (!file.originalname.match(/\.(mov|mp4|avi|wmv|MOV|MP4|AVI|WMV)$/)) {
      cb(new Error("Please upload a valid video file type"), false);
     }
      cb(undefined, true);
}

const imagePdfFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|PNG|JPEG|JPG|pdf|PDF)$/)) {
      cb(new Error("Please upload a valid image or pdf file type"), false);
     }
      cb(undefined, true);
}

const storage = new CloudinaryStorage({
  cloudinary: cloudnary,
  params: {
    folder: "DEV",
  },
  allowedFormats: ["jpg", "png","jpeg","JPG","PNG","JPEG"],
}); 


exports.uploadImage = multer({
  storage: uploadImageStorage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter
}).single("image");

exports.uploadPDF = multer({
  storage: uploadPDFStorage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter:pdfFilter,
}).single("file");


exports.uploadVideo = multer({
  storage: uploadVideoStorage,
  limits: { fileSize: 1024 * 1024 * 15 },
  fileFilter:videoFilter
}).any("video");

exports.uploadBookandCover = multer({
  storage: uploadImagePdfStorage,
  limits:{fileSize:1024*1024*15},
  fileFilter:imagePdfFilter
}).fields([{
  name:"image",maxCount:1
}, {
  name:"pdf",maxCount:1
}])
  
exports.cloudUploadTry = multer({ storage: storage }).single("image");
