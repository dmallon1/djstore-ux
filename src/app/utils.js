export const innerUrl = process.env.NODE_ENV === "development" ? "localhost:8000" : "store.danmallon.com";


export function postData(data) {
    return fetch(`http://${innerUrl}/api/order/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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
