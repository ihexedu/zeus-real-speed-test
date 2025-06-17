
export default async function handler(req, res) {
  const start = Date.now();
  let totalSize = 0;
  req.on('data', chunk => {
    totalSize += chunk.length;
  });
  req.on('end', () => {
    const durationSec = (Date.now() - start) / 1000;
    res.status(200).send(durationSec.toString());
  });
}
