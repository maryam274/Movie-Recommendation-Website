
// // This file contains the options for Mongoose models.
// // It is used to set the default options for all models in the application.
// // It includes options for toJSON and toObject methods, versionKey, and timestamps.
// const modelOptions = {
//   toJSON: {
//     virtuals: true,
//     transform: (_, obj) => {
//       delete obj._id;
//       return obj;
//     }
//   },
//   toObject: {
//     virtuals: true,
//     transform: (_, obj) => {
//       delete obj._id;
//       return obj;
//     }
//   },
//   versionKey: false,
//   timestamps: true
// };

// export default modelOptions;