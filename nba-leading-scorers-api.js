const express = require('express');
const axios = require('axios');

const app = express();

// Define a route for handling GET requests to the leading scorers endpoint
app.get('/leading-scorers', async (req, res) => {
  try {
    // Make a GET request to the NBA API to retrieve leading scorer data
    const response = await axios.get('https://www.nba.com/stats/leaders');

    // Parse the data from the response
    const data = response.data;

    // Extract the leading scorers data from the response
    const leadingScorers = data.resultSets[0].rowSet.map((row) => {
      const [rank, playerId, playerName, teamId, teamName, gamesPlayed, points] = row;
      return { rank, playerId, playerName, teamId, teamName, gamesPlayed, points };
    });

    // Send the leading scorers data as a response to the client
    res.send(leadingScorers);
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error(error);
    res.status(500).send('Error retrieving leading scorers data');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
