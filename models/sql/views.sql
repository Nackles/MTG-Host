drop view winloss;
create view winloss as 

select player.id, player.name as player, player.img_link as icon,
(select count(*) from result where player.id = result.player_id and result.outcome = 'W') as w,
(select count(*) from result where player.id = result.player_id and result.outcome = 'L') as l,
round(((select count(*) from result where player.id = result.player_id and result.outcome = 'W') / 
((select count(*) from result where player.id = result.player_id and result.outcome = 'L') + 
 (select count(*) from result where player.id = result.player_id and result.outcome = 'L'))),3) as pct, 
 (select count(*) from result where player.id = result.player_id and result.outcome = 'L') + 
 (select count(*) from result where player.id = result.player_id and result.outcome = 'L') as num_games,
(select max(updated_at) from result where player.id = result.player_id and result.outcome in ('W','L')) as last_played,
(select round(avg(duration)/60) from result where player.id = result.player_id and result.outcome in ('W','L')) as avg_duration
from player
order by player.id
;
select * from winloss;