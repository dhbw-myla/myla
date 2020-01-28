import React, { Component } from 'react';
import { PieChart, Pie } from 'recharts';

class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data01: [
                { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
                { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
            ],
            data02: [
                { name: 'A1', value: 100 },
                { name: 'A2', value: 300 },
                { name: 'B1', value: 100 },
                { name: 'B2', value: 80 },
                { name: 'B3', value: 40 },
                { name: 'B4', value: 30 },
                { name: 'B5', value: 50 },
                { name: 'C1', value: 100 },
                { name: 'C2', value: 200 },
                { name: 'D1', value: 150 },
                { name: 'D2', value: 50 },
            ]
        }
    }

    render() {
        const { data01, data02 } = this.state;
        return (
            <PieChart width={730} height={250}>
                <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
            </PieChart>
        );
    }
}

export default Charts;