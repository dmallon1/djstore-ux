export const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:8000" : "https://aubreyjobs.com";


export function postData(data, lookup=false) {
    let endUrl = 'order';
    if (lookup) {
        endUrl = 'order-lookup';
    }

    return fetch(`${baseUrl}/api/${endUrl}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFTOKEN': getCookie("csrftoken"),
	},
        body: JSON.stringify(data),
    })
    .then(r => r.json().then(data => ({data: data, status: r.status})));
}


export const states = [
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY'
];


export function getItem(items, id) {
    if (items && items.length) {
        return items.find(el => el.id === id);
    }
}


export const statusEnum = {
    'p': 'processing',
    's': 'shipped',
    'd': 'delivered',
};


function getCookie(name) {
    const value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}
