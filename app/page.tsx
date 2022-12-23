import Image from 'next/image'
import styles from './page.module.css'
import Calendar from '../components/calendar'


export default function Page() {

  const script = "kita: 01.01-05.01, 23.01.,   h 21.02, 11.4,  12.4,19.5, 5.6-9.6, 05.07., 14-25.08, 4.9\ntest:3-7.7,13.7\nfoo: 12-28.12, 5.7, 23.8-15.9";

  return <Calendar year={2023} markedDatesScript={script} />;
}
