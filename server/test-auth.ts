
const BASE_URL = 'http://localhost:3000/api/auth';

async function testAuth() {
    console.log('Testing Registration...');
    const regRes = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com', password: 'password123' }),
    });

    const regData = await regRes.json();
    console.log('Register Response:', regRes.status, regData);

    if (regRes.status !== 201 && regRes.status !== 400) { // 400 if already exists
        console.error('Registration Failed');
    }

    console.log('Testing Login...');
    const loginRes = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com', password: 'password123' }),
    });

    const loginData = await loginRes.json();
    console.log('Login Response:', loginRes.status, loginData);

    if (loginRes.status === 200 && loginData.token) {
        console.log('Authentication Verified ✅');
    } else {
        console.error('Login Failed ❌');
        process.exit(1);
    }
}

testAuth().catch(console.error);
