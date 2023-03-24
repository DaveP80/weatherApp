let searchquery = {}

async function getWeather(api_url) {

    const response = await fetch(api_url);

    const data = await response.json();

    return data;
}
let submitwidget = document.querySelector(".example")
submitwidget.addEventListener('submit', (event) => {

    event.preventDefault()
    let result = 0;
    const numberInput = document.getElementById("temp-to-convert");

    const number = parseInt(numberInput.value);

    let radio1 = document.getElementById("to-c")
    let radio2 = document.getElementById("to-f")

    if (radio1.checked == true) { result = ((number - 32) * 5) / 9 }
    else if (radio2.checked == true) { result = (number * 1.8) + 32 }
    let result2 = document.querySelector('.tempresult')

    result2.textContent = result.toFixed(2)

})

let count = 0
let futurecast = document.querySelector('.future')
let firstcolumn = document.querySelector('.landing')
firstcolumn.style.display = 'grid';

firstcolumn.style.gridTemplateColumns = '1fr 1fr 1fr';
firstcolumn.style.gridTemplateRows = '1fr 1fr';

let hform = document.querySelector('.userinput')

hform.addEventListener('submit', (event) => {
    event.preventDefault()

    getWeather(`https://wttr.in/${event.target.city.value}?format=j1`).then(res => {

        if (res['nearest_area'][0]['region'][0]['value']) {

            futurecast.display = 'grid'

            searchquery[res['nearest_area'][0]['areaName'][0]['value']] = res

            let changeh4 = document.querySelector('.query0 h4')
            changeh4.textContent = ''
            changeh4.textContent = event.target.city.value
            let h2title = document.createElement('h2')
            h2title.textContent = event.target.city.value
            document.querySelector('.query0').prepend(h2title)
            let rundown = document.querySelector('.query0 .rundown')
            rundown.innerHTML = ""
            let p = document.createElement('p')
            p.innerHTML = `
            <strong>Nearest Area:</strong> ${res['nearest_area'][0]['areaName'][0]['value']}<br/>
            <strong>Region:</strong> ${res['nearest_area'][0]['region'][0]['value']}<br/> 
            <strong>Country:</strong> ${res['nearest_area'][0]['country'][0]['value']}<br/>
            <strong>Currently:</strong> Feels Like ${res['current_condition'][0]['FeelsLikeF']}°F<br/>
            <strong>Chance of Sunshine:</strong> ${res['weather'][0]['hourly'][0]['chanceofsunshine']}<br/>
            <strong>Chance of Snow:</strong> ${res['weather'][0]['hourly'][0]['chanceofsnow']}<br/>
            <strong>Chance of Rain:</strong> ${res['weather'][0]['hourly'][0]['chanceofrain']}`
            rundown.appendChild(p)

            if (Number(res['weather'][0]['hourly'][0]['chanceofsunshine']) > 50) {
                let sicon = document.createElement('img')
                sicon.alt = 'sun'
                sicon.src = './assets/icons8-summer.gif'
                rundown.prepend(sicon)
            } else if (Number(res['weather'][0]['hourly'][0]['chanceofrain']) > 50) {
                let sicon = document.createElement('img')
                sicon.alt = 'rain'
                sicon.src = './assets/icons8-torrential-rain.gif'
                rundown.prepend(sicon)
            } else if (Number(res['weather'][0]['hourly'][0]['chanceofsnow']) > 50) {
                let sicon = document.createElement('img')
                sicon.alt = 'snow'
                sicon.src = './assets/icons8-light-snow.gif'
                rundown.prepend(sicon)
            }

            let preventd = document.querySelectorAll('.prev li')

            if (!Object.values(preventd).some(item => item.id == res['nearest_area'][0]['areaName'][0]['value'])) {

                let cpara = document.querySelector('.pul')
                cpara.hidden = 'true'
                let delh = document.getElementById('prevheader')
                if (delh) delh.remove();
                let sbar = document.querySelector('.slist')
                let newitem = document.createElement('li')
                newitem.id = res['nearest_area'][0]['areaName'][0]['value']
                newitem.innerHTML = 
                `<a><u>${res['nearest_area'][0]['areaName'][0]['value']}</u></a> ${res['current_condition'][0]['FeelsLikeF']}°F`
                sbar.appendChild(newitem)

                newitem.addEventListener('click', (event) => {
                    event.preventDefault()
                    let changecenter = document.querySelector('.query0')
                    changecenter.innerHTML = ""
                    let changeh4 = document.createElement('h4')
                    changeh4.textContent = searchquery[newitem.id]['nearest_area'][0]['areaName'][0]['value']
                    changecenter.append(changeh4)
                    let irundown = document.createElement('div')
                    irundown.classList.add('rundown')
                    changecenter.append(irundown)
                    let rundown = document.querySelector('.query0 .rundown')
                    rundown.innerHTML = ""
                    let p = document.createElement('p')
                    p.innerHTML = 
                    `<strong>Area:</strong> ${searchquery[newitem.id]['nearest_area'][0]['areaName'][0]['value']}<br/>
                    <strong>Region:</strong> ${searchquery[newitem.id]['nearest_area'][0]['region'][0]['value']}<br/> 
                    <strong>Country:</strong> ${searchquery[newitem.id]['nearest_area'][0]['country'][0]['value']}<br/>
                    <strong>Currently:</strong> Feels Like ${searchquery[newitem.id]['current_condition'][0]['FeelsLikeF']}°F`
                    rundown.appendChild(p)
                    changeCenter(searchquery[newitem.id])
                })
            }
            let changeCenter = (args) => {

                ['.today', '.tomorrow', '.tomorrow2'].forEach((item, i) => {
                    let rundown2 = document.querySelector(item + " " + '.rundown')
                    rundown2.innerHTML = ""
                    let p2 = document.createElement('p')
                    p2.innerHTML = `<strong>Average Temperature:</strong> ${args['weather'][i]['avgtempF']}°F<br/>
            <strong>Max Temperature:</strong> ${args['weather'][i]['maxtempF']}°F<br/> 
            <strong>Min Temperature:</strong> ${args['weather'][i]['mintempF']}°F<br/>`
                    rundown2.appendChild(p2)
                })
            }
            changeCenter(res)
            event.target.city.value = ''
        }
    }
    )
})

