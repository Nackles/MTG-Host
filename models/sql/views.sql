drop view winlosses;
create view winlosses as 
select players.id, players.name as player, players.img_link as icon,
(select count(*) from results where players.id = results.player_id and results.outcome = 'W') as w,
(select count(*) from results where players.id = results.player_id and results.outcome = 'L') as l,
round(((select count(*) from results where players.id = results.player_id and results.outcome = 'W') / 
((select count(*) from results where players.id = results.player_id and results.outcome = 'L') + 
 (select count(*) from results where players.id = results.player_id and results.outcome = 'L'))),3) as pct, 
 (select count(*) from results where players.id = results.player_id and results.outcome = 'L') + 
 (select count(*) from results where players.id = results.player_id and results.outcome = 'L') as num_games,
(select max(updated_at) from results where players.id = results.player_id and results.outcome in ('W','L')) as last_played,
(select round(avg(duration)/60) from results where players.id = results.player_id and results.outcome in ('W','L')) as avg_duration
from players
order by players.id
;
select * from winlosses;