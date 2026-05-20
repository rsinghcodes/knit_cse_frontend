
const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');

async function run() {
    const formData = new FormData();
    formData.append('course', '1');
    formData.append('year', 'Year 1');
    formData.append('file', fs.createReadStream('package.json'));

    try {
        const res = await fetch('http://localhost:8000/api/course-timetables/', {
            method: 'POST',
            body: formData,
            // DO NOT explicitly set Content-Type header so form-data sets boundaries!
        });
        
        console.log('Status code:', res.status);
        const data = await res.text();
        console.log('Response body:', data);
    } catch(e) {
        console.log('Fetch error:', e);
    }
}
run();

