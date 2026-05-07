import app from "./app.js";
import https from "https";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);

  // Ping the server every 14 minutes to prevent Render free tier from sleeping
  const url = process.env.RENDER_EXTERNAL_URL;
  if (url) {
    setInterval(() => {
      https.get(url, (res) => {
        console.log(`[Keep-Alive] Pinged ${url} - Status: ${res.statusCode}`);
      }).on('error', (err) => {
        console.error(`[Keep-Alive] Error pinging ${url}:`, err.message);
      });
    }, 14 * 60 * 1000); // 14 minutes
  }
});