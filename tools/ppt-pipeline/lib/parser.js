const SLIDE_HEADER_RE = /^##\s+(.+?)\s*$/;
const FIELD_RE = /^(Layout|Visual|Content|Notes|Deck|Audience|Theme)\s*:\s*(.*)$/i;

function parseDeckMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  const deck = {
    title: "",
    audience: "",
    theme: "",
  };
  const slides = [];

  let currentSlide = null;
  let currentField = null;

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (!line.trim()) {
      continue;
    }

    const deckFieldMatch = line.match(FIELD_RE);
    if (deckFieldMatch && !currentSlide) {
      const key = deckFieldMatch[1].toLowerCase();
      const value = deckFieldMatch[2].trim();
      if (key === "deck") deck.title = value;
      if (key === "audience") deck.audience = value;
      if (key === "theme") deck.theme = value;
      continue;
    }

    const slideHeaderMatch = line.match(SLIDE_HEADER_RE);
    if (slideHeaderMatch) {
      if (currentSlide) {
        finalizeSlide(currentSlide);
        slides.push(currentSlide);
      }

      const { slideId, title } = parseSlideHeading(slideHeaderMatch[1]);
      currentSlide = {
        id: slideId,
        title,
        layout: "",
        body: [],
        visual_prompt: "",
        asset_path: "",
        asset_kind: "placeholder",
        svg_status: "skipped-v1",
        notes: [],
        source_refs: [],
      };
      currentField = null;
      continue;
    }

    if (!currentSlide) {
      continue;
    }

    const fieldMatch = line.match(FIELD_RE);
    if (fieldMatch) {
      currentField = fieldMatch[1].toLowerCase();
      const value = fieldMatch[2].trim();
      if (value) {
        pushFieldValue(currentSlide, currentField, value);
      }
      continue;
    }

    if (line.startsWith("-")) {
      pushFieldValue(currentSlide, currentField, line.replace(/^-+\s*/, ""));
      continue;
    }

    if (currentField) {
      pushFieldValue(currentSlide, currentField, line.trim());
    }
  }

  if (currentSlide) {
    finalizeSlide(currentSlide);
    slides.push(currentSlide);
  }

  validateDeck(deck, slides);
  return { deck, slides };
}

function parseSlideHeading(rawHeading) {
  const match = rawHeading.match(/^(\d+)\.\s*(.+)$/);
  if (!match) {
    return {
      slideId: slugify(rawHeading),
      title: rawHeading.trim(),
    };
  }

  return {
    slideId: `${match[1]}-${slugify(match[2])}`,
    title: match[2].trim(),
  };
}

function pushFieldValue(slide, field, value) {
  if (!field || !value) {
    return;
  }

  if (field === "layout") {
    slide.layout = value;
  } else if (field === "visual") {
    slide.visual_prompt = slide.visual_prompt ? `${slide.visual_prompt} ${value}` : value;
  } else if (field === "content") {
    slide.body.push(value);
  } else if (field === "notes") {
    slide.notes.push(value);
    const sourceRef = extractSourceRef(value);
    if (sourceRef && !slide.source_refs.includes(sourceRef)) {
      slide.source_refs.push(sourceRef);
    }
  }
}

function extractSourceRef(value) {
  const match = value.match(/^来源[：:]\s*(.+)$/);
  return match ? match[1].trim() : "";
}

function finalizeSlide(slide) {
  const required = [];
  if (!slide.layout) required.push("layout");
  if (!slide.visual_prompt) required.push("visual_prompt");
  if (slide.body.length === 0) required.push("body");

  if (required.length) {
    const number = slide.id.split("-")[0];
    throw new Error(`Slide ${number} 缺少必填字段: ${required.join(", ")}`);
  }
}

function validateDeck(deck, slides) {
  if (!deck.title) {
    throw new Error("Deck 缺少必填字段: title");
  }
  if (slides.length === 0) {
    throw new Error("Deck 至少需要一页");
  }
}

function slugify(value) {
  const asciiSlug = value
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");

  if (asciiSlug) {
    return asciiSlug;
  }

  return value
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-") || "slide";
}

module.exports = {
  parseDeckMarkdown,
};
