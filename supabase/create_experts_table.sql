
-- Function to create experts table if it doesn't exist
create or replace function create_experts_table_if_not_exists()
returns void as $$
begin
  -- Check if the table exists
  if not exists (
    select from pg_tables
    where schemaname = 'public'
    and tablename = 'experts'
  ) then
    -- Create the table if it doesn't exist
    create table public.experts (
      id text primary key,
      name text not null,
      title text,
      industries text[] default array[]::text[],
      skills text[] default array[]::text[],
      connection_strength integer default 0,
      insights text[] default array[]::text[],
      image_url text
    );

    -- Add RLS policies
    alter table public.experts enable row level security;
    
    -- Allow all authenticated users to read
    create policy "Allow authenticated users to read experts"
      on public.experts for select
      to authenticated
      using (true);
    
    -- Allow service role to insert/update
    create policy "Allow service role to insert experts"
      on public.experts for insert
      to service_role
      with check (true);
      
    create policy "Allow service role to update experts"
      on public.experts for update
      to service_role
      using (true);
  end if;
end;
$$ language plpgsql security definer;
