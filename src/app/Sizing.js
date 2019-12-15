import React from 'react';


export function SizeChart() {
    return (
        <div>
            <h1 className="font-weight-light">sizing</h1>
            <hr className="border border-dark m-0"/>
            <table className="mt-4" style={{width:100+'%'}}>
                <tbody>
                    <tr>
                        <td className="p-2">Sizes</td>
                        <td className="p-2">Width (IN)</td>
                        <td className="p-2">Length (IN)</td>
                        <td className="p-2">Sleeve Center Back (IN)</td>
                    </tr>
                    <tr>
                        <td className="p-2">S</td>
                        <td className="p-2">18</td>
                        <td className="p-2">28</td>
                        <td className="p-2">15.63</td>
                    </tr>
                    <tr>
                        <td className="p-2">M</td>
                        <td className="p-2">20</td>
                        <td className="p-2">29</td>
                        <td className="p-2">17</td>
                    </tr>
                    <tr>
                        <td className="p-2">L</td>
                        <td className="p-2">22</td>
                        <td className="p-2">30</td>
                        <td className="p-2">18.5</td>
                    </tr>
                    <tr>
                        <td className="p-2">XL</td>
                        <td className="p-2">24</td>
                        <td className="p-2">31</td>
                        <td className="p-2">20</td>
                    </tr>
                    <tr>
                        <td className="p-2">2XL</td>
                        <td className="p-2">26</td>
                        <td className="p-2">32</td>
                        <td className="p-2">21.5</td>
                    </tr>
                    <tr>
                        <td className="p-2">3XL</td>
                        <td className="p-2">28</td>
                        <td className="p-2">33</td>
                        <td className="p-2">22.88</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
