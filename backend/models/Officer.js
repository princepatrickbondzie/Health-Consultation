const { model, Schema } = require("mongoose");

const officerSchema = new Schema(
  {
    firstName: { type: String, required: true, unique: true, trim: true },
    lastName: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: Number, required: true, unique: true },
    facility: {
      type: String,
      type: Schema.Types.ObjectId,
      ref: "Facility",
      required: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("Officer", officerSchema);
