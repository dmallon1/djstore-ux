import React from 'react';
import copy from "./copy.json";


export function Privacy() {
    return <Inner page="privacy" />;
}


export function Terms() {
    return <Inner page="terms" />;
}


function Inner({page}) {
    return (
        <div>
            <h1>{copy[page].title}</h1>
            {copy[page].content.map(item => (
                <div>
                    <h4>{item.header}</h4>
                    <p>{item.section}</p>
                </div>
            ))}
        </div>
    );
}
