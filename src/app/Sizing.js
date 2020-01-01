import React from 'react';


export function SizeChart() {
    return (
        <div>
            <h1 className="font-weight-light">sizing</h1>
            <hr className="border border-dark m-0"/>
            <table className="mt-4" style={{width:100+'%'}}>
                <tbody>
                    <tr>
                        <td className="p-2">sizes</td>
                        <td className="p-2">width (in)</td>
                        <td className="p-2">length (in)</td>
                        <td className="p-2">sleeve center back (in)</td>
                    </tr>
                    <tr>
                        <td className="p-2">s</td>
                        <td className="p-2">18</td>
                        <td className="p-2">28</td>
                        <td className="p-2">15.63</td>
                    </tr>
                    <tr>
                        <td className="p-2">m</td>
                        <td className="p-2">20</td>
                        <td className="p-2">29</td>
                        <td className="p-2">17</td>
                    </tr>
                    <tr>
                        <td className="p-2">l</td>
                        <td className="p-2">22</td>
                        <td className="p-2">30</td>
                        <td className="p-2">18.5</td>
                    </tr>
                    <tr>
                        <td className="p-2">xl</td>
                        <td className="p-2">24</td>
                        <td className="p-2">31</td>
                        <td className="p-2">20</td>
                    </tr>
                    <tr>
                        <td className="p-2">xxl</td>
                        <td className="p-2">26</td>
                        <td className="p-2">32</td>
                        <td className="p-2">21.5</td>
                    </tr>
                    <tr>
                        <td className="p-2">xxxl</td>
                        <td className="p-2">28</td>
                        <td className="p-2">33</td>
                        <td className="p-2">22.88</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
