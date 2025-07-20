import { SIMULATE_WAIT_IN_MS } from "@/lib/post/constants";
import { logColor } from "./log-color";

export default async function simulateWait() {
  if (SIMULATE_WAIT_IN_MS <= 0) return;

  logColor(`Delaying load for ${SIMULATE_WAIT_IN_MS}`);
  await new Promise((resolve) => setTimeout(resolve, SIMULATE_WAIT_IN_MS));
}
