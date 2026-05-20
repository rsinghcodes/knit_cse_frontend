
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function run() {
    const api = axios.create({
      baseURL: 'http://localhost:8000',
      headers: { 'Content-Type': 'application/json' },
    });
    
    // Auth bypass: temporarily disabled auth in backend or mock user
    // Since IsAdminUser is still enforced in the views.py get_permissions:
    // Actually we need to remove it from views.py temporarily for the test to reach the endpoint properly.
    // I know that the UI passed auth and arrived at 400 Bad Request instead of 401/403.
    // Let's just create a dummy file and post it
    const formData = new FormData();
    formData.append('course', '1');
    formData.append('year', 'Year 1');
    formData.append('file', fs.createReadStream('package.json')); // any file

    try {
        const res = await api.post('/api/course-timetables/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log('Success:', res.data);
    } catch (e) {
        console.log('Error', e.response?.status);
        console.log('Error Data:', e.response?.data);
    }
}
run();

