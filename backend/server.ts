import "dotenv/config";

interface IError {
  name: string;
  message: string;
}
// Handling uncaught exception errorors which are not happening in express
process.on("uncaughtException", (error: IError) => {
  console.log(error.name, error.message);
  console.log("Uncaught Exception occured! Shutting down...");
  process.exit(1);
});

const port = process.env.PORT || 8085;
import app from "./app";
const server = app.listen(port, () =>
  console.log("\nRunning Server Environment:", process.env.NODE_ENV)
);

// Handling unhandled rejection errorors which are not happening in express
process.on("unhandledRejection", (error: IError) => {
  console.log(error.name, error.message);
  console.log("Unhandled rejection occured! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
