import './calendar.scss'
import { CalendarCell } from "./calendarCell";

type CalendarProps = {
    year: number,
    markedDatesScript: string
}

export type marker = {
    category: string,
    tag: string
}

export default function Calendar({ year, markedDatesScript }: CalendarProps) {

    const markedDates = parseDateScript(markedDatesScript, year);

    const months = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
    const rows = ["", ...months];

    return <div className='calendar'>
        {[...Array(12+1)].map((x, m) =>
            <div className='month' key={m}>
                {[...Array(31+1)].map((x, d) =>
                    (
                        m === 0 || d === 0
                            ? (d === 0 ? <CalendarCell key={d} head={true}>{rows[m]}</CalendarCell> : <CalendarCell key={d} head={true}>{d}</CalendarCell>)
                            : <CalendarCell key={d} head={false} day={d} month={m} year={year} markers={markedDates[m][d]} />
                    )
                )}
            </div>
        )}
    </div>;

}


function parseDateScript(ds:string, year:number) : marker[][][] {

    let all_dates:marker[][][] = [];
    [...Array(12+1)].map((x,m) => {
        all_dates.push([]);
        [...Array(31+1)].map((x, d) => {
            all_dates[m][d] = [];
        });
    });

    ds.split('\n').forEach(line => {

        const categoryName = line.split(":")[0].trim();
        const dates = parseDateScriptLine(line.split(":")[1], year);

        dates.forEach(d => {

            all_dates[d.date.getMonth()+1][d.date.getDate()].push({
                category: categoryName,
                tag: d.tag
            });

        });
    });

    return all_dates;
}

type dateElement = {
    date: Date,
    tag: string
}

function parseDateScriptLine(dl:string, year:number): dateElement[] {

    const dates : dateElement[] = [];

    const values = dl.split(",");

    values.forEach(v => {

        v = v.replace(/\s*/g, ''); // entferne whitspaces
        const tag = v.replace(/[\d\-.]*/g, ''); // lese alle zeichen, die nicht zum datum gehören als zusätzliche info aus
        v = v.replace(/[^\d\-.]*/g, ''); // lasse nur die datums drin


        const m = v.match(/([^\-]+)-([^\-]+)/); // teste, ob range

        if(m === null) { // keine range
            dates.push({
                date: new Date(year, parseInt(v.split(".")[1])-1, parseInt(v.split(".")[0])),
                tag: tag
            });
            return;
        }

        const to_month = parseInt(m[2].split(".")[1])-1;
        const to = new Date(year, to_month, parseInt(m[2].split(".")[0]));
        const from = new Date(year, m[1].split(".")[1] ? parseInt(m[1].split(".")[1])-1: to_month, parseInt(m[1].split(".")[0]));

        for(let this_date = new Date(from); this_date <= new Date(to); this_date.setDate(this_date.getDate()+1)) {
            dates.push({
                date: new Date(this_date),
                tag: tag
            });
        }

    });

    return dates;
}

