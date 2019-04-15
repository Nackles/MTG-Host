create view winloss as 
select player.name as MagicPlayer, player.img_link as icon,
(select count(*) from result where player.id = result.player_id and result.outcome = 'W') as W,
(select count(*) from result where player.id = result.player_id and result.outcome = 'L') as L,
round(((select count(*) from result where player.id = result.player_id and result.outcome = 'W') / 
((select count(*) from result where player.id = result.player_id and result.outcome = 'L') + 
 (select count(*) from result where player.id = result.player_id and result.outcome = 'L'))),3) as Pct, 
 (select count(*) from result where player.id = result.player_id and result.outcome = 'L') + 
 (select count(*) from result where player.id = result.player_id and result.outcome = 'L') as NumGames,
(select max(updated_at) from result where player.id = result.player_id and result.outcome in ('W','L')) as LastPlayed,
(select round(avg(duration)/60) from result where player.id = result.player_id and result.outcome in ('W','L')) as AvgDurationMins
from player
order by Pct desc
;
select * from winloss;