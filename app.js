//const api_url = "https://wttr.in/NYC?format=j1";
let searchquery = {}

  async function getWeather(api_url) {

    const response = await fetch(api_url);
 
    const data = await response.json();

    return data;  
}

let hform = document.querySelector('.userinput')

hform.addEventListener('submit', (event) => {
    event.preventDefault()

    getWeather(`https://wttr.in/${event.target.city.value}?format=j1`).then(res => {

    if (res['nearest_area'][0]['region'][0]['value']) {

        searchquery[event.target.city.value]=res['current_condition'][0]['FeelsLikeC']

        let changeh4 = document.querySelector('.query0 h4')
        changeh4.textContent = event.target.city.value
        let rundown = document.querySelector('.query0 .rundown')
        let p = document.createElement('p')
        p.innerHTML = `<strong>Area:</strong> ${res['nearest_area'][0]['areaName'][0]['value']}<br/>
        <strong>Region:</strong> ${res['nearest_area'][0]['region'][0]['value']}<br/> 
        <strong>Country:</strong> ${res['nearest_area'][0]['country'][0]['value']}<br/>
        <strong>Currently:</strong> Feels Like ${res['current_condition'][0]['FeelsLikeF']}°F`
        rundown.appendChild(p)
        // changeh4.textContent = res['nearest_area'][0]['country'][0]['value'] + " " + res['nearest_area'][0]['region'][0]['value'] + "\n" +
        // "feels like: " + res['current_condition'][0]['FeelsLikeF']

        let cpara = document.querySelector('.pul')
        cpara.hidden = 'true'
        let sbar = document.querySelector('.slist')
        let newitem = document.createElement('li')
        newitem.textContent = `${res['nearest_area'][0]['areaName'][0]['value']} ${res['current_condition'][0]['FeelsLikeF']}°F`
        sbar.appendChild(newitem)

    }}
    )

})

if (Object.keys(searchquery).length) {
    let sbar = document.querySelector('.slist')
    let newitem = document.createElement('li')
}