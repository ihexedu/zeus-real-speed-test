export default function handler(req, res) {
  // serve a 20 MB buffer directly
  const size = 20 * 1024 * 1024;          
  const buffer = Buffer.alloc(size, 'a'); 
  res.setHeader('Content-Type', 'application/octet-stream');
  res.send(buffer);
}
