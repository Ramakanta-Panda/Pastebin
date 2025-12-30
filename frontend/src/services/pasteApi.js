const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  console.warn("VITE_API_BASE_URL is not set");
}

// CREATE PASTE
export async function createPaste(payload) {
  const response = await fetch(`${API_BASE_URL}/api/pastes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create paste");
  }

  return response.json();
}

// FETCH PASTE BY ID
export async function getPasteById(id) {
  const response = await fetch(`${API_BASE_URL}/api/pastes/${id}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Paste unavailable");
  }

  return response.json();
}
