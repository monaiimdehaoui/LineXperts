
INSERT INTO public.role(id,name) VALUES (1,'ACCOUNTING') ON CONFLICT DO NOTHING;
INSERT INTO public.role(id,name) VALUES (2,'OPERATION_MANAGMENT') ON CONFLICT DO NOTHING;
INSERT INTO public.role(id,name) VALUES (3,'GENERAL_MANAGMENT') ON CONFLICT DO NOTHING;


INSERT INTO public.privileges(id, name)VALUES (1, 'WORKFORCE_MANAGMENT') ON CONFLICT DO NOTHING;
INSERT INTO public.privileges(id, name)VALUES (2, 'ACCOUNTING') ON CONFLICT DO NOTHING;


INSERT INTO public.roles_privileges(role_id, privilege_id) VALUES (2, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.roles_privileges(role_id, privilege_id) VALUES (1, 2) ON CONFLICT DO NOTHING;
INSERT INTO public.roles_privileges(role_id, privilege_id) VALUES (3, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.roles_privileges(role_id, privilege_id) VALUES (3, 2) ON CONFLICT DO NOTHING;
