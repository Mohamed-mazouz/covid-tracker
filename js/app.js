
//declaration des elements 

const country_name_element = document.querySelector(".country .name")
const total_cases_element  = document.querySelector(".total-cases .value")
const new_cases_element = document.querySelector(".total-cases .new-value")
const recovered_element = document.querySelector(".recovered .value")
const new_recovered_element = document.querySelector(".recovered .new-value")
const deaths_element = document.querySelector(".deaths .value")
const new_deaths_element = document.querySelector(".deaths .new-value")
const ctx = document.getElementById("axes-line-chart").getContext("2d");


//les variables

cases_list = [],
recovered_list = [],
deaths_list = []



//code vpn with country code

let country_code = geoplugin_countryCode();
let user_country;
country_list.forEach((country) => {
  if (country.code == country_code) {
    user_country = country.name;
  }
});

//API covid-tracker

function fetchData(country) {
	user_country = country;
	country_name_element.innerHTML = "Loading...";
  
	  (cases_list = []),
	  (recovered_list = []),
	  (deaths_list = []);
  
	var requestOptions = {
	  method: "GET",
	  redirect: "follow",
	
	};
  
	const api_fetch = async (country) => {
	  await fetch(
		 "https://api.covid19api.com/total/country/" + country +"/status/confirmed",
		 requestOptions
	   )
		.then((res) => {
		return res.json();
		})
		.then((data) => {
		  data.forEach((entry) => {
		  cases_list.push(entry.Cases);
		  });
		});
       
	  await fetch(
		"https://api.covid19api.com/total/country/" + country +"/status/recovered",
		requestOptions
	  )
		.then((res) => {
		  return res.json();
		})
		.then((data) => {
		  data.forEach((entry) => {
			recovered_list.push(entry.Cases);
		  });
		});
  
	  await fetch(
		"https://api.covid19api.com/total/country/" + country + "/status/deaths",
		requestOptions
	  )
		.then((res) => {
		  return res.json();
		})
		.then((data) => {
			console.log(data)
		  data.forEach((entry) => {
			deaths_list.push(entry.Cases);
		  });
		});
  
		updateStats();
	};
  
	api_fetch(country);
  }
  
  
  
 
  
 
  function updateStats() {

	const total_cases = cases_list[cases_list.length - 1];
	const new_confirmed_cases = total_cases - cases_list[cases_list.length - 2];
  

	const total_recovered = recovered_list[recovered_list.length - 1];
	const new_recovered_cases = total_recovered - recovered_list[recovered_list.length - 2];
  
	
	const total_deaths = deaths_list[deaths_list.length - 1];
	const new_deaths_cases = total_deaths - deaths_list[deaths_list.length - 2];
  
	// aficher sur les balise html

	country_name_element.innerHTML = user_country;

	total_cases_element.innerHTML = total_cases;
	new_cases_element.innerHTML = `+${new_confirmed_cases}`;


	recovered_element.innerHTML = total_recovered;
	new_recovered_element.innerHTML = `+${new_recovered_cases}`;


	deaths_element.innerHTML = total_deaths;
	new_deaths_element.innerHTML = `+${new_deaths_cases}`;

}






// const settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://covid-193.p.rapidapi.com/countries",
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "8c420f7d20msh98af28e0a6f0903p14d1e7jsn340655849a03",
// 		"x-rapidapi-host": "covid-193.p.rapidapi.com"
// 	}
// };

// $.ajax(settings).done(function (response) {
// 	console.log(response);
// });
