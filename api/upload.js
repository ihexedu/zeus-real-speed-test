export default function handler(req,res){
  let received=0;
  req.on('data',c=>received+=c.length);
  req.on('end',()=>res.status(200).json({received}));
}
