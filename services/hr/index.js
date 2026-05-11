const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3002;

app.get('/api/hr/health', (req, res) => {
  res.json({ status: 'ok', service: 'HR Service' });
});

app.listen(PORT, () => {
  console.log(`HR Service running on port ${PORT}`);
});
