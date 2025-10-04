// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema(
//   {
//     role: {
//       type: String,
//       enum: ["serviceNeeder", "serviceProvider"],
//       required: true,
//     },
//     fullName: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },
//     phone: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//     },
//     profilePic: { type: String, default: "" },

//     // 📍 Service Needer fields
//     address: { type: String },
//     pincode: { type: String },
//     city: { type: String },
//     district: { type: String },
//     state: { type: String },
//     country: { type: String },

//     // 🛠 Service Provider fields
//     serviceCategory: { type: String },
//     experience: { type: Number, default: 0 },
//     skills: { type: [String], default: [] },
//     availability: { type: Boolean, default: false },
//     serviceArea: { type: String },
//     idProof: { type: String },
  

//    location: {
//       type: {
//         type: String,
//         enum: ["Point"],
//         default: "Point",
//       },
//       coordinates: {
//         type: [Number], // [longitude, latitude]
//         index: "2dsphere",
//       },
//     },
//   },
//   { timestamps: true }
// );
// export default mongoose.models.User || mongoose.model("User", UserSchema);

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["serviceNeeder", "serviceProvider"],
      required: true,
    },
    fullName: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    profilePic: { type: String, default: "" },

    // 📍 Address fields
    address: { type: String },
    pincode: { type: String },
    city: { type: String },
    district: { type: String },
    state: { type: String },
    country: { type: String },

    // 🛠 Service Provider fields
    serviceCategory: { type: String },
    experience: { type: Number, default: 0 },
    skills: { type: [String], default: [] },
    availability: { type: Boolean, default: false },
    serviceArea: { type: String },
    idProof: { type: String },

    // 🌍 GeoJSON for location
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], default: [0, 0] }, // [lng, lat]
    },
  },
  { timestamps: true }
);

// Add a 2dsphere index for geospatial queries
UserSchema.index({ location: "2dsphere" });

export default mongoose.models.User || mongoose.model("User", UserSchema);
