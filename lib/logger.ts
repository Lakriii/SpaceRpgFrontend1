import fs from "fs";
import path from "path";

const logFilePath = path.resolve(process.cwd(), "logs", "debug.log");

export function logToFile(message: string) {
  const timestamp = new Date().toISOString();
  const fullMessage = `[${timestamp}] ${message}\n`;

  fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
  fs.appendFileSync(logFilePath, fullMessage, "utf8");
}
