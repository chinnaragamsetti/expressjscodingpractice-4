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
  const playersDetails = await db.all(teamQuery);
  response.send(playersDetails);
});

app.get("/players/", async (request, response) => {
  const { playerId } = request.params;
  const eachteamQuery = `
    SELECT
    *
    FROM
    cricket_team
    WHERE 
    player_id=${playerId};
    `;
  const eachplayersDetails = await db.get(eachteamQuery);
  response.send(eachplayerDetials);
});

app.post("/players/", async (request, response) => {
  const playerDetails = request.body;
  const { playerName, jerseyNumber, role } = playerDetails;

  const addplayerQuery = `
        INSERT INTO
            cricket_team(playerName,jerseyNumber,role)
        VALUES
            (
                '${playerName}',
                ${jerseyNumber},
                '${role}'
            );`;
  const dbresponse = await db.run(addplayerQuery);
  response.send("Player Added to Team");
});

app.put("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const playerDetails = request.body;
  const { playerName, jerseyNumber, role } = playerDetails;
  const updateplayerQuery = `
    UPDATE 
    cricket_team
    SET
    
        playerName='${playerName}',
        jerseyNumber=${jerseyNumber},
        role='${role}'
    
    WHERE
        player_id=${playerId};`;
  await db.run(updateplayerQuery);
  response.send("Player Details Updated");
});

app.delete("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const deleteplayerQuery = `
    DELETE FROM
    cricket_team
    WHERE
    player_id=${palyerId};
    `;
  await db.run(deleteplayerQuery);
  response.send("Player removed");
});
