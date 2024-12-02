import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

async function read(relativePath) {
  return readFile(resolve(process.cwd(), relativePath), "utf8");
}

function expectIncludes(haystack, needle, description) {
  if (!haystack.includes(needle)) {
    throw new Error(`Missing expected content for ${description}: ${needle}`);
  }
}

const homeHtml = await read("public/index.html");
expectIncludes(
  homeHtml,
  "Software should foster the user's agency, autonomy, and understanding.",
  "homepage hero line",
);
expectIncludes(
  homeHtml,
  "We believe wealth is created when real value is created for clients and users.",
  "homepage primary company messaging",
);

const aboutHtml = await read("public/about/index.html");
expectIncludes(
  aboutHtml,
  "optimistic future-proofing and AI-agent inclusiveness",
  "about-page first-person-plural explanation",
);
expectIncludes(
  aboutHtml,
  "We are currently experimenting with the web because of its openness",
  "about-page current-state wording",
);
expectIncludes(
  aboutHtml,
  "Ultimately, what we are exploring is how, and to what extent",
  "about-page present-oriented framing",
);

const contactHtml = await read("public/contact/index.html");
expectIncludes(
  contactHtml,
  "Unfortunately, we may not be able to answer every message.",
  "contact-page first-person-plural wording",
);

const legalHtml = await read("public/dripwords/privacy/index.html");
expectIncludes(legalHtml, "Dripwords Legal", "Dripwords legal page title");
expectIncludes(
  legalHtml,
  "We do not issue direct refunds for Google Play purchases.",
  "Dripwords legal page refunds text",
);

console.log("Built content assertions passed.");
