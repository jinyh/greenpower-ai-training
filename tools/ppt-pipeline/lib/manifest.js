const { parseDeckMarkdown } = require("./parser");

function buildManifestFromMarkdown(markdown, options = {}) {
  const parsed = parseDeckMarkdown(markdown);
  return {
    source_file: options.sourceFile || "",
    generated_at: options.generatedAt || new Date().toISOString(),
    deck: parsed.deck,
    slides: parsed.slides,
  };
}

module.exports = {
  buildManifestFromMarkdown,
};
