import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static(join(__dirname, '../dist/client')));

// API routes would go here if needed
app.use('/api', (req, res) => {
  res.json({ message: 'API endpoint ready' });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/client/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});