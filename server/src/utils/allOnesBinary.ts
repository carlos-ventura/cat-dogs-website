export const allOnesBinary = (n: number): boolean => {
  const binary = n.toString(2).replace('-', '')
  return binary.length >= 4 && !binary.includes('0')
}
