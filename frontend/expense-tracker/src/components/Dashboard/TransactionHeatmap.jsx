import React, { useMemo, useState, useEffect } from 'react';
import moment from 'moment';

function getColor(count) {
  if (count === 0) return '#e5e7eb'; 
  if (count < 2) return '#c6e48b'; 
  if (count < 5) return '#7bc96f';
  if (count < 10) return '#239a3b';
  return '#196127'; 
}


const TransactionHeatmap = ({ transactions = [] }) => {
 const years = useMemo(() => {
    const set = new Set(transactions.map(t => moment(t.date || t.createdAt).year()));
    const arr = Array.from(set).sort((a, b) => b - a);
    if (arr.length === 0) arr.push(moment().year());
    return arr;
  }, [transactions]);

  const [selectedYear, setSelectedYear] = useState(years[0]);

  // Update selectedYear if years changes (e.g., after adding a new transaction in a new year)
  useEffect(() => {
    setSelectedYear(years[0]);
  }, [years]);

  // All days in selected year, starting from Jan 1
  const startOfYear = moment(`${selectedYear}-01-01`).startOf('day');
  const endOfYear = moment(`${selectedYear}-12-31`).endOf('day');
  const daysInYear = endOfYear.diff(startOfYear, 'days') + 1;
  const days = Array.from({ length: daysInYear }, (_, i) => startOfYear.clone().add(i, 'days'));

  // Count transactions per day
  const data = days.map(date => {
    const count = transactions.filter(t => moment(t.date || t.createdAt).isSame(date, 'day')).length;
    return { date: date.format('YYYY-MM-DD'), count };
  });

  // Split days into months
  const months = [];
  for (let m = 0; m < 12; m++) {
    const monthStart = startOfYear.clone().month(m).startOf('month');
    const monthEnd = startOfYear.clone().month(m).endOf('month');
    const monthDays = [];
    for (let d = 0; d < monthEnd.diff(monthStart, 'days') + 1; d++) {
      monthDays.push(monthStart.clone().add(d, 'days'));
    }
    months.push(monthDays);
  }

  // For each month, arrange into weeks (columns) and days (rows)
  const monthGrids = months.map(monthDays => {
    // Find the first Sunday (GitHub style)
    const firstDay = monthDays[0];
    const firstWeekday = firstDay.day();
    // Pad start with nulls if not Sunday
    const paddedDays = Array.from({ length: firstWeekday }, () => null).concat(monthDays);
    // Pad end to fill last week
    while (paddedDays.length % 7 !== 0) paddedDays.push(null);
    // Arrange into columns (weeks)
    const weekCols = [];
    for (let i = 0; i < paddedDays.length; i += 7) {
      weekCols.push(paddedDays.slice(i, i + 7));
    }
    return weekCols;
  });

  // Calculate total submissions for the year
  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6 overflow-x-visible">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-800">{total}</span>
          <span className="text-gray-500">transactions in {selectedYear}</span>
        </div>
        <select
          className="ml-auto border border-gray-300 rounded px-2 py-1 text-sm bg-white"
          value={selectedYear}
          onChange={e => setSelectedYear(Number(e.target.value))}
        >
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-row flex-wrap gap-3 items-end" style={{minWidth:240, maxWidth:'100%', overflowX:'visible'}}>
        {monthGrids.map((weeks, monthIdx) => (
          <div key={monthIdx} className="flex flex-col items-center" style={{minWidth:32}}>
            {/* Heatmap grid for month */}
            <div className="flex flex-row gap-[2px]">
              {weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-[2px]">
                  {week.map((day, dayIdx) => {
                    if (!day) return <div key={dayIdx} style={{ width: 16, height: 16, background: 'transparent' }} />;
                    const d = data.find(x => x.date === day.format('YYYY-MM-DD'));
                    return (
                      <div
                        key={dayIdx}
                        title={`${day.format('MMM DD, YYYY')}: ${d.count} transaction${d.count !== 1 ? 's' : ''}`}
                        style={{
                          width: 16,
                          height: 16,
                          background: getColor(d.count),
                          borderRadius: 3,
                          border: '1px solid #e5e7eb',
                        }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
            {/* Month label - always show, never clipped */}
            <div className="text-[9px] text-gray-500 font-medium mt-0.5 whitespace-nowrap" style={{ minWidth: 24, textAlign: 'center', lineHeight: '1.1' }}>
              {moment(months[monthIdx][0]).format('MMM')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHeatmap;
