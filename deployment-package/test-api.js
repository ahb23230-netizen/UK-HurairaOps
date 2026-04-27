#!/usr/bin/env node
/**
 * Backend Health Check & Test Script
 *
 * Usage: node test-api.js [backend-url]
 *
 * Examples:
 *   node test-api.js                           # Tests http://localhost:3001
 *   node test-api.js https://your-backend.onrender.com
 */

const BASE_URL = process.argv[2] || 'http://localhost:3001';

async function testHealth() {
  console.log(`\n🔍 Testing health check: ${BASE_URL}/api/health\n`);

  try {
    const res = await fetch(`${BASE_URL}/api/health`);
    const data = await res.json();

    if (res.ok) {
      console.log('✅ Health check passed!');
      console.log('📊 Response:', JSON.stringify(data, null, 2));
      return true;
    } else {
      console.log('❌ Health check failed');
      console.log('Status:', res.status);
      return false;
    }
  } catch (err) {
    console.log('❌ Cannot connect to backend');
    console.log('Error:', err.message);
    console.log('\nMake sure the backend is running:');
    console.log('  node index.mjs');
    return false;
  }
}

async function testChat() {
  console.log(`\n💬 Testing chat endpoint: ${BASE_URL}/api/chat\n`);

  try {
    const res = await fetch(`${BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'What is the ideal fridge temperature?' }],
        systemPrompt: 'You are a helpful assistant.'
      })
    });

    const data = await res.json();

    if (res.ok && data.reply) {
      console.log('✅ Chat API working!');
      console.log('\n📝 Response:', data.reply.substring(0, 200) + '...');
      return true;
    } else {
      console.log('❌ Chat API failed');
      console.log('Response:', JSON.stringify(data, null, 2));
      return false;
    }
  } catch (err) {
    console.log('❌ Cannot connect to chat endpoint');
    console.log('Error:', err.message);
    return false;
  }
}

async function main() {
  console.log('═══════════════════════════════════════════════');
  console.log('     UK Hospitality Backend Test Suite         ');
  console.log('═══════════════════════════════════════════════');
  console.log(`\n🌐 Testing backend at: ${BASE_URL}`);

  const healthOk = await testHealth();
  const chatOk = await testChat();

  console.log('\n═══════════════════════════════════════════════');

  if (healthOk && chatOk) {
    console.log('🎉 All tests passed! Backend is ready.');
    console.log(`\n📋 Next step: Update frontend VITE_API_URL to: ${BASE_URL}`);
  } else {
    console.log('⚠️  Some tests failed. Check the errors above.');
    console.log('\n📋 Common issues:');
    console.log('   1. Backend not running → Run: node index.mjs');
    console.log('   2. Wrong URL → Check your Render deployment URL');
    console.log('   3. CORS issues → Verify FRONTEND_URL is set in env vars');
  }

  console.log('═══════════════════════════════════════════════\n');
}

main();
