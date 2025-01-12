export default function (name) {
  if (typeof name !== 'string') {
    return '';
  }

  return name
    .toUpperCase()
    .split(new RegExp('[-_.]', 'g'))
    .map((s) => s.charAt(0))
    .join('');
}
