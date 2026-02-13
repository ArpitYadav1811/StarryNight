/**
 * Utility script to generate SHA-256 hashes for puzzle answers
 * Run this in the browser console or as a Node.js script to generate hashes
 * 
 * Usage in browser console:
 * import { hashString } from './lib/hash';
 * hashString('your answer').then(console.log);
 * 
 * Or use this online tool: https://emn178.github.io/online-tools/sha256.html
 */

import { hashString } from "./hash";

// Example: Generate hash for common answers
async function generateHashes() {
  const answers = ["love", "heart", "bond"];
  
  for (const answer of answers) {
    const hash = await hashString(answer);
    console.log(`Answer: "${answer}"`);
    console.log(`Hash: ${hash}`);
    console.log("---");
  }
}

// Uncomment to run:
// generateHashes();

export { generateHashes };
