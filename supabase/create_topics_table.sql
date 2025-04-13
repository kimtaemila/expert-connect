
-- Function to create topics table if it doesn't exist
create or replace function create_topics_table_if_not_exists()
returns void as $$
begin
  -- Check if the table exists
  if not exists (
    select from pg_tables
    where schemaname = 'public'
    and tablename = 'topics'
  ) then
    -- Create the table if it doesn't exist
    create table public.topics (
      id text primary key,
      name text not null,
      type text not null,
      count integer default 0
    );

    -- Add RLS policies
    alter table public.topics enable row level security;
    
    -- Allow all authenticated users to read
    create policy "Allow authenticated users to read topics"
      on public.topics for select
      to authenticated
      using (true);
    
    -- Allow service role to insert/update
    create policy "Allow service role to insert topics"
      on public.topics for insert
      to service_role
      with check (true);
      
    create policy "Allow service role to update topics"
      on public.topics for update
      to service_role
      using (true);
  end if;
end;
$$ language plpgsql security definer;
