alter table public.members add column if not exists telegram_id text;
alter table public.members add column if not exists discord_id text;
alter table public.members add column if not exists whatsapp text;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'members'
      and column_name = 'contact_id'
  ) then
    update public.members
      set telegram_id = contact_id
      where contact_channel = 'telegram' and telegram_id is null;
    update public.members
      set discord_id = contact_id
      where contact_channel = 'discord' and discord_id is null;
    update public.members
      set whatsapp = contact_id
      where contact_channel = 'whatsapp' and whatsapp is null;
    alter table public.members drop column contact_channel;
    alter table public.members drop column contact_id;
  end if;
end $$;

alter table public.members drop constraint if exists members_has_contact;
alter table public.members add constraint members_has_contact check (
  coalesce(telegram_id, '') <> ''
  or coalesce(discord_id, '') <> ''
  or coalesce(whatsapp, '') <> ''
);
