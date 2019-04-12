-- Queries used in mtg-ben

-- Easy one just to get a functioning query in there
select g.id as 'GameID', u.userid as "WON_BY",player1_id, player2_id, player3_id, player4_id, duration, g.updated_at as "Date/Time" 
from 
game g
left join user u on g.winner_id = u.id;

-- little harder but still basic
select tl.game_id as 'GameID', u.userid as 'TokenPutBy', t.name as "TokenPut", t.color, t.type, t.pt,t.abilities,  tl.updated_at as 'Date/Time'
from token_log tl
left join game g on tl.game_id = g.id
left join user u on tl.user_id = u.id
left join token t on tl.token_id = t.id
;


-- This one still broke... trying to figure out the joins needed to get won/loss, standings, etc when games have different number of players
select * from
games g 
left join user u on g.player1_id = u.id
left join token_log tl on g.id = tl.game_id