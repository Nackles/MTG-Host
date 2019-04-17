-- Queries used in mtg-ben

-- CRUDE AND EASY QUERY TO SMOKE TEST WITH.  REMOVE WHEN NO LONGER NEEDED
select g.id as 'GameID', p.name as "WON_BY",player1_id, player2_id, player3_id, player4_id, duration, g.updated_at as "Date/Time" 
from 
games g
left join players p on g.winner_id = p.id;

-- QUERY TO PULL ALL TOKENS PLAYED IN GAMES
select tl.game_id as GameID, p.name as TokenPutBy, t.name as TokenPut, t.color, t.type, t.pt,t.abilities,  tl.updated_at as DateTimePlayed
from token_logs tl
left join games g on tl.game_id = g.id
left join players p on tl.player_id = p.id
left join tokens t on tl.token_id = t.id
where g.id = 1 and p.id = 4
;
-- QUERY TO RETURN WINNERS AND LOSERS OF EACH MATCH IN DASHBOARD FORMAT (need to add a parameter for dropped game match to track the rage quitters!).  This could be used for admins who need a 
-- dashboard of all games in process to monitor network stats.  Also could be used for regular data collection
select g.id as GameID, winner_sub.name as WINNER,
-- player1_sub.name as "Player1", g.life1 as "End1Life",
-- player2_sub.name as "Player2", g.life2 as "End2Life",
-- player3_sub.name as "Player3",  g.life3 as "End3Life",
-- player4_sub.name as "Player4",  g.life4 as "End4Life",
case when player1_sub.name = winner_sub.name then 1 else player1_sub.name end as PlayerSpot1, g.life1 as Ending1Life,
case when player2_sub.name = winner_sub.name then 1 else player2_sub.name end as PlayerSpot2, g.life2 as Ending2Life,
case when player3_sub.name = winner_sub.name then 1 else player3_sub.name end as PlayerSpot3, g.life3 as Ending3Life,
case when player4_sub.name = winner_sub.name then 1 else player4_sub.name end as PlayerSpot4, g.life4 as Ending4Life,
g.duration, round(( now() - g.updated_at)/60) as CalculatedMinutes
from games g
left join (select id, name from players) as player1_sub on g.player1_id = player1_sub.id
left join (select id, name from players) as player2_sub on g.player2_id = player2_sub.id
left join (select id, name from players) as player3_sub on g.player3_id = player3_sub.id
left join (select id, name from players) as player4_sub on g.player4_id = player4_sub.id
left join (select id, name from players) as winner_sub on g.winner_id = winner_sub.id
;
-- QUERY TO GET WIN/LOSS RESULTS
select players.name as MagicPlayer, players.img_link as icon,
(select @X := count(*) from results where players.id = results.player_id and results.outcome = 'W') as W,
(select @Y := count(*) from results where players.id = results.player_id and results.outcome = 'L') as L,
round((@X / (@X + @Y)),3) as Pct, @X + @Y as NumGames,
(select max(updated_at) from results where players.id = results.player_id and results.outcome in ('W','L')) as LastPlayed,
(select round(avg(duration)/60) from results where players.id = results.player_id and results.outcome in ('W','L')) as AvgDurationMins
from players
order by Pct desc
;

-- raw win loss results, will want to add a way to get the head to head subqueries created (e.g., KingJoffrey v Tyrion W/L)
-- I need to add foreign keys to this table but not yet because the data is all seeds (and there will be insert errors)
select p.name, r.outcome, round(avg(r.life)) as AvgLife, round(avg(r.duration)) as Duration, count(*) 
from results r left join players p on  r.player_id = p.id
group by 1,2
order by 1,2 desc;


