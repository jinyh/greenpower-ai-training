const fs = require("node:fs");
const path = require("node:path");

const DEFAULT_PROVIDER = "FUCHEERS";
const DEFAULT_IMAGE_MODEL = "gpt-image-2";

function parseDotEnv(text) {
  const env = {};

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;

    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    env[match[1]] = value;
  }

  return env;
}

function readDotEnv(envPath = ".env") {
  if (!fs.existsSync(envPath)) return {};
  return parseDotEnv(fs.readFileSync(envPath, "utf8"));
}

function loadImageProviderEnv(envPath = ".env") {
  return {
    ...readDotEnv(envPath),
    ...process.env,
  };
}

function resolveImageProviderConfig(options = {}) {
  const provider = (options.provider || DEFAULT_PROVIDER).toUpperCase();
  const env = options.env || loadImageProviderEnv(options.envPath);
  const baseUrl = providerBaseUrl(provider, env);
  const apiKey = env[`${provider}_API_KEY`];
  const model = options.model || env[`${provider}_IMAGE_MODEL`] || env.IMAGE_GEN2_MODEL || DEFAULT_IMAGE_MODEL;

  if (!baseUrl) {
    throw new Error(`Missing ${provider}_BASE_URL for Image Gen2 provider`);
  }
  if (!apiKey) {
    throw new Error(`Missing ${provider}_API_KEY for Image Gen2 provider`);
  }

  return {
    provider,
    baseUrl,
    endpoint: imageGenerationEndpoint(baseUrl),
    apiKey,
    model,
  };
}

function providerBaseUrl(provider, env) {
  if (provider === "FUCHEERS") {
    return env.FUCHEERS_BASE_URL || env.FUCHEERS_BASW_URL;
  }
  return env[`${provider}_BASE_URL`];
}

function imageGenerationEndpoint(baseUrl) {
  const url = new URL(baseUrl);
  const pathname = url.pathname.replace(/\/$/, "");
  url.pathname = pathname.endsWith("/v1") ? `${pathname}/images/generations` : `${pathname}/v1/images/generations`;
  url.search = "";
  url.hash = "";
  return url.toString();
}

function projectRelative(fromPath, targetPath) {
  return path.relative(path.dirname(fromPath), targetPath).split(path.sep).join("/");
}

module.exports = {
  DEFAULT_IMAGE_MODEL,
  DEFAULT_PROVIDER,
  imageGenerationEndpoint,
  loadImageProviderEnv,
  parseDotEnv,
  projectRelative,
  resolveImageProviderConfig,
};
