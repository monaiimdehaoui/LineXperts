import React, {Component} from 'react';
//API database:
//https://github.com/dr5hn/countries-states-cities-database/tree/master/sql

/*
* https://rapidapi.com/blog/how-to-use-an-api-with-react/
*
* How to use PATCH to only update certain fields
* https://rapidapi.com/blog/api-glossary/patch/
*
*/
const headerSpec = new Headers();
headerSpec.append('Content-Type','application/json');

const headers = new Headers();
headers.append("X-CSCAPI-KEY", "czRKTFZ3QlFyVnNCMlk1T3J2cEJISlp1b0FvWlJLTDJDZlB6dEtITQ== ");

const countryURL = "https://api.countrystatecity.in/v1/countries";
const stateURL = "https://api.countrystatecity.in/v1/countries/IN/states";
const cityURL = "https://api.countrystatecity.in/v1/countries/IN/states/MH/cities";

const requestOptions = {
    crossDomain: true,
    method: 'GET',
    headers: headers, headerSpec,
    redirect: 'follow',
};
export default class testAPI extends Component{

    constructor(props) {
        super(props);
        this.state = {
            countryInput:'',
            stateInput:'',
            countries:{},
            cities:{},
            states:{},
            fields:{
                input_countries:'',
                input_cities:'',
                input_states:''
            },
            dis:false,
            dis2:false,
            dis3:false
        }
    }

    componentDidMount()
    {
        fetch(countryURL, requestOptions)
            .then(response => response.json())
            .then((data) =>{
                this.setState({countries:data}, () =>{
                    this.setState({dis:true});
                });
                console.log(data);
                console.log(this.state.countries);
            })
            .catch(error => console.log('error', error));

       /* fetch(stateURL, requestOptions)
            .then(response => response.json())
            .then(result =>
                console.log(result))
            .catch(error => console.log('error', error));

        // Pass Country & State Code -- Eg: Country Code : IN & State Code : MH
        fetch(cityURL, requestOptions)
            .then(response => response.json())
            .then(result =>
                console.log(result))
            .catch(error => console.log('error', error));*/
    }

    handleChange = (field, e) => {
        const {fields} = this.state;
        fields[field] = e.target.value;
        this.setState({fields});

        console.log(fields["input_countries"]);
        /*if(fields["input_countries"].length > 0){
            // Pass Country Code -- Eg: Country Code : IN
            fetch(`https://api.countrystatecity.in/v1/countries/${fields["input_countries"]}/states`, requestOptions)
                .then(response => response.json())
                .then(result =>{
                    console.log(result);
                    if(result.ok){
                        this.setState({states:result}, ()=>{
                            this.setState({dis2:true});
                        });
                    }
                })
                .catch(error => console.log('error', error));

        }
*/
       /* // Pass Country & State Code -- Eg: Country Code : IN & State Code : MH
        fetch(cityURL, requestOptions)
            .then(response => response.json())
            .then(result =>
                console.log(result))
            .catch(error => console.log('error', error));*/
    }

    render(){
        let {countries, states, dis, dis2} = this.state;

        return(
            <div className={"App-Holder col-lg-8 col-md-11"}>



                <form>
                    <label htmlFor={"countries"}>Countries</label>
                    <input type={"text"} list={"countries"} id={"input_countries"} name={"input_countries"}
                    onChange={this.handleChange.bind(this, "input_countries")} value={this.state.countryInput}/>
                    <datalist id={"countries"}>
                        {dis ? countries.map( (country) => {
                            return <option key={country.iso2}>{country.name}</option>
                        }) : <></>}
                    </datalist>
                    <br/>

                    <label htmlFor={"states"}>States</label>
                    <input type={"text"} list={"states"} id={"input_states"} name={"input_states"} value={this.state.stateInput}
                           onChange={this.handleChange.bind(this, "input_states")}/>
                    <datalist id={"states"}>
                        {dis2 ? states.map( (state) => {
                            return <option key={state.id}>{state.name}</option>
                        }) : <></>}
                    </datalist>
                </form>
            </div>
        )
    }
}



/*Database tables of the api:
*
*
* DROP TABLE IF EXISTS `countries`;
CREATE TABLE `countries` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `iso3` char(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `iso2` char(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phonecode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `capital` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currency` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `native` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `region` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subregion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timezones` text COLLATE utf8mb4_unicode_ci,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `emoji` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `emojiU` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `flag` tinyint(1) NOT NULL DEFAULT '1',
  `wikiDataId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Rapid API GeoDB Cities'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
*
*
* CREATE TABLE `states` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country_id` mediumint(8) UNSIGNED NOT NULL,
  `country_code` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fips_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `iso2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `flag` tinyint(1) NOT NULL DEFAULT '1',
  `wikiDataId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Rapid API GeoDB Cities'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=COMPACT;
*
*DROP TABLE IF EXISTS `cities`;
CREATE TABLE `cities` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state_id` mediumint(8) UNSIGNED NOT NULL,
  `state_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country_id` mediumint(8) UNSIGNED NOT NULL,
  `country_code` char(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '2014-01-01 01:01:01',
  `updated_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `flag` tinyint(1) NOT NULL DEFAULT '1',
  `wikiDataId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Rapid API GeoDB Cities'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=COMPACT;
*
*
* */
