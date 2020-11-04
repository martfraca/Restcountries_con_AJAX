const countriesEl = document.getElementById('countries');
const toggleBtn = document.getElementById('toggle');
const filterBtn = document.getElementById('filtro');
const regionFilters = filterBtn.querySelectorAll('li');
const searchEl = document.getElementById('search');


getCountries();

async function getCountries() {
	const res = await fetch('https://restcountries.eu/rest/v2/all');
	const countries = await res.json();

	displayCountries(countries);
}
function displayCountries(countries) {
	countriesEl.innerHTML = '';

	countries.forEach(paises => {
		const paisesEl = document.createElement('div');
		paisesEl.classList.add('card');

		paisesEl.innerHTML = `
            <div>
                <img src="${paises.flag}" alt="Germany" />
            </div>
            <div class="card-body">
                <h3 class="country-name">${paises.name}</h3>
                <p>
                    <strong>Population:</strong>
                    ${paises.population}
                </p>
                <p class="country-region">
                    <strong>Region:</strong>
                    ${paises.region}
                </p>
                <p>
                    <strong>Capital:</strong>
                    ${paises.capital}
                </p>
            </div>
        `;

		paisesEl.addEventListener('click', () => {
			modal.style.display = 'flex';
			showCountryDetails(paises);
		});

		countriesEl.appendChild(paisesEl);
	});
}
// muestra y oculta los filtros de las etiquetas li
filterBtn.addEventListener('click', () => {
	filterBtn.classList.toggle('open');
});




searchEl.addEventListener('input', e => {
	const { value } = e.target;
	const countryName = document.querySelectorAll('.country-name');

	countryName.forEach(name => {
		if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
			// .card -> .card-body -> .country-name
			name.parentElement.parentElement.style.display = 'block';
		} else {
			name.parentElement.parentElement.style.display = 'none';
		}
	});
});

// agrega un filtro en el li dentro del .dropdown
regionFilters.forEach(filtro => {
	filtro.addEventListener('click', () => {
		const value = filtro.innerText;
		const countryRegion = document.querySelectorAll('.country-region');

		countryRegion.forEach(region => {
			if (region.innerText.includes(value) || value === 'All') {
				// .card -> .card-body -> .country-region
				region.parentElement.parentElement.style.display = 'block';
			} else {
				region.parentElement.parentElement.style.display = 'none';
			}
		});
	});
});