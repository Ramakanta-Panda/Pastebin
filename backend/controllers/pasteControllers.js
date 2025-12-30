import Paste from "../models/pasteModel.js";
import { now } from "../utils/time.js";

/**
 * CREATE PASTE
 * POST /api/pastes
 */
export const createPaste = async (req, res) => {
  const { content, ttl_seconds, max_views } = req.body;

  // Validation
  if (!content || typeof content !== "string" || !content.trim()) {
    return res.status(400).json({ error: "Invalid content" });
  }

  if (ttl_seconds !== undefined && (!Number.isInteger(ttl_seconds) || ttl_seconds < 1)) {
    return res.status(400).json({ error: "Invalid ttl_seconds" });
  }

  if (max_views !== undefined && (!Number.isInteger(max_views) || max_views < 1)) {
    return res.status(400).json({ error: "Invalid max_views" });
  }

  const currentTime = now(req);

  const expiresAt = ttl_seconds
    ? new Date(currentTime.getTime() + ttl_seconds * 1000)
    : null;

  const paste = await Paste.create({
    content,
    expiresAt,
    maxViews: max_views ?? null,
  });

  // ✅ ONLY return ID (DO NOT return URL)
  res.status(201).json({
    id: paste._id.toString(),
  });
};

/**
 * FETCH PASTE (API)
 * GET /api/pastes/:id
 */
export const getPasteApi = async (req, res) => {
  const paste = await Paste.findById(req.params.id);
  if (!paste) return res.status(404).json({ error: "Not found" });

  const currentTime = now(req);

  if (paste.expiresAt && paste.expiresAt <= currentTime) {
    return res.status(404).json({ error: "Expired" });
  }

  if (paste.maxViews && paste.views >= paste.maxViews) {
    return res.status(404).json({ error: "View limit exceeded" });
  }

  paste.views += 1;
  await paste.save();

  res.json({
    content: paste.content,
    remaining_views: paste.maxViews
      ? paste.maxViews - paste.views
      : null,
    expires_at: paste.expiresAt ?? null,
  });
};

/**
 * VIEW PASTE (HTML)
 * GET /p/:id
 */
export const getPasteHtml = async (req, res) => {
  const paste = await Paste.findById(req.params.id);
  if (!paste) return res.status(404).send("Not found");

  const currentTime = now(req);

  if (paste.expiresAt && paste.expiresAt <= currentTime) {
    return res.status(404).send("Expired");
  }

  if (paste.maxViews && paste.views >= paste.maxViews) {
    return res.status(404).send("View limit exceeded");
  }

  paste.views += 1;
  await paste.save();

  const safeContent = paste.content
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  res.status(200).send(`
    <!doctype html>
    <html>
      <body>
        <pre>${safeContent}</pre>
      </body>
    </html>
  `);
};
