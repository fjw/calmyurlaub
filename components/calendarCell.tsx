'use client';

import React from 'react';
import classnames from 'classnames';
import { isHoliday } from 'feiertagejs';
import {marker} from "./calendar";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';


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
        return <div className={classnames({
            'head': head
        })}>
            {children}
        </div>;
    }


    const date = new Date(year, month-1, day);

    if(date.getDate() !== day) {
        return <div className='invalid' />;
    }

    if(date.getDay() === 0 || date.getDay() === 6) {

        return <Tippy content={<span>Tooltip</span>}>
            <div className='weekend' />
        </Tippy>;
    }

    if(isHoliday(date, 'BY')) {
        return <div className='holiday' />;
    }


    let style:React.CSSProperties = {};

    if(markers && markers.length) {

        if(markers.length === 1) {

            style.background = getColor(markers[0].category);

        } else {

            let width = 50;
            style.backgroundSize = markers.length * width + "% " + markers.length * width + "% ";


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


    return <div style={style} />;
};



