
async function startTest() {
  document.getElementById("ping").innerText = "Ping: Testing...";
  document.getElementById("download").innerText = "Download: Testing...";
  document.getElementById("upload").innerText = "Upload: Testing...";

  try {
    const pingStart = performance.now();
    await fetch("/api/ping");
    const pingEnd = performance.now();
    const pingTime = Math.round(pingEnd - pingStart);

    const downloadResp = await fetch("/api/download");
    const downloadSize = (await downloadResp.blob()).size;
    const downloadMbps = (downloadSize * 8 / 1_000_000).toFixed(2);

    const uploadResp = await fetch("/api/upload", {
      method: "POST",
      body: new Blob([new Uint8Array(2_000_000)]),
    });
    const uploadTime = (await uploadResp.text()).trim();
    const uploadMbps = (2 * 8 / parseFloat(uploadTime)).toFixed(2);

    document.getElementById("ping").innerText = `Ping: ${pingTime} ms`;
    document.getElementById("download").innerText = `Download: ${downloadMbps} Mbps`;
    document.getElementById("upload").innerText = `Upload: ${uploadMbps} Mbps`;

  } catch (err) {
    document.getElementById("ping").innerText = "Ping: Failed";
    document.getElementById("download").innerText = "Download: Failed";
    document.getElementById("upload").innerText = "Upload: Failed";
    console.error(err);
  }
}
