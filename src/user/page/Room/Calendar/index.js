import { memo } from "react";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const Calendar = ({ dates, setDates }) => {
  return (
    <DateRangePicker
      onChange={(item) => setDates([item.selection])}
      showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      months={2}
      ranges={dates}
      direction="horizontal"
    />
  );
};

export default memo(Calendar);
