

INSERT INTO public.role(id,name) VALUES (1,'ACCOUNTING') ON CONFLICT DO NOTHING;
INSERT INTO public.role(id,name) VALUES (2,'OPERATION_MANAGMENT') ON CONFLICT DO NOTHING;
INSERT INTO public.role(id,name) VALUES (3,'GENERAL_MANAGMENT') ON CONFLICT DO NOTHING;


INSERT INTO public.privileges(id, name)VALUES (1, 'WORKFORCE_MANAGMENT') ON CONFLICT DO NOTHING;
INSERT INTO public.privileges(id, name)VALUES (2, 'ACCOUNTING') ON CONFLICT DO NOTHING;

create or replace function create_constraint_if_not_exists (t_name text, c_name text, constraint_sql text) returns void AS '
begin
    -- Look for our constraint
    if not exists (select constraint_name 
                   from information_schema.constraint_column_usage 
                   where table_name = t_name  and constraint_name = c_name) then
        execute constraint_sql;
    end if;
end;'
language 'plpgsql';

SELECT create_constraint_if_not_exists('roles_privileges','roles_privileges_pkey','alter table roles_privileges add primary key (role_id,privilege_id);');

INSERT INTO public.roles_privileges(role_id, privilege_id) VALUES (2, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.roles_privileges(role_id, privilege_id) VALUES (1, 2) ON CONFLICT DO NOTHING;
INSERT INTO public.roles_privileges(role_id, privilege_id) VALUES (3, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.roles_privileges(role_id, privilege_id) VALUES (3, 2) ON CONFLICT DO NOTHING;



