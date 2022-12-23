import React from 'react';
import classnames from 'classnames';
import { isHoliday } from 'feiertagejs';
import {marker} from "./calendar";
// @ts-ignore
import colorsys from 'colorsys';

type Props = {
    children?: React.ReactNode,
    head: boolean,
    day?: number,
    month?: number,
    year?: number,
    markers?: marker[]
}

const colors = ['#8fbadb','#bce477', '#c68fc7','#ffc175', '#fff080','#cdc9e3', '#fee7f3','#9fdbd1','#fd9486'];
const colorsOfCategories:any = {};

function getColor(category:string):string {
    if(!colorsOfCategories[category]) {
        colorsOfCategories[category] = colors.pop();
    }
    return colorsOfCategories[category];
}


export const CalendarCell: React.FC<Props> = ({ children, head, day, month, year, markers}: Props) => {

    if(!day || !month || !year || head) {
        return <td className={classnames({
            'head': head
        })}>
            {children}
        </td>;
    }

    const date = new Date(year, month-1, day);

    if(date.getDate() !== day) {
        return <td className='invalid'></td>;
    }

    if(date.getDay() === 0 || date.getDay() === 6) {
        return <td className='weekend'></td>;
    }

    if(isHoliday(date, 'BY')) {
        return <td className='holiday'></td>;
    }


    let style:React.CSSProperties = {};

    if(markers && markers.length) {

        if(markers.length === 1) {

            style.background = getColor(markers[0].category);

        } else {

            let width = 10;
            style.backgroundSize = width * markers.length + "px " + width * markers.length + "px ";


            let colors = markers.map(m => getColor(m.category));

            let inc = 100 / (colors.length * 2);
            let gradient = "linear-gradient(135deg, ";

            for(let i = 0; i < colors.length * 2; i++) {

                if(i === colors.length * 2 - 1) {
                    //letzter
                    gradient += colors[colors.length-1] + " 100%)";
                } else {
                    let perc = Math.round((i + 1) * inc * 100) / 100
                    gradient += colors[i % colors.length] + " " + perc + "%, " + colors[(i + 1) % colors.length] + " " + perc + "%, ";
                }
            }

            style.backgroundImage = gradient;

        }

    }


    return <td style={style}></td>;
};



