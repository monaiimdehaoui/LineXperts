PGDMP                         y            contracts_linexperts    12.5    12.5 ^    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    17106    contracts_linexperts    DATABASE     �   CREATE DATABASE contracts_linexperts WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_Canada.1252' LC_CTYPE = 'English_Canada.1252';
 $   DROP DATABASE contracts_linexperts;
                postgres    false                        2615    17107    linexpert_schema    SCHEMA         CREATE SCHEMA linexpert_schema;
    DROP SCHEMA linexpert_schema;
                postgres    false            �           0    0    SCHEMA linexpert_schema    ACL     0   GRANT ALL ON SCHEMA linexpert_schema TO PUBLIC;
                   postgres    false    8                       1255    17671    add_new_cext_func()    FUNCTION     �  CREATE FUNCTION linexpert_schema.add_new_cext_func() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  def_con_ext varchar :='001';
  def_initial_values numeric :=0;   
BEGIN
 INSERT INTO linexpert_schema.contract_extension(con_id, cext_id, cext_start_date,cext_end_date, cext_closure_date, cext_status, cext_total_cost, cext_invoiced_cost) 
  VALUES (NEW.con_id, def_con_ext,NEW.con_start_date,NEW.con_end_date,NULL,NEW.con_status,def_initial_values,def_initial_values);
RETURN NEW;
END;
 $$;
 4   DROP FUNCTION linexpert_schema.add_new_cext_func();
       linexpert_schema          postgres    false    8                       1255    17673    update_con_enddat_func()    FUNCTION     �  CREATE FUNCTION linexpert_schema.update_con_enddat_func() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    UPDATE linexpert_schema.contract_header
    SET "con_end_date"= NEW.cext_end_date 
	WHERE (con_id=NEW.con_id) AND (NEW.cext_end_date >= 
	    (SELECT MAX(cext_end_date)
       FROM linexpert_schema.contract_extension 
	   WHERE con_id=NEW.con_id));
   RETURN NEW;
END;
$$;
 9   DROP FUNCTION linexpert_schema.update_con_enddat_func();
       linexpert_schema          postgres    false    8                       1255    17677    valid_add_cext_constat_func()    FUNCTION     �  CREATE FUNCTION linexpert_schema.valid_add_cext_constat_func() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
   BEGIN
     IF ((SELECT con_status FROM linexpert_schema.contract_header as ch WHERE ch.con_id=NEW.con_id)='Terminado') 
	THEN
     RAISE EXCEPTION 'A contract extensions can not be added under a terminated contract, choose an active contract';
	 END IF;
     RETURN NEW;
   END;
  $$;
 >   DROP FUNCTION linexpert_schema.valid_add_cext_constat_func();
       linexpert_schema          postgres    false    8                       1255    17667    valid_client_stat_func()    FUNCTION     �  CREATE FUNCTION linexpert_schema.valid_client_stat_func() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
   BEGIN
   IF ((SELECT count(clt_id)  FROM linexpert_schema.client AS cl WHERE clt_status='Activo' AND cl.group_id=NEW.group_id)>0 AND (NEW.group_status='Inactivo'))
	 THEN
     RAISE EXCEPTION 'A group having active clients can not be deactivated, this group has active clients';
 END IF;
RETURN NEW;
END;
$$;
 9   DROP FUNCTION linexpert_schema.valid_client_stat_func();
       linexpert_schema          postgres    false    8                       1255    17669    valid_clt_con_status_func()    FUNCTION     �  CREATE FUNCTION linexpert_schema.valid_clt_con_status_func() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
   BEGIN
     IF ((SELECT COUNT(con_id) FROM linexpert_schema.contract_header as ch WHERE con_status!='Terminado' AND ch.clt_id=NEW.clt_id)>0 AND (NEW.clt_status='Inactivo'))
	THEN
      RAISE EXCEPTION 'A client having active contracts can not be deactivated, this client has active contracts';
	END IF;
   RETURN NEW;
   END;
  $$;
 <   DROP FUNCTION linexpert_schema.valid_clt_con_status_func();
       linexpert_schema          postgres    false    8                       1255    17675    valid_con_cext_status_func()    FUNCTION     �  CREATE FUNCTION linexpert_schema.valid_con_cext_status_func() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
   BEGIN
     IF ((SELECT COUNT(cext_id) FROM linexpert_schema.contract_extension as ce
	WHERE cext_status!='Terminado' AND ce.con_id=NEW.con_id)>0 AND (NEW.con_status='Terminado'))
	THEN
     RAISE EXCEPTION 'A contract having active contract extensions can not be deactivated, this contract has active contract extensions';
	 END IF;
   RETURN NEW;
   END;
  $$;
 =   DROP FUNCTION linexpert_schema.valid_con_cext_status_func();
       linexpert_schema          postgres    false    8                       1255    17682    valid_dates_serv_con_func()    FUNCTION     �  CREATE FUNCTION linexpert_schema.valid_dates_serv_con_func() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
     IF ((SELECT cext_start_date FROM linexpert_schema.contract_extension as ce
	WHERE ce.con_id=NEW.con_id AND ce.cext_id=NEW.cext_id)>NEW.ser_start_date) 
	THEN
     RAISE EXCEPTION 'The start date of a service on a contract extension must be equal or later than the main contract extension start date';
	 END IF;
	   IF ((SELECT cext_end_date FROM linexpert_schema.contract_extension as ce
	WHERE ce.con_id=NEW.con_id AND ce.cext_id=NEW.cext_id)<NEW.ser_end_date) 
	THEN
     RAISE EXCEPTION 'The end date of a service on a contract extension must be equal or earlier than the main contract extension end date';
	 END IF;
	 RETURN NEW;
   END;
$$;
 <   DROP FUNCTION linexpert_schema.valid_dates_serv_con_func();
       linexpert_schema          postgres    false    8            !           1255    17684    valid_dates_wrk_srv_func()    FUNCTION     1  CREATE FUNCTION linexpert_schema.valid_dates_wrk_srv_func() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
   IF ((SELECT ser_start_date FROM linexpert_schema.service_by_contract as sc
	WHERE sc.con_id=NEW.con_id AND sc.cext_id=NEW.cext_id AND sc.ser_id=NEW.ser_id)>NEW.wrk_ser_start_date) 
	THEN
     RAISE EXCEPTION 'The start date of a workforce assigned to a service  must be equal or later than the service by contract start date';
	 END IF;
	      IF ((SELECT ser_end_date FROM linexpert_schema.service_by_contract as sc
	WHERE sc.con_id=NEW.con_id AND sc.cext_id=NEW.cext_id AND sc.ser_id=NEW.ser_id)<NEW.wrk_ser_end_date) 
	THEN
     RAISE EXCEPTION 'The end date of a workforce assigned to a service  must be equal or earlier than the service by contract end date';
	 END IF;
	 RETURN NEW;
   END;
$$;
 ;   DROP FUNCTION linexpert_schema.valid_dates_wrk_srv_func();
       linexpert_schema          postgres    false    8                       1255    17665    valid_group_stat_func()    FUNCTION     w  CREATE FUNCTION linexpert_schema.valid_group_stat_func() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
   BEGIN
     IF (SELECT group_status FROM linexpert_schema.corporate_group AS gr
       WHERE gr.group_id = NEW.group_id)='Inactivo' THEN
     RAISE EXCEPTION 'A client must be assigned to an active group, this one is inactive';
   END IF;
   RETURN NEW;
   END;
   $$;
 8   DROP FUNCTION linexpert_schema.valid_group_stat_func();
       linexpert_schema          postgres    false    8                        1255    17686    valid_wrk_srv_q_func()    FUNCTION     �  CREATE FUNCTION linexpert_schema.valid_wrk_srv_q_func() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
     IF (SELECT COUNT(wq.wrk_id) FROM linexpert_schema.workforce_qualification AS wq
	     WHERE wq.ser_id=NEW.ser_id AND wq.wrk_id=NEW.wrk_id)=0
	THEN
     RAISE EXCEPTION 'This workforce resource does not have the qualification for the service assigned';
	 END IF;
	 RETURN NEW;
   END;
$$;
 7   DROP FUNCTION linexpert_schema.valid_wrk_srv_q_func();
       linexpert_schema          postgres    false    8                       1255    17680    valid_wrk_stat_assig_func()    FUNCTION     v  CREATE FUNCTION linexpert_schema.valid_wrk_stat_assig_func() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
   BEGIN
     IF (SELECT wrk_status FROM linexpert_schema.workforce AS wf
	     WHERE wf.wrk_id = NEW.wrk_id)='En Retiro' THEN
     RAISE EXCEPTION 'Workforce resource must not be retired to be assigned. This one is retired';
	 END IF;
   RETURN NEW; 
   END;
  $$;
 <   DROP FUNCTION linexpert_schema.valid_wrk_stat_assig_func();
       linexpert_schema          postgres    false    8            �            1259    17127    client    TABLE     �  CREATE TABLE linexpert_schema.client (
    clt_id character varying(30) NOT NULL,
    group_id character varying(30) NOT NULL,
    clt_identification character varying(45) NOT NULL,
    clt_official_name character varying(40) NOT NULL,
    clt_commercial_name character varying(40) NOT NULL,
    clt_first_name character varying(40) NOT NULL,
    clt_last_name character varying(40) NOT NULL,
    clt_address character varying(50) NOT NULL,
    clt_city character varying(20) NOT NULL,
    clt_region character varying(20) NOT NULL,
    clt_country character varying(20) NOT NULL,
    clt_phone_no character varying(20) NOT NULL,
    clt_cell_no character varying(20) DEFAULT 'No Number Saved'::character varying,
    clt_email_addr character varying(55) DEFAULT 'TBD'::character varying,
    clt_status character varying(10),
    CONSTRAINT "Clt_id_type" CHECK (((clt_identification)::text = ANY (ARRAY['CC- CEDULA DE CIUDADANIA'::text, 'CE- CEDULA DE EXTRANJERIA'::text, 'NIT- NUM. DE IDENTIF. TRIBUTARIA'::text, 'RUT- REGISTRO UNICO TRIBUTARIO'::text, 'TI- TARJETA DE IDENTIDAD'::text, 'SSN- SOCIAL SECURITY NUMBER'::text, 'PPN- PASAPORTE INTERNACIONAL'::text, 'CRCPF- CEDULA PERSONAL FISICA'::text, 'CPJ- CEDULA PERSONAL JURIDICA'::text, 'DIMEX- DOC. IDENTIF. MIGRACION Y EXTRANJERIA'::text, 'DIDI- DOC. IDENTIF. DIPLOMATICOS'::text]))),
    CONSTRAINT "clt_status Values" CHECK (((clt_status)::text = ANY (ARRAY['Activo'::text, 'Inactivo'::text])))
);
 $   DROP TABLE linexpert_schema.client;
       linexpert_schema         heap    postgres    false    8            �           0    0 "   CONSTRAINT "Clt_id_type" ON client    COMMENT     c   COMMENT ON CONSTRAINT "Clt_id_type" ON linexpert_schema.client IS 'Accepted values for Client_ID';
          linexpert_schema          postgres    false    204            �           0    0 (   CONSTRAINT "clt_status Values" ON client    COMMENT     [   COMMENT ON CONSTRAINT "clt_status Values" ON linexpert_schema.client IS 'Values accepted';
          linexpert_schema          postgres    false    204            �            1259    17152    contract_extension    TABLE     �  CREATE TABLE linexpert_schema.contract_extension (
    con_id character varying(30) NOT NULL,
    cext_id character varying(27) NOT NULL,
    cext_start_date date NOT NULL,
    cext_end_date date NOT NULL,
    cext_closure_date date,
    cext_status character varying(16) NOT NULL,
    cext_total_cost numeric(13,2),
    cext_invoiced_cost numeric(13,2) DEFAULT 0.00,
    CONSTRAINT "Status_Values" CHECK (((cext_status)::text = ANY (ARRAY['En Tramite'::text, 'Vigente'::text, 'Terminado'::text]))),
    CONSTRAINT cext_date_closure_date CHECK ((cext_closure_date >= cext_end_date)),
    CONSTRAINT cext_end_date CHECK ((cext_end_date > cext_start_date))
);
 0   DROP TABLE linexpert_schema.contract_extension;
       linexpert_schema         heap    postgres    false    8            �           0    0 0   CONSTRAINT "Status_Values" ON contract_extension    COMMENT     c   COMMENT ON CONSTRAINT "Status_Values" ON linexpert_schema.contract_extension IS 'Values accepted';
          linexpert_schema          postgres    false    207            �           0    0 7   CONSTRAINT cext_date_closure_date ON contract_extension    COMMENT     {   COMMENT ON CONSTRAINT cext_date_closure_date ON linexpert_schema.contract_extension IS 'Accepted values for closure date';
          linexpert_schema          postgres    false    207            �           0    0 .   CONSTRAINT cext_end_date ON contract_extension    COMMENT     s   COMMENT ON CONSTRAINT cext_end_date ON linexpert_schema.contract_extension IS 'Accepted values for cext_end_date';
          linexpert_schema          postgres    false    207            �            1259    17142    contract_header    TABLE     �  CREATE TABLE linexpert_schema.contract_header (
    con_id character varying(30) NOT NULL,
    clt_id character varying(30) NOT NULL,
    con_description character varying(300),
    con_start_date date NOT NULL,
    con_end_date date NOT NULL,
    con_closure_date date,
    con_status character varying(11),
    sent_to_rup boolean DEFAULT false,
    date_sent_to_rup date,
    CONSTRAINT "Contract_Status" CHECK (((con_status)::text = ANY (ARRAY['En Tramite'::text, 'Vigente'::text, 'Terminado'::text]))),
    CONSTRAINT "Start_Date_validation" CHECK ((con_start_date < con_end_date)),
    CONSTRAINT con_closure_date_validation CHECK ((con_closure_date >= con_end_date)),
    CONSTRAINT con_end_date_validation CHECK ((con_end_date > con_start_date))
);
 -   DROP TABLE linexpert_schema.contract_header;
       linexpert_schema         heap    postgres    false    8            �           0    0 /   CONSTRAINT "Contract_Status" ON contract_header    COMMENT     b   COMMENT ON CONSTRAINT "Contract_Status" ON linexpert_schema.contract_header IS 'Accepted Values';
          linexpert_schema          postgres    false    206            �            1259    17133    corporate_group    TABLE     k  CREATE TABLE linexpert_schema.corporate_group (
    group_id character varying(30) NOT NULL,
    group_name character varying(40) NOT NULL,
    group_address character varying(50) NOT NULL,
    group_city character varying(20) NOT NULL,
    group_region character varying(20) NOT NULL,
    group_country character varying(20) NOT NULL,
    group_phone_no character varying(20) NOT NULL,
    group_email character varying(55) NOT NULL,
    group_identification character varying(45),
    group_status character varying(10),
    CONSTRAINT "Corporate_group_Id" CHECK (((group_identification)::text = ANY (ARRAY['CC- CEDULA DE CIUDADANIA'::text, 'CE- CEDULA DE EXTRANJERIA'::text, 'NIT- NUM. DE IDENTIF. TRIBUTARIA'::text, 'RUT- REGISTRO UNICO TRIBUTARIO'::text, 'SSN- SOCIAL SECURITY NUMBER'::text, 'PPN- PASAPORTE INTERNACIONAL'::text, 'CRCPF- CEDULA PERSONAL FISICA'::text, 'CPJ- CEDULA PERSONAL JURIDICA'::text, 'DIMEX- DOC. IDENTIF. MIGRACION Y EXTRANJERIA'::text, 'DIDI- DOC. IDENTIF. DIPLOMATICOS'::text]))),
    CONSTRAINT "Group_Staus_Values" CHECK (((group_status)::text = ANY (ARRAY['Activo'::text, 'Inactivo'::text])))
);
 -   DROP TABLE linexpert_schema.corporate_group;
       linexpert_schema         heap    postgres    false    8            �           0    0 2   CONSTRAINT "Corporate_group_Id" ON corporate_group    COMMENT     r   COMMENT ON CONSTRAINT "Corporate_group_Id" ON linexpert_schema.corporate_group IS 'Identification type accepted';
          linexpert_schema          postgres    false    205            �           0    0 2   CONSTRAINT "Group_Staus_Values" ON corporate_group    COMMENT     e   COMMENT ON CONSTRAINT "Group_Staus_Values" ON linexpert_schema.corporate_group IS 'Values Accepted';
          linexpert_schema          postgres    false    205            �            1259    17156    service    TABLE     a  CREATE TABLE linexpert_schema.service (
    ser_id integer NOT NULL,
    ser_name character varying(50) NOT NULL,
    ser_description character varying(150) DEFAULT 'Empty'::character varying,
    ser_tariff numeric(9,2) DEFAULT 0 NOT NULL,
    ser_unit character varying(10),
    CONSTRAINT service_ser_tarrif_ck CHECK ((ser_tariff > (0)::numeric))
);
 %   DROP TABLE linexpert_schema.service;
       linexpert_schema         heap    postgres    false    8            �           0    0 +   CONSTRAINT service_ser_tarrif_ck ON service    COMMENT     ^   COMMENT ON CONSTRAINT service_ser_tarrif_ck ON linexpert_schema.service IS 'Accepted values';
          linexpert_schema          postgres    false    208            �            1259    17166    service_by_contract    TABLE     �   CREATE TABLE linexpert_schema.service_by_contract (
    con_id character varying(30) NOT NULL,
    cext_id character varying(27) NOT NULL,
    ser_id integer NOT NULL,
    ser_start_date date NOT NULL,
    ser_end_date date
);
 1   DROP TABLE linexpert_schema.service_by_contract;
       linexpert_schema         heap    postgres    false    8            �            1259    17169    service_ser_id_seq    SEQUENCE     �   CREATE SEQUENCE linexpert_schema.service_ser_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE linexpert_schema.service_ser_id_seq;
       linexpert_schema          postgres    false    208    8            �           0    0    service_ser_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE linexpert_schema.service_ser_id_seq OWNED BY linexpert_schema.service.ser_id;
          linexpert_schema          postgres    false    210            �            1259    25683    users    TABLE     �   CREATE TABLE linexpert_schema.users (
    email_address character varying(55) NOT NULL,
    user_role character varying(25) NOT NULL,
    user_password character varying(99) NOT NULL
);
 #   DROP TABLE linexpert_schema.users;
       linexpert_schema         heap    postgres    false    8            �            1259    17623    vw_client_group    VIEW     ~  CREATE VIEW linexpert_schema.vw_client_group AS
 SELECT corporate_group.group_id,
    corporate_group.group_identification,
    corporate_group.group_name,
    corporate_group.group_address,
    corporate_group.group_city,
    corporate_group.group_region,
    corporate_group.group_country,
    corporate_group.group_phone_no,
    corporate_group.group_email,
    corporate_group.group_status,
    client.clt_id,
    client.clt_identification,
    client.clt_official_name,
    client.clt_commercial_name,
    client.clt_address,
    client.clt_first_name,
    client.clt_last_name,
    client.clt_phone_no,
    client.clt_cell_no,
    client.clt_email_addr,
    client.clt_status,
    client.clt_region,
    client.clt_country,
    client.clt_city
   FROM (linexpert_schema.corporate_group
     JOIN linexpert_schema.client ON (((corporate_group.group_id)::text = (client.group_id)::text)));
 ,   DROP VIEW linexpert_schema.vw_client_group;
       linexpert_schema          postgres    false    204    204    205    205    205    205    205    204    204    205    205    205    205    204    204    204    204    204    205    204    204    204    204    204    204    8            �            1259    25715    vw_cont_clt_gr_vl    VIEW     �  CREATE VIEW linexpert_schema.vw_cont_clt_gr_vl AS
 SELECT vwc.group_id,
    vwc.group_name,
    vwc.group_region,
    vwc.group_country,
    vwc.group_city,
    vwc.group_status,
    cont_h.clt_id,
    vwc.clt_region,
    vwc.clt_country,
    vwc.clt_city,
    vwc.clt_status,
    vwc.clt_official_name,
    vwc.clt_commercial_name,
    con_ext.con_id,
    cont_h.con_description,
    cont_h.con_start_date,
    cont_h.con_end_date,
    cont_h.con_closure_date,
    cont_h.con_status,
    cont_h.sent_to_rup,
    cont_h.date_sent_to_rup,
    con_ext.cext_id,
    con_ext.cext_start_date,
    con_ext.cext_end_date,
    con_ext.cext_closure_date,
    con_ext.cext_status,
    con_ext.cext_total_cost,
    con_ext.cext_invoiced_cost
   FROM ((linexpert_schema.contract_extension con_ext
     JOIN linexpert_schema.contract_header cont_h ON (((con_ext.con_id)::text = (cont_h.con_id)::text)))
     JOIN linexpert_schema.vw_client_group vwc ON (((cont_h.clt_id)::text = (vwc.clt_id)::text)));
 .   DROP VIEW linexpert_schema.vw_cont_clt_gr_vl;
       linexpert_schema          postgres    false    206    206    206    206    206    206    226    226    226    226    226    226    226    226    226    226    226    226    226    207    207    207    207    207    207    207    207    206    206    206    8            �            1259    25730    vw_ser_cont_detail    VIEW     �  CREATE VIEW linexpert_schema.vw_ser_cont_detail AS
 SELECT vc.con_id,
    vc.cext_id,
    vc.group_id,
    vc.group_name,
    vc.group_status,
    vc.clt_id,
    vc.clt_official_name,
    vc.clt_status,
    vc.clt_commercial_name,
    vc.con_description,
    vc.con_start_date,
    vc.con_end_date,
    sbc.ser_id,
    sv.ser_name,
    sv.ser_description,
    sbc.ser_start_date,
    sbc.ser_end_date
   FROM ((linexpert_schema.vw_cont_clt_gr_vl vc
     LEFT JOIN linexpert_schema.service_by_contract sbc ON ((((vc.con_id)::text = (sbc.con_id)::text) AND ((vc.cext_id)::text = (sbc.cext_id)::text))))
     LEFT JOIN linexpert_schema.service sv ON ((sbc.ser_id = sv.ser_id)));
 /   DROP VIEW linexpert_schema.vw_ser_cont_detail;
       linexpert_schema          postgres    false    209    209    209    209    209    228    228    228    228    228    228    228    228    228    228    228    228    208    208    208    8            �            1259    17171 	   workforce    TABLE       CREATE TABLE linexpert_schema.workforce (
    wrk_id character varying(30) NOT NULL,
    wrk_address character varying(45),
    wrk_cell_no character varying(20),
    wrk_city character varying(25),
    wrk_country character varying(25),
    wrk_corp_email character varying(55),
    wrk_first_name character varying(30),
    wrk_last_name character varying(30),
    wrk_sec_last_name character varying(30),
    wrk_mid_name character varying(30),
    wrk_phone_no character varying(20),
    wrk_region character varying(25),
    wrk_status character varying(25),
    CONSTRAINT "Wrkforce_Status" CHECK (((wrk_status)::text = ANY (ARRAY['En Labor'::text, 'En Incapacidad'::text, 'En Vacaciones'::text, 'En Licencia no remunerada'::text, 'En Licencia remunerada'::text, 'En Retiro'::text])))
);
 '   DROP TABLE linexpert_schema.workforce;
       linexpert_schema         heap    postgres    false    8            �           0    0 )   CONSTRAINT "Wrkforce_Status" ON workforce    COMMENT     l   COMMENT ON CONSTRAINT "Wrkforce_Status" ON linexpert_schema.workforce IS 'Acceptable status for workforce';
          linexpert_schema          postgres    false    211            �            1259    17177    workforce_on_service    TABLE     �  CREATE TABLE linexpert_schema.workforce_on_service (
    con_id character varying(30) NOT NULL,
    cext_id character varying(27) NOT NULL,
    ser_id integer NOT NULL,
    wrk_id character varying(30) NOT NULL,
    assigned_date date,
    wrk_ser_start_date date NOT NULL,
    wrk_ser_end_date date,
    CONSTRAINT wrk_assigned_date_ck CHECK ((assigned_date <= wrk_ser_start_date)),
    CONSTRAINT wrk_end_date_ck CHECK ((wrk_ser_end_date > wrk_ser_start_date))
);
 2   DROP TABLE linexpert_schema.workforce_on_service;
       linexpert_schema         heap    postgres    false    8            �            1259    25736    vw_wrk_assigned    VIEW     e  CREATE VIEW linexpert_schema.vw_wrk_assigned AS
 SELECT vs.con_id,
    vs.cext_id,
    vs.group_id,
    vs.group_name,
    vs.clt_id,
    vs.clt_official_name,
    vs.clt_commercial_name,
    vs.clt_status,
    vs.ser_id,
    vs.ser_name,
    vs.ser_description,
    wrk_sv.wrk_id,
    wrk.wrk_first_name,
    wrk.wrk_last_name,
    wrk.wrk_status,
    wrk_sv.assigned_date,
    wrk_sv.wrk_ser_start_date,
    wrk_sv.wrk_ser_end_date
   FROM ((linexpert_schema.vw_ser_cont_detail vs
     LEFT JOIN linexpert_schema.workforce_on_service wrk_sv ON ((((vs.con_id)::text = (wrk_sv.con_id)::text) AND ((vs.cext_id)::text = (wrk_sv.cext_id)::text) AND (vs.ser_id = wrk_sv.ser_id))))
     LEFT JOIN linexpert_schema.workforce wrk ON (((wrk.wrk_id)::text = (wrk_sv.wrk_id)::text)))
  ORDER BY vs.group_name, vs.clt_commercial_name, vs.con_id, wrk_sv.ser_id, wrk.wrk_last_name;
 ,   DROP VIEW linexpert_schema.vw_wrk_assigned;
       linexpert_schema          postgres    false    212    211    211    211    211    229    229    229    229    229    229    229    229    229    229    229    212    212    212    212    212    212    8            �            1259    17182    workforce_qualification    TABLE     �   CREATE TABLE linexpert_schema.workforce_qualification (
    ser_id integer NOT NULL,
    wrk_id character varying(30) NOT NULL
);
 5   DROP TABLE linexpert_schema.workforce_qualification;
       linexpert_schema         heap    postgres    false    8            �            1259    17586    vw_wrk_qualif    VIEW     �  CREATE VIEW linexpert_schema.vw_wrk_qualif AS
 SELECT wf.wrk_id,
    wf.wrk_first_name,
    wf.wrk_last_name,
    wf.wrk_sec_last_name,
    wf.wrk_mid_name,
    wf.wrk_status,
    wq.ser_id,
    sv.ser_name,
    sv.ser_description
   FROM ((linexpert_schema.workforce wf
     JOIN linexpert_schema.workforce_qualification wq ON (((wf.wrk_id)::text = (wq.wrk_id)::text)))
     JOIN linexpert_schema.service sv ON ((wq.ser_id = sv.ser_id)))
  ORDER BY wf.wrk_id, wq.ser_id;
 *   DROP VIEW linexpert_schema.vw_wrk_qualif;
       linexpert_schema          postgres    false    211    213    213    211    211    211    211    211    208    208    208    8            %           2604    17191    service ser_id    DEFAULT     �   ALTER TABLE ONLY linexpert_schema.service ALTER COLUMN ser_id SET DEFAULT nextval('linexpert_schema.service_ser_id_seq'::regclass);
 G   ALTER TABLE linexpert_schema.service ALTER COLUMN ser_id DROP DEFAULT;
       linexpert_schema          postgres    false    210    208            �          0    17127    client 
   TABLE DATA           �   COPY linexpert_schema.client (clt_id, group_id, clt_identification, clt_official_name, clt_commercial_name, clt_first_name, clt_last_name, clt_address, clt_city, clt_region, clt_country, clt_phone_no, clt_cell_no, clt_email_addr, clt_status) FROM stdin;
    linexpert_schema          postgres    false    204   �       �          0    17152    contract_extension 
   TABLE DATA           �   COPY linexpert_schema.contract_extension (con_id, cext_id, cext_start_date, cext_end_date, cext_closure_date, cext_status, cext_total_cost, cext_invoiced_cost) FROM stdin;
    linexpert_schema          postgres    false    207   
�       �          0    17142    contract_header 
   TABLE DATA           �   COPY linexpert_schema.contract_header (con_id, clt_id, con_description, con_start_date, con_end_date, con_closure_date, con_status, sent_to_rup, date_sent_to_rup) FROM stdin;
    linexpert_schema          postgres    false    206   	�       �          0    17133    corporate_group 
   TABLE DATA           �   COPY linexpert_schema.corporate_group (group_id, group_name, group_address, group_city, group_region, group_country, group_phone_no, group_email, group_identification, group_status) FROM stdin;
    linexpert_schema          postgres    false    205   ��       �          0    17156    service 
   TABLE DATA           d   COPY linexpert_schema.service (ser_id, ser_name, ser_description, ser_tariff, ser_unit) FROM stdin;
    linexpert_schema          postgres    false    208   f�       �          0    17166    service_by_contract 
   TABLE DATA           n   COPY linexpert_schema.service_by_contract (con_id, cext_id, ser_id, ser_start_date, ser_end_date) FROM stdin;
    linexpert_schema          postgres    false    209   F�       �          0    25683    users 
   TABLE DATA           R   COPY linexpert_schema.users (email_address, user_role, user_password) FROM stdin;
    linexpert_schema          postgres    false    227   �       �          0    17171 	   workforce 
   TABLE DATA           �   COPY linexpert_schema.workforce (wrk_id, wrk_address, wrk_cell_no, wrk_city, wrk_country, wrk_corp_email, wrk_first_name, wrk_last_name, wrk_sec_last_name, wrk_mid_name, wrk_phone_no, wrk_region, wrk_status) FROM stdin;
    linexpert_schema          postgres    false    211   �       �          0    17177    workforce_on_service 
   TABLE DATA           �   COPY linexpert_schema.workforce_on_service (con_id, cext_id, ser_id, wrk_id, assigned_date, wrk_ser_start_date, wrk_ser_end_date) FROM stdin;
    linexpert_schema          postgres    false    212   "�       �          0    17182    workforce_qualification 
   TABLE DATA           K   COPY linexpert_schema.workforce_qualification (ser_id, wrk_id) FROM stdin;
    linexpert_schema          postgres    false    213   ��       �           0    0    service_ser_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('linexpert_schema.service_ser_id_seq', 115, true);
          linexpert_schema          postgres    false    210            +           2606    17193    client client_clt_id_key 
   CONSTRAINT     _   ALTER TABLE ONLY linexpert_schema.client
    ADD CONSTRAINT client_clt_id_key UNIQUE (clt_id);
 L   ALTER TABLE ONLY linexpert_schema.client DROP CONSTRAINT client_clt_id_key;
       linexpert_schema            postgres    false    204            -           2606    17195    client client_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY linexpert_schema.client
    ADD CONSTRAINT client_pkey PRIMARY KEY (clt_id, group_id);
 F   ALTER TABLE ONLY linexpert_schema.client DROP CONSTRAINT client_pkey;
       linexpert_schema            postgres    false    204    204                       2606    25778 !   contract_header con_date_sent_RUP    CHECK CONSTRAINT     �   ALTER TABLE linexpert_schema.contract_header
    ADD CONSTRAINT "con_date_sent_RUP" CHECK (((date_sent_to_rup <= CURRENT_DATE) AND (date_sent_to_rup >= con_start_date))) NOT VALID;
 R   ALTER TABLE linexpert_schema.contract_header DROP CONSTRAINT "con_date_sent_RUP";
       linexpert_schema          postgres    false    206    206    206    206            7           2606    17199 *   contract_extension contract_extension_pkey 
   CONSTRAINT        ALTER TABLE ONLY linexpert_schema.contract_extension
    ADD CONSTRAINT contract_extension_pkey PRIMARY KEY (con_id, cext_id);
 ^   ALTER TABLE ONLY linexpert_schema.contract_extension DROP CONSTRAINT contract_extension_pkey;
       linexpert_schema            postgres    false    207    207            3           2606    17297 $   contract_header contract_header_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY linexpert_schema.contract_header
    ADD CONSTRAINT contract_header_pkey PRIMARY KEY (con_id);
 X   ALTER TABLE ONLY linexpert_schema.contract_header DROP CONSTRAINT contract_header_pkey;
       linexpert_schema            postgres    false    206            /           2606    17201 /   corporate_group corporate_group_group_email_key 
   CONSTRAINT     {   ALTER TABLE ONLY linexpert_schema.corporate_group
    ADD CONSTRAINT corporate_group_group_email_key UNIQUE (group_email);
 c   ALTER TABLE ONLY linexpert_schema.corporate_group DROP CONSTRAINT corporate_group_group_email_key;
       linexpert_schema            postgres    false    205            1           2606    17203 $   corporate_group corporate_group_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY linexpert_schema.corporate_group
    ADD CONSTRAINT corporate_group_pkey PRIMARY KEY (group_id);
 X   ALTER TABLE ONLY linexpert_schema.corporate_group DROP CONSTRAINT corporate_group_pkey;
       linexpert_schema            postgres    false    205            F           2606    25687    users firstkey 
   CONSTRAINT     a   ALTER TABLE ONLY linexpert_schema.users
    ADD CONSTRAINT firstkey PRIMARY KEY (email_address);
 B   ALTER TABLE ONLY linexpert_schema.users DROP CONSTRAINT firstkey;
       linexpert_schema            postgres    false    227            >           2606    17205 ,   service_by_contract service_by_contract_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY linexpert_schema.service_by_contract
    ADD CONSTRAINT service_by_contract_pkey PRIMARY KEY (con_id, cext_id, ser_id);
 `   ALTER TABLE ONLY linexpert_schema.service_by_contract DROP CONSTRAINT service_by_contract_pkey;
       linexpert_schema            postgres    false    209    209    209            ;           2606    17207    service service_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY linexpert_schema.service
    ADD CONSTRAINT service_pkey PRIMARY KEY (ser_id);
 H   ALTER TABLE ONLY linexpert_schema.service DROP CONSTRAINT service_pkey;
       linexpert_schema            postgres    false    208            B           2606    17209 .   workforce_on_service workforce_on_service_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY linexpert_schema.workforce_on_service
    ADD CONSTRAINT workforce_on_service_pkey PRIMARY KEY (con_id, cext_id, ser_id, wrk_id);
 b   ALTER TABLE ONLY linexpert_schema.workforce_on_service DROP CONSTRAINT workforce_on_service_pkey;
       linexpert_schema            postgres    false    212    212    212    212            @           2606    17211    workforce workforce_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY linexpert_schema.workforce
    ADD CONSTRAINT workforce_pkey PRIMARY KEY (wrk_id);
 L   ALTER TABLE ONLY linexpert_schema.workforce DROP CONSTRAINT workforce_pkey;
       linexpert_schema            postgres    false    211            D           2606    17213 4   workforce_qualification workforce_qualification_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY linexpert_schema.workforce_qualification
    ADD CONSTRAINT workforce_qualification_pkey PRIMARY KEY (ser_id, wrk_id);
 h   ALTER TABLE ONLY linexpert_schema.workforce_qualification DROP CONSTRAINT workforce_qualification_pkey;
       linexpert_schema            postgres    false    213    213            8           1259    17216    idx_cext_closure    INDEX     f   CREATE INDEX idx_cext_closure ON linexpert_schema.contract_extension USING btree (cext_closure_date);
 .   DROP INDEX linexpert_schema.idx_cext_closure;
       linexpert_schema            postgres    false    207            9           1259    17217    idx_cext_total_cost    INDEX     p   CREATE INDEX idx_cext_total_cost ON linexpert_schema.contract_extension USING btree (cext_id, cext_total_cost);
 1   DROP INDEX linexpert_schema.idx_cext_total_cost;
       linexpert_schema            postgres    false    207    207            4           1259    17218    idx_contr_closure    INDEX     c   CREATE INDEX idx_contr_closure ON linexpert_schema.contract_header USING btree (con_closure_date);
 /   DROP INDEX linexpert_schema.idx_contr_closure;
       linexpert_schema            postgres    false    206            5           1259    17219    idx_contr_rup_sent    INDEX     q   CREATE INDEX idx_contr_rup_sent ON linexpert_schema.contract_header USING btree (sent_to_rup, date_sent_to_rup);
 0   DROP INDEX linexpert_schema.idx_contr_rup_sent;
       linexpert_schema            postgres    false    206    206            <           1259    17220    idx_service_end    INDEX     a   CREATE INDEX idx_service_end ON linexpert_schema.service_by_contract USING btree (ser_end_date);
 -   DROP INDEX linexpert_schema.idx_service_end;
       linexpert_schema            postgres    false    209            S           2620    17672     contract_header add_new_cext_trg    TRIGGER     �   CREATE TRIGGER add_new_cext_trg AFTER INSERT ON linexpert_schema.contract_header FOR EACH ROW EXECUTE FUNCTION linexpert_schema.add_new_cext_func();
 C   DROP TRIGGER add_new_cext_trg ON linexpert_schema.contract_header;
       linexpert_schema          postgres    false    280    206            U           2620    17674 (   contract_extension update_con_enddat_trg    TRIGGER     �   CREATE TRIGGER update_con_enddat_trg AFTER INSERT OR UPDATE ON linexpert_schema.contract_extension FOR EACH ROW EXECUTE FUNCTION linexpert_schema.update_con_enddat_func();
 K   DROP TRIGGER update_con_enddat_trg ON linexpert_schema.contract_extension;
       linexpert_schema          postgres    false    207    281            V           2620    17678 -   contract_extension valid_add_cext_constat_trg    TRIGGER     �   CREATE TRIGGER valid_add_cext_constat_trg BEFORE INSERT ON linexpert_schema.contract_extension FOR EACH ROW EXECUTE FUNCTION linexpert_schema.valid_add_cext_constat_func();
 P   DROP TRIGGER valid_add_cext_constat_trg ON linexpert_schema.contract_extension;
       linexpert_schema          postgres    false    283    207            R           2620    17668 %   corporate_group valid_client_stat_trg    TRIGGER     �   CREATE TRIGGER valid_client_stat_trg BEFORE UPDATE ON linexpert_schema.corporate_group FOR EACH ROW EXECUTE FUNCTION linexpert_schema.valid_client_stat_func();
 H   DROP TRIGGER valid_client_stat_trg ON linexpert_schema.corporate_group;
       linexpert_schema          postgres    false    286    205            Q           2620    17670    client valid_clt_con_status_trg    TRIGGER     �   CREATE TRIGGER valid_clt_con_status_trg BEFORE UPDATE ON linexpert_schema.client FOR EACH ROW EXECUTE FUNCTION linexpert_schema.valid_clt_con_status_func();
 B   DROP TRIGGER valid_clt_con_status_trg ON linexpert_schema.client;
       linexpert_schema          postgres    false    279    204            T           2620    17676 )   contract_header valid_con_cext_status_trg    TRIGGER     �   CREATE TRIGGER valid_con_cext_status_trg BEFORE UPDATE ON linexpert_schema.contract_header FOR EACH ROW EXECUTE FUNCTION linexpert_schema.valid_con_cext_status_func();
 L   DROP TRIGGER valid_con_cext_status_trg ON linexpert_schema.contract_header;
       linexpert_schema          postgres    false    206    282            W           2620    17683 ,   service_by_contract valid_dates_serv_con_trg    TRIGGER     �   CREATE TRIGGER valid_dates_serv_con_trg BEFORE INSERT OR UPDATE ON linexpert_schema.service_by_contract FOR EACH ROW EXECUTE FUNCTION linexpert_schema.valid_dates_serv_con_func();
 O   DROP TRIGGER valid_dates_serv_con_trg ON linexpert_schema.service_by_contract;
       linexpert_schema          postgres    false    287    209            Y           2620    17685 ,   workforce_on_service valid_dates_wrk_srv_trg    TRIGGER     �   CREATE TRIGGER valid_dates_wrk_srv_trg BEFORE INSERT OR UPDATE ON linexpert_schema.workforce_on_service FOR EACH ROW EXECUTE FUNCTION linexpert_schema.valid_dates_wrk_srv_func();
 O   DROP TRIGGER valid_dates_wrk_srv_trg ON linexpert_schema.workforce_on_service;
       linexpert_schema          postgres    false    289    212            P           2620    17666    client valid_group_stat_trg    TRIGGER     �   CREATE TRIGGER valid_group_stat_trg BEFORE INSERT OR UPDATE ON linexpert_schema.client FOR EACH ROW EXECUTE FUNCTION linexpert_schema.valid_group_stat_func();
 >   DROP TRIGGER valid_group_stat_trg ON linexpert_schema.client;
       linexpert_schema          postgres    false    285    204            Z           2620    17687 (   workforce_on_service valid_wrk_srv_q_trg    TRIGGER     �   CREATE TRIGGER valid_wrk_srv_q_trg BEFORE INSERT OR UPDATE ON linexpert_schema.workforce_on_service FOR EACH ROW EXECUTE FUNCTION linexpert_schema.valid_wrk_srv_q_func();
 K   DROP TRIGGER valid_wrk_srv_q_trg ON linexpert_schema.workforce_on_service;
       linexpert_schema          postgres    false    288    212            X           2620    17681 -   workforce_on_service valid_wrk_stat_assig_trg    TRIGGER     �   CREATE TRIGGER valid_wrk_stat_assig_trg BEFORE INSERT OR UPDATE ON linexpert_schema.workforce_on_service FOR EACH ROW EXECUTE FUNCTION linexpert_schema.valid_wrk_stat_assig_func();
 P   DROP TRIGGER valid_wrk_stat_assig_trg ON linexpert_schema.workforce_on_service;
       linexpert_schema          postgres    false    284    212            H           2606    17291    contract_header clt_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY linexpert_schema.contract_header
    ADD CONSTRAINT clt_id_fk FOREIGN KEY (clt_id) REFERENCES linexpert_schema.client(clt_id);
 M   ALTER TABLE ONLY linexpert_schema.contract_header DROP CONSTRAINT clt_id_fk;
       linexpert_schema          postgres    false    204    2859    206            I           2606    17298    contract_extension con_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY linexpert_schema.contract_extension
    ADD CONSTRAINT con_id_fk FOREIGN KEY (con_id) REFERENCES linexpert_schema.contract_header(con_id);
 P   ALTER TABLE ONLY linexpert_schema.contract_extension DROP CONSTRAINT con_id_fk;
       linexpert_schema          postgres    false    2867    207    206            G           2606    17222    client corp_grp_fk    FK CONSTRAINT     �   ALTER TABLE ONLY linexpert_schema.client
    ADD CONSTRAINT corp_grp_fk FOREIGN KEY (group_id) REFERENCES linexpert_schema.corporate_group(group_id);
 F   ALTER TABLE ONLY linexpert_schema.client DROP CONSTRAINT corp_grp_fk;
       linexpert_schema          postgres    false    204    205    2865            N           2606    17227 "   workforce_qualification fk_service    FK CONSTRAINT     �   ALTER TABLE ONLY linexpert_schema.workforce_qualification
    ADD CONSTRAINT fk_service FOREIGN KEY (ser_id) REFERENCES linexpert_schema.service(ser_id);
 V   ALTER TABLE ONLY linexpert_schema.workforce_qualification DROP CONSTRAINT fk_service;
       linexpert_schema          postgres    false    213    2875    208            O           2606    17232 $   workforce_qualification fk_workforce    FK CONSTRAINT     �   ALTER TABLE ONLY linexpert_schema.workforce_qualification
    ADD CONSTRAINT fk_workforce FOREIGN KEY (wrk_id) REFERENCES linexpert_schema.workforce(wrk_id);
 X   ALTER TABLE ONLY linexpert_schema.workforce_qualification DROP CONSTRAINT fk_workforce;
       linexpert_schema          postgres    false    213    2880    211            J           2606    17242 %   service_by_contract ser_by_service_fk    FK CONSTRAINT     �   ALTER TABLE ONLY linexpert_schema.service_by_contract
    ADD CONSTRAINT ser_by_service_fk FOREIGN KEY (ser_id) REFERENCES linexpert_schema.service(ser_id);
 Y   ALTER TABLE ONLY linexpert_schema.service_by_contract DROP CONSTRAINT ser_by_service_fk;
       linexpert_schema          postgres    false    209    2875    208            K           2606    17247 (   workforce_on_service wrk_service_cext_fk    FK CONSTRAINT     �   ALTER TABLE ONLY linexpert_schema.workforce_on_service
    ADD CONSTRAINT wrk_service_cext_fk FOREIGN KEY (con_id, cext_id) REFERENCES linexpert_schema.contract_extension(con_id, cext_id);
 \   ALTER TABLE ONLY linexpert_schema.workforce_on_service DROP CONSTRAINT wrk_service_cext_fk;
       linexpert_schema          postgres    false    207    212    212    2871    207            L           2606    17252 '   workforce_on_service wrk_service_emp_fk    FK CONSTRAINT     �   ALTER TABLE ONLY linexpert_schema.workforce_on_service
    ADD CONSTRAINT wrk_service_emp_fk FOREIGN KEY (wrk_id) REFERENCES linexpert_schema.workforce(wrk_id);
 [   ALTER TABLE ONLY linexpert_schema.workforce_on_service DROP CONSTRAINT wrk_service_emp_fk;
       linexpert_schema          postgres    false    2880    212    211            M           2606    17257 2   workforce_on_service wrk_service_service_master_fk    FK CONSTRAINT     �   ALTER TABLE ONLY linexpert_schema.workforce_on_service
    ADD CONSTRAINT wrk_service_service_master_fk FOREIGN KEY (ser_id) REFERENCES linexpert_schema.service(ser_id);
 f   ALTER TABLE ONLY linexpert_schema.workforce_on_service DROP CONSTRAINT wrk_service_service_master_fk;
       linexpert_schema          postgres    false    2875    212    208            �     x���Q��8����
��6ޒ0S)��&U�� xk�!�f}/I��j��F*�:`�������XҐr���C�~��,��o�G)<�b���x~��2��9�7#��Ϧ���|6��//����Q�4Zَ����Q�g}R)#�ׄ�I�Q�<J�<9�ѷ�h�s�V��\ZYI�#N(�A�$=	�Q������7����I�靻�π�� q&�v`0D���� s�HY*���s��Ȣ�JuP�=�����g�;U�}٩���x�� <	Q�(���6��Ҹmu9���(ކG��	s�h���_�=�`�� >���S���㺑�\!c����1����P8�[��d��d�S#���[Y]���m�����e��	��4�$P�d��QW0� &��߸f� &���Z�;�m$d<�aD�J��sɵ/����j����p
�eم����nV}>����t��4��4 �a��l�F��8_A��&���`����"��9�i]/�C��]׎���~� nJC�ɍƊ\Ohl���Y�1���ji�բI�9���'.G\�)��ƻݸ]��q+iF���� &�Q��c�`&�ƫ
ڿ�z�$� ��G�,��#�zg�yE�i��w�hȒ�@�C�4�Qps'M�Q_+0P�r�i��|-�Qm�K���uno	&���g_@'1��V�J�����f�e��f����^Ӵ�j��Q�JUۑ�\��5�iπ�r�O�� n��Gwww_}���      �   �  x��TMk�@=ۿb������q	�v����^
��B���J3�x�uJ N�c����4�_O�矇#Ę %��t������s" v�&Fʀ��2���@���x�|?_��|L���|hL� �"쥣
`,+���3F�TJ�^���ˏ������i"G>g1��#C�>:
�G~��XJl/翧��V�����*H�/��(���,
��|C<I?��<�j�s�~0Ri_ꄴT3:|����[	r0��9� �F fR�ڔ�w[��r����`��	��'p��*�}V�����X�k�:)�t1�]��'�Z��s�MvvZ]m�+Jg!/�� R ͆׍!�b%��o��VV�֢o���0]�$�H�,�K'���D�s�u��Ҹ�+2ף��24w<��v?�K��&.S��C���|�	1�{2��b�YƯ�q�5cvI��+$�ZH�^�~/U��������%^۶5l��S������<���A]$      �   h  x����J�0�s�}��d�I���� ��^�5J�J�����~�u�]�������=���uV�M�"����6y)hcy�&-n�qߔomYWq�?���7^�D	J�r}�|�m.��W_�^��M�A�Z�6�t`h�H����Q�$
��j�\�@n8F�$@�
� mؚJ��˂3�u�߂f`��7C�=�:qV�'}��c7�R�� =�ɪ���~��Bn'�sg�ܿ�Y]��n��s�����"7��&�[j�?��7K���߰���A��3���1�K�C�I�ᴐ�$��գ����O-��ل�@f�}��1�s��P-�y�G ,J���U���ܜ�/�K���UE���C�      �   �  x���Ms�8��O>�s����7XB����K/�~
*���dR�ӯH�ݙeo֌g���m��^�vW�Yʲ����1�,q)݉�2(�$����8qz&XZ�����N�vFjqd ��1����V����t<�'o�1o��v�Zl�v���qq?_m#�֋�w�i��´	�l�f?!s��Bp��:X�P�;�>P��������<X�p\Z��J*�H*r�$t��&Z��VH�x�RpX;�9|&zG�0g�'ȫ��G���ކ����xx$��*dZ^ K�1��j&gr�5#C�P���,�
6�6'��W��e�i
�p�U{ �{���0��YiM�%c�{�_:_E��G����A[{�U�qTT�T�9�[�Y�
��D��Mt�E�u����zU��7�f²bYU�^����t���d)��ǾSFA��y�̟����R��Ǯ�(�X��u�,x�mg����z�aV�zW�!��u������ñw> .�Vƪ�J���IՒ��F۾�U�4aYrٙ���]�VE���	�e�ր��-����Fl	��iO�b���tp\�4ϡ�d8N��9h���V���WQrc�)�����*//c����&ld�4-L�����
�Ź�7�&�<Z;j�-tK�<�GGtɕ5�O����Nӌ�
E����u�z2�QM�/֙��^U>feZ�'i���2.����ytww�7Z�3      �   �   x�u�;�0D��)|����G��f1Kd��#�A��c�b��\���h����'�CÁY��kg�`,�3��Z�#(�� ���J��e�熰�{�kÕ��)u��&��&V�REr�����|㏰w�bZgu|��>c��v7e����8���`Mzk
Gg�C����R�Tw��A�"-7�.����'�N�F'���]Y�} b���      �   �  x����n�@E��/��{�
u�JU]����� ��@�(D�dN�������}��@�	R�;v�����0�G`��A�9����>�~����p�Є�'0r�PH ��`i8����>fw����um��P�7A�:�_�H�<�S(�Dn8�`D��&�W֐\	�bX˫r�hsTL.=�R�ֳ��I�����9��"W1�x�b��F��荘c'5VLT�z����;I�{��2"����9�̐:v0qL��Q�JM��	�*�-F�!/���SB����#����V�m����c�˰��G+�d�'��3/EY���]Ƅ�u�x�>��9�r8r���Q�l���pv�C���iу�V��r�����_���&�󴹘ij�d�v+��9-�<�*<L��%�����~c|�      �      x������ � �      �     x���Os�6���O�[)4���r��N世'�3H�C�$���m��wIY�I�RC�CA�޾�Z}�~���Yn��,�40���G�lkG�):����4g�J)-�������3����Ų�����{ܺ���&4p��O %��K��^�:�-�v��p�P�	e�p���&�3���}|�!@�r2;i����w>���a/��CW�ކ�}���~�er��Ǌ���P���)���v�1���/.��G�]����E����*5���ml�	�8��Gt�t�Rh�����ܹ�ۼD�Tpԫ?7�Sd�D澫��b�Q����r�6Ē,���@{3����R��T}�G����`��|N��)Ƴ�g����B��u�%��,�BG\��Ci~�ѻ����&n��P�y�	� g��5k�]WO�Z�B�T9Yٺ~��lhiN���O�,�-�Ôt�h�Ҷ��u��;x���F6QlQb�QO�3��#+����B�޻ً�JW���K�����b��n�kֵ�Y����V��7	:�����o2,��
��@8wc�5*8G���!,pC��܇���e�=m^��5�N�j��!�Rh(
��y�<�P��0�b�a�o����p[0�˗�|�k���ȕ�x
��
Z�a��� 瘲����e$-8��/[��uJ�}"���{;��	*������
&+8�}��FR�4�<S���t�������[�ᬲ���FD�Ø�����������ɿ����      �   \  x��VɎ!=��R�Qp���iF�����#�=�x��i?a����O�o�?O��(&P% �é�ï����F|�����?�AJLRǁ&(t��C>�%RbEe$~5"�0"�@�"y���t�*E�u�WOɿ�H��qEO'���5��LQ��W*�/?�?=^`u�o ���m h��w�wŉg(�>x�	XJ��4y�Ie�l�v9ۗ���Ʉ7�1����#��(#R1��r�PTxϨ�ǁx�Y��MR�'Z=�;<�� �a�)֡&W�B3�5vH- ��;�oTW��3����7�X-�!'K����%�!�zG�,��h�Ҹ�5� 1�i,��-���<w�l�Ϟ�v��f�7�jt�ќ4{�x�����n>;j�5�����K���F��<k��wˍ�(�|Q��jX�����M��J��슘y#o�ojN�0�"m�M�ݢDnظAc;F[U������|�ip�[/k'v5xQ�R��:�����!����l��69��h�l�2`5��A+����ގ��F��h�5N����k��b,�i��}Q3����+�6[\�ǯ���?��      �   �   x�}�; @g{��/pq0qq���d Ē��>Z����	5I=����FN܄3��Ć�bdBl* k��s���
z�R�n��ް��OܱW�Ȋ��&��xs������9�rs����ιt�j.ϸl��Bɪ�ƒ$IFy�%�^�y�� >��e�     