// speedtest.js
const DOWNLOAD_SIZE = 5 * 1024 * 1024;
const UPLOAD_SIZE   = 5 * 1024 * 1024;

async function measurePing() {
  const t0 = performance.now();
  await fetch('/api/ping',{cache:'no-store'});
  return Math.round(performance.now() - t0);
}

async function measureDownload() {
  const t0 = performance.now();
  await fetch('/api/download',{cache:'no-store'}).then(r=>r.blob());
  const secs = (performance.now() - t0)/1000;
  return ((DOWNLOAD_SIZE*8)/(secs*1024*1024)).toFixed(2);
}

async function measureUpload() {
  const data = new Uint8Array(UPLOAD_SIZE);
  crypto.getRandomValues(data);
  const t0 = performance.now();
  await fetch('/api/upload',{method:'POST',body:data,cache:'no-store'});
  const secs = (performance.now() - t0)/1000;
  return ((UPLOAD_SIZE*8)/(secs*1024*1024)).toFixed(2);
}

async function startTest(){
  ['ping','download','upload'].forEach(id=>
    document.getElementById(id).innerText = 
      `${id.charAt(0).toUpperCase()+id.slice(1)}: Testing…`
  );
  try {
    const [p,d,u] = await Promise.all([
      measurePing(), measureDownload(), measureUpload()
    ]);
    document.getElementById('ping').innerText     = `Ping: ${p} ms`;
    document.getElementById('download').innerText = `Download: ${d} Mbps`;
    document.getElementById('upload').innerText   = `Upload: ${u} Mbps`;
  } catch {
    ['ping','download','upload'].forEach(id=>
      document.getElementById(id).innerText =
        `${id.charAt(0).toUpperCase()+id.slice(1)}: Failed`
    );
  }
}

document.getElementById('startBtn').addEventListener('click', startTest);
