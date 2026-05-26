const Inquiry = require('../models/Inquiry');

exports.submitInquiry = async (req, res) => {
    try {
        const inquiry = new Inquiry(req.body);
        await inquiry.save();
        res.status(201).json({ message: "Message sent successfully!" });
    } catch (error) {
        res.status(400).json({ message: "Error sending message" });
    }
};

exports.getInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};