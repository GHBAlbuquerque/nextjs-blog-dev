import { logColor } from "./log-color";

const simulateWaitMs = Number(process.env.SIMULATE_WAIT_IN_MS) || 0;

export default async function simulateWait() {
  if (simulateWaitMs <= 0) return;

  logColor(`Delaying load for ${simulateWaitMs}`);
  await new Promise((resolve) => setTimeout(resolve, simulateWaitMs));
}
