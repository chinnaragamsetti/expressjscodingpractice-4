const express = require("express");
const path = require("path");

const dbpath = path.join(__dirname, "cricketTeam.db");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();

let db = null;

const initializeDb = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite.Database,
    });
    app.listen(3000, () => {
      console.log("server running");
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
initializeDb();

app.get("/players/", async (request, response) => {
  const teamQuery = `
    SELECT
    *
    FROM
    cricket_team;
    `;
  const playersArray = await db.all(teamQuery);
  response.send(playersArray);
});
