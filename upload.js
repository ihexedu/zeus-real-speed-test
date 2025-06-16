
export default async function handler(req, res) {
  const start = Date.now();
  await req.body;
  const duration = (Date.now() - start) / 1000; // seconds
  res.status(200).send(duration.toString());
}
