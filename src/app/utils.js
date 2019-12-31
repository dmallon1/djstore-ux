export const innerUrl = process.env.NODE_ENV === "development" ? "localhost:8000" : "store.danmallon.com";


export function postData(data, lookup=false) {
    let endUrl = 'order';
    if (lookup) {
        endUrl = 'order-lookup';
    }

    return fetch(`http://${innerUrl}/api/${endUrl}/`, {
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


export const numToSize = {
    1: 's',
    2: 'm',
    3: 'l',
    4: 'xl',
    5: 'xxl',
};


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

