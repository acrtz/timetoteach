create table documents (
    id uuid primary key default gen_random_uuid(),
    version numeric not null,
    created_at timestamp with time zone default now() not null,
    prompt text not null
);

alter table "documents" enable row level security;

--*********************************************************
-- ROW LEVEL SECURITY 
-- update policy for update and delete if user
-- authentication is enabled
--*********************************************************
create policy "documents are visible to everyone."
on documents for select
to anon
using ( true );

create policy "documents can be created by everyone."
on documents for insert
to anon
with check ( true );

create policy "documents can be updated by everyone."
on documents for update
to anon
using ( true )
with check ( true );

create policy "documents can be deleted by everyone."
on documents for delete
to anon
using ( true );
