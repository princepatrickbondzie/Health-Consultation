const { model, Schema } = require("mongoose");

const FacilitySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    certifiedId: { type: Number, required: true, unique: true },
    consultationOfficer: {
      type: String,
      type: Schema.Types.ObjectId,
      ref: "Officer",
      required: true,
    },
    patient: {
      type: String,
      type: Schema.Types.ObjectId,
      ref: "Patient",
      default: [],
    },
    location: { type: String, required: true },
    category: {
      type: String,
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    password: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = model("Facility", FacilitySchema);
