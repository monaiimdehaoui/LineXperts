package com.example.linexperts.Repositories;

import java.util.List;

import com.example.linexperts.Models.Client;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

//Every report is based on the current year.
// todo : re,ove client  
public interface MiscReportsRepository extends CrudRepository<Client, String> {

        @Query(value = "SELECT group_name, clt_commercial_name, SUM(cext_total_cost) AS Total_Contract, "
                        + "SUM(cext_invoiced_cost) AS Total_invoiced FROM linexpert_schema.vw_cont_clt_gr_vl "
                        + "WHERE cext_invoiced_cost IS NOT NULL AND cext_start_year<= date_part('year', now()) "
                        + "AND cext_end_year >= date_part('year', now()) " + "GROUP BY group_name, clt_commercial_name "
                        + "ORDER BY Total_Contract DESC " + "LIMIT 10;", nativeQuery = true)
        List<String> topTenMostExpensiveContractsOfThePastYear();

        @Query(value = "SELECT ser_name, count(ser_id) AS Serv_in_Contracts "
                        + "FROM linexpert_schema.vw_ser_cont_detail "
                        + "WHERE extract(year from ser_start_date) <= date_part('year', now()) AND "
                        + "extract(year from ser_end_date) >= date_part('year', now()) GROUP BY ser_name "
                        + "ORDER BY Serv_in_Contracts DESC " + "LIMIT 10;", nativeQuery = true)
        List<String> topTenMostInDemandServicesOfThePastYear();

        @Query(value = "SELECT ser_name,(wrk_first_name || ' ' || wrk_last_name) AS Workforce_name,  "
                        + "count(ser_id) AS Contracts_Assigned FROM linexpert_schema.vw_wrk_assigned "
                        + "WHERE extract(YEAR FROM wrk_ser_start_date) <= date_part('year', now()) "
                        + "AND extract(YEAR FROM wrk_ser_end_date)  >= date_part('year', now()) "
                        + "GROUP BY  ser_name, Workforce_name "
                        + "ORDER BY Contracts_Assigned DESC, ser_name LIMIT 10;", nativeQuery = true)
        List<String> topTenMostAssignedWorkforcesToContractsOfThePastYear();

        @Query(value = "SELECT group_name, clt_commercial_name, con_id,count(cext_id) AS No_Addendums, "
                        + "sum(cext_total_cost) AS Tot_Contract_Addendum, sum(cext_invoiced_cost) AS Tot_Invoiced_Addendum, "
                        + "to_char(con_start_date, 'YYYY-MM') AS Contract_Start_month, "
                        + "to_char(con_end_date, 'YYYY-MM') AS Contract_End_month, con_status, clt_country, clt_city, clt_status "
                        + "FROM linexpert_schema.vw_cont_clt_gr_vl "
                        + "GROUP BY group_name, clt_commercial_name, clt_country, clt_city, clt_status, con_id, con_description, "
                        + "Contract_Start_month, Contract_End_month, con_status "
                        + "ORDER BY Tot_Contract_addendum DESC, group_name;", nativeQuery = true)
        List<String> mostExpensiveContractsDetailedReport();

}
