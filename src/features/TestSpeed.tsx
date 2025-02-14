import { useState, useEffect } from "react";

interface DataPoint {
  time: number;
  size: number;
}

export default function SpeedTest() {
  const [downloadSpeed, setDownloadSpeed] = useState<string | null>(null);

  useEffect(() => {
    let downloadedAmount = 0;
    const startTime = Date.now();
    const dataPoints: DataPoint[] = []; 

    function handleDownload(
      status: "data" | "done",
      receivedPacketByteSize: number
    ) {
      downloadedAmount += receivedPacketByteSize;
      const currentTime = Date.now() - startTime;
      dataPoints.push({ time: currentTime, size: downloadedAmount });

      if (status === "done") {
        const totalTime = (Date.now() - startTime) / 1000;

        if (totalTime > 4) {
          // Đảm bảo có ít nhất 4 giây dữ liệu
          const filteredData = dataPoints.filter(
            (point) =>
              point.time >= 2000 && point.time <= totalTime * 1000 - 2000
          );

          if (filteredData.length > 1) {
            const validBytes =
              filteredData[filteredData.length - 1].size - filteredData[0].size;
            const validTime =
              (filteredData[filteredData.length - 1].time -
                filteredData[0].time) /
              1000;

            const speed = validBytes / validTime;
            setDownloadSpeed((speed / 1000).toFixed(2) + " kB/s");
          } else {
            setDownloadSpeed("Không đủ dữ liệu");
          }
        } else {
          setDownloadSpeed("Không đủ dữ liệu");
        }
      }
    }

    downloadSimulator(handleDownload);
  }, []);

  return (
    <div>
      <h1>Download Speed Test</h1>
      {downloadSpeed !== null ? (
        <p>Download Speed: {downloadSpeed}</p>
      ) : (
        <p>Measurement download speed...</p>
      )}
    </div>
  );
}

function downloadSimulator(
  cb: (status: "data" | "done", receivedPacketByteSize: number) => void
): Promise<void> {
  return new Promise((resolve) => {
    const totalAmount = 10 * 1000 * 1000;
    let downloadedAmount = 0;
    let status: "data" | "done" = "data";

    async function download() {
      while (downloadedAmount < totalAmount) {
        const timeOut = Math.random() * 300;
        await wait(timeOut);
        let packetSize = Math.random() * 1000 * 1000;
        if (packetSize + downloadedAmount >= totalAmount) {
          packetSize = totalAmount - downloadedAmount;
          status = "done";
        }
        cb(status, packetSize);
        downloadedAmount += packetSize;
      }
      resolve();
    }

    download();
  });
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
