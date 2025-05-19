import mongoose from "mongoose";

const excelFileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: false,
    },
    fileUrl: {
      type: String,
    },
    chartConfig: {
      type: Object,
      default: {},
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const ExcelFile = mongoose.model("ExcelFile", excelFileSchema);

export default ExcelFile;
