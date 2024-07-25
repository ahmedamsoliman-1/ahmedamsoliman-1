




let keyspaces = {

  

  aams: {
    name: 'aams',
    replication: '{ "class": "SimpleStrategy", "replication_factor": 1 }',
    tables: {
      logs: {
        name: 'logs',
        description: '',
        schema: `(
            log_id UUID,
            timestamp TEXT,
            method TEXT,
            url TEXT,
            ip TEXT,
            message TEXT,
            agent TEXT,
            host TEXT,
            PRIMARY KEY (log_id),
          )`
      },
      users: {
        name: 'users',
        description: '',
        schema: `(
            user_id UUID,
            username TEXT,
            password TEXT,
            first_name TEXT,
            last_name TEXT,
            email TEXT,
            phone TEXT,
            role TEXT,
            status TEXT,
            created_at TIMESTAMP,
            aws_user_role TEXT,
            user_avatar TEXT,
            PRIMARY KEY (user_id),
          )`
      },
    },
    functions: {
      udf_aams: {
        name: 'udf_aams',
        language: 'javascript', 
        body: `
        $$
          console.log("UDF");
        $$`
      },
    
      udf_2_update_player_stats_aams: {
        name: 'udf_2_update_player_stats_aams',
        language: 'javascript', 
        body: `
        $$
          var updatePlayerStatsQuery = "UPDATE cs2_player_stats SET total_games_played = total_games_played + 1 WHERE player_id = ?";
          var player_id = arguments[0]; // Assuming player_id is passed as the first argument to the UDF
          var updatePlayerStatsParams = [player_id];
    
          // Execute the update query
          var result = client.execute(updatePlayerStatsQuery, updatePlayerStatsParams, { prepare: true });
    
          // Log the result if needed
          console.log("Player stats updated for player ID:", player_id);
        $$
        `
      }
    }
  }


};










module.exports = {
  keyspaces,
  
};