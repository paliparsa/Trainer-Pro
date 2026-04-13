const fs = require('fs');

const { performance } = require('perf_hooks');

// Mock data
const exams = [];
for (let i = 0; i < 1000; i++) {
    exams.push({ date: '2023-10-' + (i % 30 + 1).toString().padStart(2, '0'), archived: false });
}

const sDate = new Date('2023-10-01T00:00:00');
const mDate = new Date('2024-10-01T00:00:00');
const startSun = new Date(sDate); startSun.setDate(startSun.getDate() - startSun.getDay());
const endSat = new Date(mDate);
if (endSat.getDay() !== 6) endSat.setDate(endSat.getDate() + (6 - endSat.getDay()));

const scheduleMap = {};
const skipped = [];
const todayISO = '2023-10-15';

function getLocalISODate(date) {
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().split('T')[0];
}

const validExams = exams;

// baseline
const startBaseline = performance.now();
for (let j = 0; j < 1000; j++) {
    const grid = []; let curr = new Date(startSun);
    while (curr <= endSat) {
        const dStr = getLocalISODate(curr);
        const dailyExams = validExams.filter(e => e.date === dStr);
        const sch = scheduleMap[dStr];
        const totalSlides = sch ? sch.tasks.reduce((acc, t) => acc + (t.status !== 'skipped' ? t.amt : 0), 0) : 0;

        grid.push({ date: new Date(curr), dStr, dailyExams, isSkipped: skipped.includes(dStr), totalSlides, isToday: dStr === todayISO, outOfBounds: curr < sDate || curr > mDate, internalDay: sch?.internalDay || null });
        curr.setDate(curr.getDate() + 1);
    }
}
const endBaseline = performance.now();
console.log('Baseline:', endBaseline - startBaseline, 'ms');

// optimized
const startOptimized = performance.now();
for (let j = 0; j < 1000; j++) {
    const grid = []; let curr = new Date(startSun);

    // Create map
    const examsByDate = {};
    for (let i = 0; i < validExams.length; i++) {
        const e = validExams[i];
        if (!examsByDate[e.date]) examsByDate[e.date] = [];
        examsByDate[e.date].push(e);
    }

    while (curr <= endSat) {
        const dStr = getLocalISODate(curr);
        const dailyExams = examsByDate[dStr] || [];
        const sch = scheduleMap[dStr];
        const totalSlides = sch ? sch.tasks.reduce((acc, t) => acc + (t.status !== 'skipped' ? t.amt : 0), 0) : 0;

        grid.push({ date: new Date(curr), dStr, dailyExams, isSkipped: skipped.includes(dStr), totalSlides, isToday: dStr === todayISO, outOfBounds: curr < sDate || curr > mDate, internalDay: sch?.internalDay || null });
        curr.setDate(curr.getDate() + 1);
    }
}
const endOptimized = performance.now();
console.log('Optimized:', endOptimized - startOptimized, 'ms');
