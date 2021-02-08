package com.example.linexperts.Utils.Batch;

//Used to insert rows based on csv files
import com.example.linexperts.Models.Client;
import com.example.linexperts.Models.CorporateGroup;
import com.example.linexperts.Models.Services;
import com.example.linexperts.Models.Workforce;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.LineMapper;
import org.springframework.batch.item.file.mapping.BeanWrapperFieldSetMapper;
import org.springframework.batch.item.file.mapping.DefaultLineMapper;
import org.springframework.batch.item.file.transform.DelimitedLineTokenizer;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.FileSystemResource;


@Configuration
@EnableBatchProcessing
public class BatchConfig {


    //Beans for jobs related to the Workforce.
    @Bean
    public Job workforceJob(JobBuilderFactory jobBuilderFactory,
                            StepBuilderFactory stepBuilderFactory,
                            ItemReader<Workforce> itemReaderW,
                            ItemProcessor<Workforce, Workforce> itemProcessor,
                            ItemWriter<Workforce> itemWriter)
    {
        Step step = stepBuilderFactory.get("ETL-file-load")
                .<Workforce, Workforce>chunk(100)
                .reader(itemReaderW)
                .processor(itemProcessor)
                .writer(itemWriter)
                .build();

        return jobBuilderFactory.get("ETL-Load")
                .incrementer(new RunIdIncrementer())
                .start(step)
                .build();
    }

    @Bean
    public Job serviceJob(JobBuilderFactory jobBuilderFactory,
                                StepBuilderFactory stepBuilderFactory,
                                ItemReader<Services> servicesItemReader,
                                ItemProcessor<Services, Services> servicesItemProcessor,
                                @Qualifier("DBServiceWriter") ItemWriter<Services> serviceInserter)
    {
        Step step = stepBuilderFactory.get("ETL-file-load")
                .<Services, Services>chunk(100)
                .reader(servicesItemReader)
                .processor(servicesItemProcessor)
                .writer(serviceInserter)
                .build();

        return jobBuilderFactory.get("ETL-Load")
                .incrementer(new RunIdIncrementer())
                .start(step)
                .build();
    }

    @Bean
    public Job corpGroupJob(JobBuilderFactory jobBuilderFactory,
                            StepBuilderFactory stepBuilderFactory,
                            ItemReader<CorporateGroup> corpGroupItemReader,
                            ItemProcessor<CorporateGroup, CorporateGroup> corporateGroupItemProcessor,
                            @Qualifier("DBGroupWriter") ItemWriter<CorporateGroup> corpGroupInserter)
    {

        Step step = stepBuilderFactory.get("ETL-file-load")
                .<CorporateGroup, CorporateGroup>chunk(100)
                .reader(corpGroupItemReader)
                .processor(corporateGroupItemProcessor)
                .writer(corpGroupInserter)
                .build();

        return jobBuilderFactory.get("ETL-Load")
                .incrementer(new RunIdIncrementer())
                .start(step)
                .build();
    }

    @Bean
    public Job clientJob(JobBuilderFactory jobBuilderFactory,
                         StepBuilderFactory stepBuilderFactory,
                         ItemReader<Client> clientItemReader,
                         ItemProcessor<Client, Client> clientItemProcessor,
                         @Qualifier("DBClientWriter") ItemWriter<Client> clientInserter)
    {

        Step step = stepBuilderFactory.get("ETL-File-load")
                .<Client, Client>chunk(100)
                .reader(clientItemReader)
                .processor(clientItemProcessor)
                .writer(clientInserter)
                .build();

        return jobBuilderFactory.get("ETL-Load")
                .incrementer(new RunIdIncrementer())
                .start(step)
                .build();

    }

    //Workforce setup starts here. It ends on line 130
    @Bean
    public FlatFileItemReader<Workforce> itemReaderW() throws Exception {
        FlatFileItemReader<Workforce> flatFileItemReader = new FlatFileItemReader<>();

        //Can also be used with links. The google Drive link doesn't allow for CSV processing,
        // so I'm using a local file.

        //Local file used here
        flatFileItemReader.setResource(new FileSystemResource("src/main/resources/CSV/Workforce/workforce.csv"));

        flatFileItemReader.setName("WorkforceCSV-Insert-Reader");
        flatFileItemReader.setLinesToSkip(1);
        flatFileItemReader.setLineMapper(lineMapper());
        return flatFileItemReader;
    }

    @Bean
    public LineMapper<Workforce> lineMapper()
    {
        DefaultLineMapper<Workforce> defaultLineMapper = new DefaultLineMapper<>();
        DelimitedLineTokenizer lineTokenizer = new DelimitedLineTokenizer();

        lineTokenizer.setDelimiter(",");
        lineTokenizer.setStrict(false);
        lineTokenizer.setNames("wrkId","wrkLastname","wrkSecLastName","wrkFirstName","wrkMidName","wrkPhoneNo","wrkCellNo",
                "wrkCorpEmail","wrkStatus","wrkAddress","wrkCity", "wrkRegion","wrkCountry");

        BeanWrapperFieldSetMapper<Workforce> fieldSetMapper = new BeanWrapperFieldSetMapper<>();
        fieldSetMapper.setTargetType(Workforce.class);

        defaultLineMapper.setLineTokenizer(lineTokenizer);
        defaultLineMapper.setFieldSetMapper(fieldSetMapper);

        return defaultLineMapper;
    }

    //Service setup starts here. Ends on line 163
    @Bean
    public LineMapper<Services> servicesLineMapper()
    {
        DefaultLineMapper<Services> defaultServicesLineMapper = new DefaultLineMapper<>();
        DelimitedLineTokenizer servicesLineTokenizer = new DelimitedLineTokenizer();

        servicesLineTokenizer.setDelimiter(",");
        servicesLineTokenizer.setStrict(false);
        servicesLineTokenizer.setNames("serName", "serDescription", "serTariff", "serUnit");

        BeanWrapperFieldSetMapper<Services> serviceFieldSetMapper = new BeanWrapperFieldSetMapper<>();
        serviceFieldSetMapper.setTargetType(Services.class);

        defaultServicesLineMapper.setLineTokenizer(servicesLineTokenizer);
        defaultServicesLineMapper.setFieldSetMapper(serviceFieldSetMapper);

        return defaultServicesLineMapper;
    }

    @Bean
    public FlatFileItemReader<Services> servicesItemReader()
    {
        FlatFileItemReader<Services> flatFileItemReader = new FlatFileItemReader<>();

        flatFileItemReader.setResource(new FileSystemResource("src/main/resources/CSV/Services/services.csv"));

        flatFileItemReader.setName("ServiceCSV-Update-Reader");
        flatFileItemReader.setLinesToSkip(1);
        flatFileItemReader.setLineMapper(servicesLineMapper());
        return flatFileItemReader;
    }

    //Corporate Group processing starts here. Ends on line 200
    @Bean
    public LineMapper<CorporateGroup> corpGroupLineMapper()
    {
        DefaultLineMapper<CorporateGroup> groupDefaultLineMapper = new DefaultLineMapper<>();
        DelimitedLineTokenizer groupLineTokenizer = new DelimitedLineTokenizer();

        groupLineTokenizer.setDelimiter(",");
        groupLineTokenizer.setStrict(false);
        groupLineTokenizer.setNames("groupId","groupName","groupAddress","groupCity","groupRegion","groupCountry",
                "groupPhoneNo","groupEmail","groupIdentification","groupStatus");

        BeanWrapperFieldSetMapper<CorporateGroup> corporateGroupFieldSetMapper = new BeanWrapperFieldSetMapper<>();
        corporateGroupFieldSetMapper.setTargetType(CorporateGroup.class);

        groupDefaultLineMapper.setLineTokenizer(groupLineTokenizer);
        groupDefaultLineMapper.setFieldSetMapper(corporateGroupFieldSetMapper);

        return groupDefaultLineMapper;
    }

    @Bean
    public FlatFileItemReader<CorporateGroup> corpGroupItemReader()
    {
        FlatFileItemReader<CorporateGroup> flatFileItemReader= new FlatFileItemReader<>();

        flatFileItemReader.setResource(
                new FileSystemResource
                        ("src/main/resources/CSV/CorporateGroups/corporate_groups.csv"));

        flatFileItemReader.setName("CorpGroupCSV-Update-Reader");
        flatFileItemReader.setLinesToSkip(1);
        flatFileItemReader.setLineMapper(corpGroupLineMapper());

        return flatFileItemReader;
    }

    //Client processing starts here. Ends on line 237
    @Bean
    public LineMapper<Client> clientLineMapper()
    {
        DefaultLineMapper<Client> clientDefaultLineMapper = new DefaultLineMapper<>();
        DelimitedLineTokenizer lineTokenizer = new DelimitedLineTokenizer();

        lineTokenizer.setDelimiter(",");
        lineTokenizer.setStrict(false);
        lineTokenizer.setNames("cltId","groupId","cltIdentification",
                "cltOfficialName","cltCommercialName","cltFirstName","cltLastName",
                "cltAddress","cltCity","cltRegion","cltCountry","cltPhoneNo","cltCellNo",
                "cltEmailAddr","cltStatus");

        BeanWrapperFieldSetMapper<Client> clientFieldSetMapper = new BeanWrapperFieldSetMapper<>();
        clientFieldSetMapper.setTargetType(Client.class);

        clientDefaultLineMapper.setLineTokenizer(lineTokenizer);
        clientDefaultLineMapper.setFieldSetMapper(clientFieldSetMapper);

        return clientDefaultLineMapper;
    }

    @Bean
    public FlatFileItemReader<Client> clientItemReader()
    {
        FlatFileItemReader<Client> flatFileItemReader = new FlatFileItemReader<>();

        flatFileItemReader.setResource(
                new FileSystemResource("src/main/resources/CSV/Clients/clients.csv"));

        flatFileItemReader.setName("ClientCSV-Update-Reader");
        flatFileItemReader.setLinesToSkip(1);
        flatFileItemReader.setLineMapper(clientLineMapper());

        return flatFileItemReader;
    }

}
