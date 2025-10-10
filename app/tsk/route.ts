// app/api/tasks/route.ts
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  // Build the absolute path to tasks.json
  const filePath = path.join(process.cwd(), "data", "tasks.json");

  // Read the file
  const data = await fs.readFile(filePath, "utf-8");

  // Convert JSON string to object
  const tasks = JSON.parse(data);

  // Return as JSON response
  return new Response(JSON.stringify(tasks.tasks), {
    headers: { "Content-Type": "application/json" }
  });
}
