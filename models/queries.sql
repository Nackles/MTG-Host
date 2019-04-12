-- Queries used in mtg-ben

-- Easy one just to get a functioning query in there
select g.id as 'GameID', p.player_name as "WON_BY",player1_id, player2_id, player3_id, player4_id, duration, g.updated_at as "Date/Time" 
from 
game g
left join player p on g.winner_id = p.id;

-- little harder but still basic
select tl.game_id as 'GameID', p.player_name as 'TokenPutBy', t.name as "TokenPut", t.color, t.type, t.pt,t.abilities,  tl.updated_at as 'Date/Time'
from token_log tl
left join game g on tl.game_id = g.id
left join player p on tl.player_id = p.id
left join token t on tl.token_id = t.id
;
-- This one still broke... trying to figure out the joins needed to get won/loss, standings, etc when games have different number of players
select game.id, winner_sub.name as "WINNER", player1_sub.name as "Player1",game.life1 as "End1Life" , player2_sub.name as "Player2", game.life2 as "End2Life" ,
player3_sub.name as "Player3",  game.life3 as "End3Life" , player4_sub.name as "Player4",  game.life4 as "End4Life" , 
game.duration, ( now() - game.updated_at)/60 as "Calculated Minutes"
from game
left join (select id, name from player) as player1_sub on game.player1_id = player1_sub.id
left join (select id, name from player) as player2_sub on game.player2_id = player2_sub.id
left join (select id, name from player) as player3_sub on game.player3_id = player3_sub.id
left join (select id, name from player) as player4_sub on game.player4_id = player4_sub.id
left join (select id, name from player) as winner_sub on game.winner_id = winner_sub.id
where game.id in (1,2);

-- raw win loss results, will want to add a way to get the head to head subqueries created (e.g., KingJoffrey v Tyrion W/L)
select player.name, result.outcome, round(avg(result.life)), round(avg(result.duration)), count(*) from result
left join player on  result.player_id = player.id
group by 1,2
order by 1,2 desc;


