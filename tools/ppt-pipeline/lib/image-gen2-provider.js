const DEFAULT_SIZE = "1536x1024";
const DEFAULT_QUALITY = "low";
const DEFAULT_OUTPUT_FORMAT = "png";

class OpenAICompatibleImageGen2Provider {
  constructor(config, options = {}) {
    this.config = config;
    this.fetch = options.fetch || globalThis.fetch;
  }

  async generateImage(options = {}) {
    if (!this.fetch) {
      throw new Error("This Node runtime does not provide fetch");
    }

    let response;
    try {
      response = await this.fetch(this.config.endpoint, {
        method: "POST",
        headers: {
          authorization: `Bearer ${this.config.apiKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: this.config.model,
          prompt: options.prompt,
          size: options.size || DEFAULT_SIZE,
          quality: options.quality || DEFAULT_QUALITY,
          output_format: options.outputFormat || DEFAULT_OUTPUT_FORMAT,
        }),
      });
    } catch (error) {
      const cause = error.cause?.code || error.cause?.message || error.message;
      throw new Error(`Image generation request failed before JSON response: ${cause}`);
    }

    const text = await response.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      json = { error: { message: text.slice(0, 500) } };
    }

    if (!response.ok) {
      const message = json.error?.message || json.message || `HTTP ${response.status}`;
      throw new Error(`Image generation failed: ${message}`);
    }

    return extractImageBufferFromResponse(json);
  }
}

function extractImageBufferFromResponse(payload) {
  const base64 = findBase64Image(payload);
  if (!base64) {
    throw new Error("Image generation response did not include a base64 image");
  }
  return Buffer.from(base64, "base64");
}

function findBase64Image(value) {
  if (!value || typeof value !== "object") return "";

  if (typeof value.b64_json === "string") return value.b64_json;
  if (typeof value.image_base64 === "string") return value.image_base64;
  if (typeof value.base64 === "string" && looksLikeBase64(value.base64)) return value.base64;

  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findBase64Image(item);
      if (found) return found;
    }
    return "";
  }

  for (const item of Object.values(value)) {
    const found = findBase64Image(item);
    if (found) return found;
  }

  return "";
}

function looksLikeBase64(value) {
  return value.length > 64 && /^[A-Za-z0-9+/=\s]+$/.test(value);
}

module.exports = {
  DEFAULT_OUTPUT_FORMAT,
  DEFAULT_QUALITY,
  DEFAULT_SIZE,
  OpenAICompatibleImageGen2Provider,
  extractImageBufferFromResponse,
};
