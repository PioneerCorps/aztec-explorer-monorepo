import express from 'express';
import { connectDB } from "./utils/utils";
import router from './routes/router';

async function main() {
  await connectDB();

  const port = process.env.PORT || 3000;
  const app = express();
  app.use('/',router);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

main();
