// Tiny inline markup for content files: *text* becomes <em>text</em>.
export default function Rich({ text }) {
  return text.split(/(\*[^*]+\*)/g).map((part, index) =>
    part.length > 2 && part.startsWith('*') && part.endsWith('*') ? (
      <em key={index}>{part.slice(1, -1)}</em>
    ) : (
      part
    ),
  )
}
