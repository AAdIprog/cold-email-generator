
const AUTH_URL = 'http://localhost:3000/api/auth';
const EMAIL_URL = 'http://localhost:3000/api/emails';

async function testGeneration() {
    // 1. Login to get token
    console.log('Logging in...');
    const loginRes = await fetch(`${AUTH_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com', password: 'password123' }),
    });

    const loginData = await loginRes.json();
    if (loginRes.status !== 200) {
        console.error('Login Failed', loginData);
        process.exit(1);
    }

    const token = loginData.token;
    console.log('Logged in. Token acquired.');

    // 2. Generate Email
    console.log('Generating Email...');
    const genRes = await fetch(`${EMAIL_URL}/generate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            audience: 'Small Business Owners',
            product: 'AI-powered Accounting Software',
            valueProps: 'Saves 10 hours a week, Automates tax filing, Zero errors',
            tone: 'Professional but friendly',
            length: 'Short',
            cta: 'Book a demo'
        }),
    });

    const genData = await genRes.json();
    console.log('Generation Response:', genRes.status);
    console.log('Generated Email:', JSON.stringify(genData, null, 2));

    if (genRes.status === 200 && genData.subject && genData.body) {
        console.log('Email Generation Verified ✅');
    } else {
        console.error('Generation Failed ❌');
    }
}

testGeneration().catch(console.error);
