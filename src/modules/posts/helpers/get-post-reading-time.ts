function countWords(text: string): number {
  const cleanedText = text.trim().replace(/\s+/g, ' ');
  const wordCount = cleanedText.split(' ').length;
  return wordCount;
}

export function getPostReadingTime(content: string): number {
  const wordsPerMinute = 200;

  const wordCount = countWords(content);
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  return readingTimeMinutes;
}
