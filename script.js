const button = document.querySelector('.card .search button')
const error = document.querySelector('.card .error')
const input = document.querySelector('.search input')
const city = document.querySelector('.city')
const img = document.querySelector('.weather-icon')
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')
const temp = document.querySelector('.temp')
const weather = document.querySelector('.weather')

// console.log(button);

input.addEventListener('input', () => {
  error.style.visibility = 'hidden'
})

input.value = localStorage.getItem('CountryName') || ''
console.log(input.value)
if(input.value != '')
{
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=b9003ebaf10ba59028d518aeea46d501`
      )
        .then((res) => res.json())
        .then((data) => {
          displaydata(data)
        })

   
}


button.addEventListener('click', () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=b9003ebaf10ba59028d518aeea46d501`
  )
    .then((res) => res.json())
    .then((data) => {
      displaydata(data)
    })
})

input.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=b9003ebaf10ba59028d518aeea46d501`
    )
      .then((res) => res.json())
      .then((data) => {
        displaydata(data)
      })
  }
})

function displaydata(data) {
  if (data.cod === '404') {
    error.style.visibility = 'visible'
    weather.style.display = 'none'
    return
  }

  localStorage.setItem('CountryName', data.name)

  weather.style.display = 'block'
  city.innerText = data.name

  if (data.weather[0].main === 'Clouds') {
    img.src = `./images/${data.weather[0].main.toLowerCase()}.png`
  } else if (data.weather[0].main === 'Drizzle') {
    img.src = `./images/${data.weather[0].main.toLowerCase()}.png`
  } else if (data.weather[0].main === 'Mist') {
    img.src = `./images/${data.weather[0].main.toLowerCase()}.png`
  } else if (data.weather[0].main === 'Rain') {
    img.src = `./images/${data.weather[0].main.toLowerCase()}.png`
  } else if (data.weather[0].main === 'Clear') {
    img.src = `./images/${data.weather[0].main.toLowerCase()}.png`
  } else if (data.weather[0].main === 'Snow') {
    img.src = `./images/${data.weather[0].main.toLowerCase()}.png`
  }

  humidity.innerText = data.main.humidity + '%'
  wind.innerText = data.wind.speed + 'km/h'

  temp.innerText = Math.floor(data.main.temp - 273.15) + '°c'
}
