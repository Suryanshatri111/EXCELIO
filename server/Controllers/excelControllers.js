import XLSX from "xlsx";
import fs from "fs";
import ExcelFile from "../Models/excelModel.js";

// upload the excel file
const handleExcelUpload = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const workbook = XLSX.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const newExcelEntry = new ExcelFile({
      user: req.user._id,
      filename: file.filename,
      originalName: file.originalname,
      data: sheetData,
      uploadedAt: new Date(),
    });

    await newExcelEntry.save();
    // fs.unlinkSync(file.path); // Delete file from temp uploads
    res.status(201).json({
      message: "Excel file uploaded and saved.",
      fileId: newExcelEntry._id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "File upload failed." });
    fs.unlinkSync(file.path);
  }
};

// help to get all excel files of user
const fetchAllUserExcelFiles = async (req, res) => {
  try {
    const files = await ExcelFile.find({ user: req.user._id }).select("-data");
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: "Failed to get files" });
  }
};

//help to get excel files by the id
const fetchExcelFileById = async (req, res) => {
  try {
    const file = await ExcelFile.findById({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!file) return res.status(404).json({ error: "File not found" });

    res.json(file);
  } catch (error) {
    res.status(500).json({
      error: "Error get the file",
    });
  }
};

//help to deleted file
const removeExcelFile = async (req, res) => {
  try {
    const file = await ExcelFile.findByIdAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!file) return res.status(404).json({ error: "File not found" });
    res.json({ message: "File deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "failed to delete file" });
  }
};

// help to custom chart settings
const modifyChartConfig = async (req, res) => {
  try {
    const { config } = req.body;

    const file = await ExcelFile.findByIdAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      { chartConfig: config },
      { new: true }
    );

    res.json(file);
  } catch (error) {
    res.status(500).json({ error: "Faild to update chart config" });
  }
};

export {
  handleExcelUpload,
  fetchAllUserExcelFiles,
  fetchExcelFileById,
  removeExcelFile,
  modifyChartConfig,
};
