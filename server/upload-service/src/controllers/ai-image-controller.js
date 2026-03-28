const axios = require("axios");
const FormData = require("form-data");
const { uploadMediaToCloudinary } = require("../utils/cloudinary");
const Media = require("../models/media");

const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
const STABILITY_API_HOST = "https://api.stability.ai";

const generateImageFromAIAndUploadToDB = async (req, res) => {
	const prompt = req.body?.prompt?.trim();
	const userId = req.user.userId;

	if (!prompt) {
		return res.status(400).json({
			success: false,
			message: "Prompt is required",
		});
	}

	if (!STABILITY_API_KEY) {
		return res.status(500).json({
			success: false,
			message: "STABILITY_API_KEY is not configured on the upload service",
		});
	}

	try {
        const form = new FormData();
		form.append("prompt", prompt);
		form.append("aspect_ratio", "1:1");
		form.append("seed", "30");
		form.append("output_format", "png");
		const response = await axios.post(
			`${STABILITY_API_HOST}/v2beta/stable-image/generate/core`,
			form,
			{
				headers: {
					Authorization: `Bearer ${STABILITY_API_KEY}`,
					Accept: "application/json",
					...form.getHeaders(),
				},
			}
		);

		const base64Image =
			response.data.image ||
			response.data.base64 ||
			response.data.artifacts?.[0]?.base64;

		if (!base64Image) {
			throw new Error("No image generated from Stability AI");
		}

		const imageBuffer = Buffer.from(base64Image, "base64");

		const file = {
			buffer: imageBuffer,
			originalName: `ai-generated-${Date.now()}.png`,
			mimetype: "image/png",
			size: imageBuffer.length,
			width: 1024,
			height: 1024,
		};

		const cloudinaryResult = await uploadMediaToCloudinary(file);

		const newlyCreatedMedia = new Media({
			userId,
			name: `AI Generated ${prompt.substring(0, 50)}${
				prompt.length > 50 ? "..." : ""
			}`,
			cloudinaryId: cloudinaryResult.public_id,
			url: cloudinaryResult.secure_url,
			mimeType: "image/png",
			size: imageBuffer.length,
			width: 1024,
			height: 1024,
		});

		await newlyCreatedMedia.save();

		return res.status(201).json({
			success: true,
			data: newlyCreatedMedia,
			prompt,
			seed: response.data.seed || response.data.artifacts?.[0]?.seed || 30,
			message: "AI image generated and uploaded to DB successfully",
		});
	} catch (e) {
		console.error("Stability error:", e.response?.data || e.message);

		return res.status(500).json({
			success: false,
			message:
				e.response?.data?.message ||
				e.response?.data?.error ||
				"Fetch from AI and upload to DB failed! Please try again",
			error: e.response?.data || e.message,
		});
	}
};

module.exports = { generateImageFromAIAndUploadToDB };
