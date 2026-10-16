alter table public.members add column if not exists country text;

update public.members set country = '' where country is null;

alter table public.members alter column country set not null;
