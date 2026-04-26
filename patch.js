const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Add val3
content = content.replace(
    "const [val2, setVal2] = useState('');",
    "const [val2, setVal2] = useState('');\n            const [val3, setVal3] = useState('');"
);

// 2. Add wizSubTimes
content = content.replace(
    "const [wizSubAmt, setWizSubAmt] = useState('');",
    "const [wizSubAmt, setWizSubAmt] = useState('');\n            const [wizSubTimes, setWizSubTimes] = useState('3');"
);

// 3. Clear val3 when opening add_subject modal (val1='', val2='')
content = content.replace(
    /setVal1\(''\); setVal2\(''\); setModal\(\{open:true, type:'add_subject', data:\{exId:ex.id\}\}\);/g,
    "setVal1(''); setVal2(''); setVal3('3'); setModal({open:true, type:'add_subject', data:{exId:ex.id}});"
);

// 4. Update the add_subject modal JSX
content = content.replace(
    /<input type="number" value=\{val2\} onChange=\{e => setVal2\(e.target.value\)\} placeholder="حجم کل \(تست، صفحه، دقیقه\)" className="w-full p-3 mb-6 bg-slate-100 dark:bg-slate-700 rounded-xl dark:text-white outline-none" \/>/g,
    `<input type="number" value={val2} onChange={e => setVal2(e.target.value)} placeholder="حجم کل (تست، صفحه، دقیقه)" className="w-full p-3 mb-3 bg-slate-100 dark:bg-slate-700 rounded-xl dark:text-white outline-none" />\n                                        <input type="number" value={val3} onChange={e => setVal3(e.target.value)} placeholder="تعداد دفعات مرور (پیش‌فرض: ۳)" className="w-full p-3 mb-6 bg-slate-100 dark:bg-slate-700 rounded-xl dark:text-white outline-none" />`
);

// 5. Update logic in add_subject modal
content = content.replace(
    "if (val1 && !isNaN(s)) {",
    "const t = parseInt(val3) || 3;\n                                                if (val1 && !isNaN(s)) {"
);

content = content.replace(
    "setExams(prev => prev.map(ex => ex.id === modal.data.exId ? { ...ex, subjects: [...ex.subjects, { id: 's' + Date.now(), name: val1, slides: s }] } : ex));",
    "setExams(prev => prev.map(ex => ex.id === modal.data.exId ? { ...ex, subjects: [...ex.subjects, { id: 's' + Date.now(), name: val1, slides: s, times: t }] } : ex));"
);


// 6. Update Wizard subject addition
content = content.replace(
    /<div className="flex-\[1\]"><input type="number" value=\{wizSubAmt\} onChange=\{e=>setWizSubAmt\(e.target.value\)\} placeholder="تعداد کل" className="w-full p-3 bg-white dark:bg-slate-800 rounded-xl text-xs font-bold dark:text-white text-center outline-none border border-slate-200 dark:border-slate-700" \/><\/div>/g,
    `<div className="flex-[1]"><input type="number" value={wizSubAmt} onChange={e=>setWizSubAmt(e.target.value)} placeholder="تعداد کل" className="w-full p-3 bg-white dark:bg-slate-800 rounded-xl text-xs font-bold dark:text-white text-center outline-none border border-slate-200 dark:border-slate-700" /></div>\n                                                <div className="flex-[1]"><input type="number" value={wizSubTimes} onChange={e=>setWizSubTimes(e.target.value)} placeholder="دفعات (۳)" className="w-full p-3 bg-white dark:bg-slate-800 rounded-xl text-xs font-bold dark:text-white text-center outline-none border border-slate-200 dark:border-slate-700" /></div>`
);

content = content.replace(
    "button onClick={() => { const amt = parseInt(wizSubAmt); if(wizSubName && !isNaN(amt)) { setWizSubjects(prev => [...prev, { id: 's'+Date.now(), name: wizSubName, slides: amt }]); setWizSubName(''); setWizSubAmt(''); } }}",
    "button onClick={() => { const amt = parseInt(wizSubAmt); const t = parseInt(wizSubTimes) || 3; if(wizSubName && !isNaN(amt)) { setWizSubjects(prev => [...prev, { id: 's'+Date.now(), name: wizSubName, slides: amt, times: t }]); setWizSubName(''); setWizSubAmt(''); setWizSubTimes('3'); } }}"
);


content = content.replace(
    "if (!isNaN(amt)) finalSubs.push({ id: 's'+Date.now(), name: wizSubName, slides: amt });",
    "const t = parseInt(wizSubTimes) || 3; if (!isNaN(amt)) finalSubs.push({ id: 's'+Date.now(), name: wizSubName, slides: amt, times: t });"
);

// 7. Render subjects in UI map
content = content.replace(
    /<input type="number" value=\{s.slides\} onChange=\{e => handleUpdateSlide\(ex.id, s.id, e.target.value\)\} className="w-14 bg-slate-100 dark:bg-slate-900 border-none rounded-lg text-center text-xs font-bold text-primary-600 dark:text-primary-400 p-1.5 outline-none" \/>/g,
    `<input type="number" value={s.slides} onChange={e => handleUpdateSlide(ex.id, s.id, e.target.value)} className="w-14 bg-slate-100 dark:bg-slate-900 border-none rounded-lg text-center text-xs font-bold text-primary-600 dark:text-primary-400 p-1.5 outline-none" title="حجم مبحث" />\n                                                        <input type="number" value={s.times || 3} onChange={e => handleUpdateTimes(ex.id, s.id, e.target.value)} className="w-10 bg-slate-100 dark:bg-slate-900 border-none rounded-lg text-center text-xs font-bold text-primary-600 dark:text-primary-400 p-1.5 outline-none" title="دفعات مرور" />`
);

// 8. Define handleUpdateTimes
content = content.replace(
    "const handleUpdateSlide = (exId, subId, slides) => { setExams(prev => prev.map(ex => ex.id === exId ? { ...ex, subjects: ex.subjects.map(s => s.id === subId ? { ...s, slides: parseInt(slides) || 0 } : s) } : ex)); };",
    "const handleUpdateSlide = (exId, subId, slides) => { setExams(prev => prev.map(ex => ex.id === exId ? { ...ex, subjects: ex.subjects.map(s => s.id === subId ? { ...s, slides: parseInt(slides) || 0 } : s) } : ex)); };\n            const handleUpdateTimes = (exId, subId, times) => { setExams(prev => prev.map(ex => ex.id === exId ? { ...ex, subjects: ex.subjects.map(s => s.id === subId ? { ...s, times: parseInt(times) || 1 } : s) } : ex)); };"
);


// 9. Scheduler Left init
content = content.replace(
    "exams.forEach(ex => ex.subjects.forEach(s => left[s.id] = { 1: s.slides, 2: s.slides, 3: s.slides }));",
    `exams.forEach(ex => ex.subjects.forEach(s => {
                    const times = s.times || 3;
                    left[s.id] = {};
                    for(let i=1; i<=times; i++) left[s.id][i] = s.slides;
                }));`
);

// 10. Scheduler Phase Logic
content = content.replace(
    `                        const p1D = Math.max(1, Math.floor(totalDays * 0.45));
                        const p2D = Math.max(1, Math.floor(totalDays * 0.35));
                        const dayIdx = Math.floor((curr - sDate) / 86400000);

                        ex.subjects.forEach(sub => {
                            if (sub.slides <= 0) return;
                            let phase, remD;
                            if (dayIdx < p1D) { phase = 1; remD = p1D - dayIdx; }
                            else if (dayIdx < p1D + p2D) { phase = 2; remD = (p1D + p2D) - dayIdx; }
                            else { phase = 3; remD = totalDays - dayIdx; }`,
    `                        const dayIdx = Math.floor((curr - sDate) / 86400000);

                        ex.subjects.forEach(sub => {
                            if (sub.slides <= 0) return;

                            const times = sub.times || 3;
                            const pDays = [];
                            let remTotal = totalDays;

                            if (times === 3) {
                                pDays.push(Math.max(1, Math.floor(totalDays * 0.45)));
                                pDays.push(Math.max(1, Math.floor(totalDays * 0.35)));
                                pDays.push(Math.max(1, totalDays - pDays[0] - pDays[1]));
                            } else {
                                const base = Math.max(1, Math.floor(totalDays / times));
                                for(let i=0; i<times-1; i++) { pDays.push(base); }
                                pDays.push(Math.max(1, totalDays - base*(times-1)));
                            }

                            let phase = times;
                            let remD = pDays[times-1];
                            let acc = 0;
                            for (let i = 0; i < times; i++) {
                                if (dayIdx < acc + pDays[i]) {
                                    phase = i + 1;
                                    remD = (acc + pDays[i]) - dayIdx;
                                    break;
                                }
                                acc += pDays[i];
                            }`
);

fs.writeFileSync('index.html', content);
