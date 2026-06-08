import React from 'react';

const stocksData = [
    { stock_name: "EFX", company_name: "Equifax Inc", price: 163.55, currency: "USD", change: "+9.03" },
    { stock_name: "IRM", company_name: "Iron Mountain Inc", price: 33.21, currency: "USD", change: "+1.42" },
    { stock_name: "NTAP", company_name: "NetApp Inc", price: 54.81, currency: "USD", change: "-6.01" },
    { stock_name: "CTL", company_name: "Centurylink Inc", price: 13.79, currency: "USD", change: "-1.37" }
];

const Chessboard = () => {
    const rows = 8;
    const cols = 8;
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const numbers = [8, 7, 6, 5, 4, 3, 2, 1];

    const getCellColor = (row, col) => {
        return (row + col) % 2 === 0 ? 'white' : 'black';
    };

    return ( <
        div className = "chessboard-container" >
        <
        div className = "notation-left" > {
            numbers.map(num => ( <
                div key = { num }
                className = "notation-number" > { num } < /div>
            ))
        } <
        /div> <
        div className = "board-with-bottom-notation" >
        <
        div className = "chessboard" > {
            numbers.map((_, rowIdx) => ( <
                div key = { rowIdx }
                className = "board-row" > {
                    letters.map((_, colIdx) => ( <
                        div key = { `${rowIdx}-${colIdx}` }
                        className = { `cell ${getCellColor(rowIdx, colIdx)}` }
                        />
                    ))
                } <
                /div>
            ))
        } <
        /div> <
        div className = "notation-bottom" > {
            letters.map(letter => ( <
                div key = { letter }
                className = "notation-letter" > { letter } < /div>
            ))
        } <
        /div> <
        /div> <
        /div>
    );
};

const TasksComponent = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const getChangeClass = (changeStr) => {
        const value = parseFloat(changeStr);
        if (value > 0) return 'positive-change';
        if (value < 0) return 'negative-change';
        return '';
    };

    return ( <
        div className = "tasks-container" > { /* Задание 1 */ } <
        section className = "task" >
        <
        h2 > Задание 1: Сегодняшняя дата < /h2> <
        div className = "date-display" > { formattedDate } < /div> <
        /section>

        { /* Задание 2 */ } <
        section className = "task" >
        <
        h2 > Задание 2: Таблица акций < /h2> <
        table className = "stocks-table" >
        <
        thead >
        <
        tr > < th > Тикер < /th><th>Компания</th > < th > Цена < /th><th>Валюта</th > < th > Изменение < /th></tr >
        <
        /thead> <
        tbody > {
            stocksData.map((stock, idx) => ( <
                tr key = { idx } >
                <
                td > { stock.stock_name } < /td><td>{stock.company_name}</td >
                <
                td > { stock.price } < /td><td>{stock.currency}</td >
                <
                td className = { getChangeClass(stock.change) } > { stock.change } < /td> <
                /tr>
            ))
        } <
        /tbody> <
        /table> <
        /section>

        { /* Задание 3 */ } <
        section className = "task" >
        <
        h2 > Задание 3: Шахматная доска с нотациями < /h2> <
        Chessboard / >
        <
        /section> <
        /div>
    );
};

export default TasksComponent;
//npm create vite@latest my-app -- --template react