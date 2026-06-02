import dotenv from "dotenv";
import { app } from "./app";
import { initPackages } from "./common/init";

dotenv.config();
const PORT = process.env.PORT || 3000;

initPackages()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running smoothly on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("💥 Failed to initialize packages and database:", error);
    process.exit(1);
  });
