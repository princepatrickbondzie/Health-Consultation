const { model, Schema } = require("mongoose");

const consultationSchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    officer: {
      type: Schema.Types.ObjectId,
      ref: "Officer",
      required: true,
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    history: {
      type: String,
      required: true,
    },
    diagnosis: {
      type: String,
      required: true,
    },
    illness: {
      type: String,
      default: "None",
      required: true,
    },
    treatment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Consultation", consultationSchema);
