import apiClient from "../utils/apiClient.js";

const normalizeModelName = (model) => model?.trim();

export const fetchAvailableModels = async () => {
    try {
        const response = await apiClient.get("/models");
        if (response.status !== 200) {
            throw new Error(
                `Unable to fetch models from mimOE (${process.env.MIMOE_API}/models): ` +
                `${response.status} ${response.statusText}`
            );
        }

        const payload = response.data;
        const models = Array.isArray(payload?.data) ? payload.data : Array.isArray(payload) ? payload : [];

        if (!Array.isArray(models)) {
            throw new Error(
                "Unexpected mimOE /models response. Ensure MIMOE_API points to a valid OpenAI-compatible endpoint."
            );
        }

        return models.map((item) => {
            if (typeof item === "string") return item;
            return item.id || item.name || item.model || JSON.stringify(item);
        }).filter(Boolean);
    } catch (error) {
        const status = error.response?.status;
        const details = error.response?.data ? JSON.stringify(error.response.data) : error.message;
        throw new Error(
            `Unable to fetch models from mimOE (${process.env.MIMOE_API}/models): ` +
            `${status || "no status"} - ${details}`
        );
    }
};

export const validateMIMOEModel = async () => {
    const configuredModel = normalizeModelName(process.env.MIMOE_MODEL);
    const availableModels = await fetchAvailableModels();

    if (!availableModels.length) {
        throw new Error(
            `No models are available from mimOE at ${process.env.MIMOE_API}. ` +
            "Deploy a model to mimOE and set MIMOE_MODEL to a valid model name."
        );
    }

    if (!configuredModel) {
        if (availableModels.length === 1) {
            process.env.MIMOE_MODEL = availableModels[0];
            console.warn(
                `MIMOE_MODEL was not set. Defaulting to the only available model: ${availableModels[0]}`
            );
            return;
        }

        throw new Error(
            `MIMOE_MODEL is not configured. Available models: ${availableModels.join(", ")}. ` +
            "Set MIMOE_MODEL in backend/.env to one of these names."
        );
    }

    if (!availableModels.includes(configuredModel)) {
        throw new Error(
            `Configured MIMOE_MODEL '${configuredModel}' is not available. ` +
            `Available models: ${availableModels.join(", ")}. ` +
            "Update MIMOE_MODEL in backend/.env or deploy the model in mimOE."
        );
    }
};
