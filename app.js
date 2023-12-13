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
      driver: sqlite3.Database,
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

const convertdbObject = (eachplayer) => {
  return {
    playerId: eachplayer.player_id,
    playerName: eachplayer.player_name,
    jerseyNumber: eachplayer.jersey_number,
    role: eachplayer.role,
  };
};

app.get("/players/", async (request, response) => {
  const teamQuery = `
    SELECT
    *
    FROM
    cricket_team;
    `;
  const playersDetails = await db.all(teamQuery);
  response.send(
    playersDetails.map((eachplayer) => convertdbObject(eachplayer))
  );
});

app.get("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const eachplayerQuery = `
    SELECT
    *
    FROM
    cricket_team
    WHERE 
    player_id=${playerId};
    `;
  const eachplayerDetails = await db.get(eachplayerQuery);
  response.send(convertdbObject(eachplayer));
});

app.post("/players/", async (request, response) => {
  const { playerName, jerseyNumber, role } = request.body;
  const addplayerQuery = `
        INSERT INTO
            cricket_team(player_name, jersey_number, role)
        VALUES
            (
                '${playerName}',
                ${jerseyNumber},
                '${role}'
            );`;
  await db.run(addplayerQuery);
  response.send("Player Added to Team");
});

app.post("/players/", async (request, response) => {
  const { playerName, jerseyNumber, role } = request.body;
  const postPlayerQuery = `
  INSERT INTO
    cricket_team (player_name, jersey_number, role)
  VALUES
    ('${playerName}', ${jerseyNumber}, '${role}');`;
  const player = await database.run(postPlayerQuery);
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
    
        player_name='${playerName}',
        jersey_number=${jerseyNumber},
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

module.exports = app;
