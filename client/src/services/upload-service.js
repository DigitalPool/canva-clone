import axios from "axios";
import { getSession } from "next-auth/react";
import { fetchWithAuth } from "./base-service";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  "http://localhost:5500";

export async function uploadFileWithAuth(file, metaData = {}) {
  const session = await getSession();

  if (!session) {
    throw new Error("Not authenticated");
  }

  const formData = new FormData();
  formData.append("file", file);

  console.log(file)

  Object.entries(metaData).forEach(([key, value]) => {
    formData.append(key, value);
  });

  try {
    const response = await axios.post(`${API_URL}/v1/media/upload`, formData, {
      headers: {
        Authorization: `Bearer ${session.idToken || session.id_token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (e) {
    const responseMessage =
      e?.response?.data?.message || e?.response?.data?.error;
    const status = e?.response?.status;

    throw new Error(
      responseMessage
        ? `Upload failed (${status}): ${responseMessage}`
        : "Upload failed"
    );
  }
}

export async function generateImageFromAI(prompt) {
  try {
    console.log("Generating image with AI enters generateImageFromAI function");
    const response = await fetchWithAuth("/v1/media/ai-image-generate", {
      method: "POST",
      body: {
        prompt,
      },
    });
    console.log("Generating image with AI from generateImageFromAI upload service");
    return response;
  } catch (e) {
    throw new Error(e.message);
  }
}
