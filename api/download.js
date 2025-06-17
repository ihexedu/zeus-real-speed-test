
export default function handler(req, res) {
  const sizeInBytes = 5 * 1024 * 1024;
  const buffer = Buffer.alloc(sizeInBytes, '0');
  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Length', sizeInBytes);
  res.status(200).send(buffer);
}
