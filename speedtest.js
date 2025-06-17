const SIZE = 5*1024*1024;
async function ping() {
  let t0=performance.now();
  await fetch('/api/ping',{cache:'no-store'});
  return Math.round(performance.now()-t0);
}
async function download() {
  let t0=performance.now();
  await fetch('/api/download',{cache:'no-store'}).then(r=>r.blob());
  return ((SIZE*8)/((performance.now()-t0)/1000)/(1024*1024)).toFixed(2);
}
async function upload() {
  let data=new Uint8Array(SIZE);
  crypto.getRandomValues(data);
  let t0=performance.now();
  await fetch('/api/upload',{method:'POST',body:data,cache:'no-store'});
  return ((SIZE*8)/((performance.now()-t0)/1000)/(1024*1024)).toFixed(2);
}
async function startTest(){
  ['ping','download','upload'].forEach(id=>document.getElementById(id).innerText=`${id.charAt(0).toUpperCase()+id.slice(1)}: Testing…`);
  try {
    let [p,d,u]=await Promise.all([ping(),download(),upload()]);
    document.getElementById('ping').innerText=`Ping: ${p} ms`;
    document.getElementById('download').innerText=`Download: ${d} Mbps`;
    document.getElementById('upload').innerText=`Upload: ${u} Mbps`;
  } catch {
    ['ping','download','upload'].forEach(id=>document.getElementById(id).innerText=`${id.charAt(0).toUpperCase()+id.slice(1)}: Failed`);
  }
}
document.getElementById('startBtn').addEventListener('click',startTest);
