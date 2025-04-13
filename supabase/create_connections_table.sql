
-- Function to create connections table if it doesn't exist
create or replace function create_connections_table_if_not_exists()
returns void as $$
begin
  -- Check if the table exists
  if not exists (
    select from pg_tables
    where schemaname = 'public'
    and tablename = 'connections'
  ) then
    -- Create the table if it doesn't exist
    create table public.connections (
      id uuid primary key default gen_random_uuid(),
      source_id text not null,
      target_id text not null,
      strength integer default 1
    );

    -- Add RLS policies
    alter table public.connections enable row level security;
    
    -- Allow all authenticated users to read
    create policy "Allow authenticated users to read connections"
      on public.connections for select
      to authenticated
      using (true);
    
    -- Allow service role to insert/update
    create policy "Allow service role to insert connections"
      on public.connections for insert
      to service_role
      with check (true);
      
    create policy "Allow service role to update connections"
      on public.connections for update
      to service_role
      using (true);
  end if;
end;
$$ language plpgsql security definer;
