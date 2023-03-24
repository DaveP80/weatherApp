//const api_url = "https://wttr.in/NYC?format=j1";
let searchquery = {}

  async function getWeather(api_url) {

    const response = await fetch(api_url);
 
    const data = await response.json();

    return data;  
}

function submitForm() {
    const numberInput = document.getElementById("number");
    const incrementerInput = document.getElementById("incrementer");

    const number = parseInt(numberInput.value);
    const incrementer = parseInt(incrementerInput.value);

    const result = number + incrementer;
}
let count = 0
let futurecast = document.querySelector('.future')
let firstcolumn = document.querySelector('.landing')
firstcolumn.style.display = 'grid';

// set the grid template to 3 columns and 2 rows
firstcolumn.style.gridTemplateColumns = '1fr 1fr 1fr';
firstcolumn.style.gridTemplateRows = '1fr 1fr';

let hform = document.querySelector('.userinput')

hform.addEventListener('submit', (event) => {
    event.preventDefault()

    getWeather(`https://wttr.in/${event.target.city.value}?format=j1`).then(res => {

    if (res['nearest_area'][0]['region'][0]['value']) {
        //loadpage.classList.toggle('widgets')
        let firstcolumn = document.querySelector('.landing')
        futurecast.display = 'grid'

        searchquery[res['nearest_area'][0]['areaName'][0]['value']] = res

        console.log(searchquery);

        let changeh4 = document.querySelector('.query0 h4')
        changeh4.textContent = event.target.city.value
        let rundown = document.querySelector('.query0 .rundown')
        rundown.innerHTML = ""
        let p = document.createElement('p')
        p.innerHTML = `<strong>Area:</strong> ${res['nearest_area'][0]['areaName'][0]['value']}<br/>
        <strong>Region:</strong> ${res['nearest_area'][0]['region'][0]['value']}<br/> 
        <strong>Country:</strong> ${res['nearest_area'][0]['country'][0]['value']}<br/>
        <strong>Currently:</strong> Feels Like ${res['current_condition'][0]['FeelsLikeF']}°F<br/>
        <strong>Chance of Snow:</strong> ${res['weather'][0]['hourly'][0]['chanceofsnow']}<br/>
        <strong>Chance of Rain:</strong> ${res['weather'][0]['hourly'][0]['chanceofrain']}`
        rundown.appendChild(p)

        // changeh4.textContent = res['nearest_area'][0]['country'][0]['value'] + " " + res['nearest_area'][0]['region'][0]['value'] + "\n" +
        // "feels like: " + res['current_condition'][0]['FeelsLikeF']

        let cpara = document.querySelector('.pul')
        cpara.hidden = 'true'
        let sbar = document.querySelector('.slist')
        let newitem = document.createElement('li')
        newitem.id = res['nearest_area'][0]['areaName'][0]['value']
        newitem.innerHTML = `<a href=${''}>${res['nearest_area'][0]['areaName'][0]['value']}</a>  ${res['current_condition'][0]['FeelsLikeF']}°F`
        sbar.appendChild(newitem)

        newitem.addEventListener('click', (event) => {
            event.preventDefault()
            let changeh4 = document.querySelector('.query0 h4')
            console.log(newitem.id);
            changeh4.textContent = searchquery[newitem.id]['nearest_area'][0]['areaName'][0]['value']
            let rundown = document.querySelector('.query0 .rundown')
            rundown.innerHTML = ""
            let p = document.createElement('p')
            p.innerHTML = `<strong>Area:</strong> ${searchquery[newitem.id]['nearest_area'][0]['areaName'][0]['value']}<br/>
            <strong>Region:</strong> ${searchquery[newitem.id]['nearest_area'][0]['region'][0]['value']}<br/> 
            <strong>Country:</strong> ${searchquery[newitem.id]['nearest_area'][0]['country'][0]['value']}<br/>
            <strong>Currently:</strong> Feels Like ${searchquery[newitem.id]['current_condition'][0]['FeelsLikeF']}°F`
            rundown.appendChild(p)
        })

        let rundown2 = document.querySelector('.today .rundown')
        let p2 = document.createElement('p')
        p2.innerHTML = `<strong>Average Temperature:</strong> ${res['weather'][0]['avgtempF']}°F<br/>
        <strong>Max Temperature:</strong> ${res['weather'][0]['maxtempF']}°F<br/> 
        <strong>Min Temperature:</strong> ${res['weather'][0]['mintempF']}°F<br/>`
        rundown2.appendChild(p2)

        let rundown3 = document.querySelector('.tomorrow .rundown')
        let p3 = document.createElement('p')
        p3.innerHTML = `<strong>Average Temperature:</strong> ${res['weather'][1]['avgtempF']}°F<br/>
        <strong>Max Temperature:</strong> ${res['weather'][1]['maxtempF']}°F<br/> 
        <strong>Min Temperature:</strong> ${res['weather'][1]['mintempF']}°F<br/>`
        rundown3.appendChild(p3)

        let rundown4 = document.querySelector('.tomorrow2 .rundown')
        let p4 = document.createElement('p')
        p4.innerHTML = `<strong>Average Temperature:</strong> ${res['weather'][2]['avgtempF']}°F<br/>
        <strong>Max Temperature:</strong> ${res['weather'][2]['maxtempF']}°F<br/> 
        <strong>Min Temperature:</strong> ${res['weather'][2]['mintempF']}°F<br/>`
        rundown4.appendChild(p4)

    }}
    )
    count ++
})

