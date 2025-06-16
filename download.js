
export default function handler(req, res) {
  const size = 2 * 1024 * 1024; // 2 MB
  const buffer = Buffer.alloc(size, '0');
  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Length', buffer.length);
  res.send(buffer);
}
