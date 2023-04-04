import Report from "../models/reportModel.js";

export const selectAllReportNotDone = async (req, res, next) => {
    try {
        const reports = await Report.find({ done: false }).populate({
            path: "reporter",
            select: "_id avatar name gender",
        });
        res.status(201).json({
            message: "Success",
            result: reports,
        });
    } catch (err) {
        next(err);
    }
};
export const selectAllReportDone = async (req, res, next) => {
    try {
        const reports = await Report.find({ done: true }).populate({
            path: "reporter",
            select: "_id avatar name gender",
        });
        res.status(201).json({
            message: "Success",
            result: reports,
        });
    } catch (err) {
        next(err);
    }
};
export const createReport = async (req, res, next) => {
    try {
        const { userId, title, description } = req.body;
        const report = await Report.create({
            title: title,
            description: description,
            reporter: userId,
        });

        res.status(201).json({
            message: "Success",
            result: report,
        });
    } catch (error) {
        next(error);
    }
};
export const getReportById = async (req, res, next) => {
    try {
        const report = await Report.find({
            _id: req.params.id,
            done: false,
        }).populate({
            path: "reporter",
            select: "_id avatar name gender",
        });
        res.status(201).json({
            message: "Success",
            result: report,
        });
    } catch (error) {
        next(error);
    }
};
export const updateReport = async (req, res, next) => {
    try {
        const result = await Report.findByIdAndUpdate(
            { _id: req.params.id },
            { done: true }
        );
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};
