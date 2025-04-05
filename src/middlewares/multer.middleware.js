// import multer from "multer";


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./public/temp")
//     },
//     filename: function (req, file, cb) {
//     //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.originalname)
//     }
//   })
  
// //   export const upload = multer({ 
// //     storage,
// //  })

// export const upload = multer({
//   storage,
// }).fields([
//   { name: "profilePic", maxCount: 1 },
//   { name: "coverPhoto", maxCount: 1 },
// ]);

import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./public/temp"),
  filename: (req, file, cb) => cb(null, file.originalname)
});

export const upload = multer({ storage }); // ✅ export multer instance
