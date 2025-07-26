import cron from "node-cron";
import { cloudinary, env } from "../config";
import { logger } from "../utils";

const jobSchedule = env.CRON_JOB_TIME || "0 * * * *";

// 1 hours
const job = () =>
  cron.schedule(jobSchedule, async () => {
    try {
      // Step 1: List all resources in the folder
      const listResult = await cloudinary.api.resources({
        type: "upload",
        prefix: `screenshots`, // folder path
        max_results: 500,
      });
      if (listResult.resources.length === 0) {
        logger.info(
          `Found ${listResult.resources.length} resources in the folder.`
        );
        return;
      }

      // Step 2: Collect public_ids
      const publicIds = listResult.resources.map((file: any) => file.public_id);
      if (publicIds.length === 0) {
        logger.info(`Found ${publicIds.length} resources in the folder.`);
        return;
      }

      // Step 3: Delete all resources
      const deleteResult = await cloudinary.api.delete_resources(publicIds);
      if (deleteResult.deleted.length === 0) {
        logger.info(`Deleted ${deleteResult.deleted.length} resources.`);
        return;
      }

      // Step 4 (optional): Delete folder itself (only works if empty)
      await cloudinary.api.delete_folder("screenshots");
      logger.info(
        `Cron job completed successfully. Deleted ${deleteResult.deleted} resources.`
      );
    } catch (error) {
      logger.error("Cron job failed: Cloudinary =>", error);
    }
  });

export default job;
