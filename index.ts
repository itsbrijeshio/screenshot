import { server } from "./src/app";
import { env } from "./src/config";
import job from "./src/jobs";

const PORT = env.PORT || 3000;

server.listen(PORT, () => {
  job();
  console.log(`Server is running on port ${PORT}`);
});
