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
            <h1 className="font-weight-light">{copy[page].title}</h1>
            <hr className="border border-dark m-0 mb-3"/>
            {copy[page].content.map((item, i) => (
                <div key={i}>
                    <h4>{item.header}</h4>
                    <p>{item.section}</p>
                </div>
            ))}
        </div>
    );
}
