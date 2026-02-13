/**
 * Hash a string using SHA-256
 * This is used to compare user answers with hashed answers from the database
 */
export async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

/**
 * Compare a user answer with a hashed answer from the database
 */
export async function compareAnswer(
  userAnswer: string,
  hashedAnswer: string
): Promise<boolean> {
  const userHash = await hashString(userAnswer);
  return userHash === hashedAnswer.toLowerCase();
}
