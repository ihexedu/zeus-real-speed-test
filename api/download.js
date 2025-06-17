export default function handler(req,res){
  const buf = Buffer.alloc(5*1024*1024,'a');
  res.setHeader('Content-Type','application/octet-stream');
  res.send(buf);
}
