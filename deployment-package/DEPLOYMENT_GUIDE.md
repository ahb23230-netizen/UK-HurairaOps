# 🚀 Complete Deployment Guide

## Quick Summary

The **frontend** is now deployed at: https://wov565qnn1zj.space.minimax.io

The **backend** needs to be deployed separately. Here's how:

---

## Step 1: Deploy Backend to Render.com (Free Tier)

### 1.1 Create Account
- Go to https://render.com
- Sign up with GitHub (easiest)
- Free tier is sufficient

### 1.2 Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Choose **"Deploy from GitHub repo"** or upload files
3. Configure:
   - **Name**: `uk-hospitality-api`
   - **Region**: Frankfurt or London
   - **Runtime**: Node
   - **Build Command**: (leave empty - single file)
   - **Start Command**: `node index.mjs`

### 1.3 Set Environment Variables
Click **"Environment"** and add:

| Key | Value |
|-----|-------|
| `ANTHROPIC_API_KEY` | `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` |
| `PORT` | `10000` |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | `https://wov565qnn1zj.space.minimax.io` |

### 1.4 Deploy
Click **"Create Web Service"** and wait 1-2 minutes.

### 1.5 Get Your Backend URL
Once deployed, you'll see a URL like:
```
https://uk-hospitality-api.onrender.com
```

---

## Step 2: Update Frontend

Once you have your backend URL, update the frontend:

### Option A: Redeploy with New .env
Create a `.env` file:
```
VITE_API_URL=https://uk-hospitality-api.onrender.com
```

Rebuild and deploy again.

### Option B: Update Vite Config (for local dev)
Edit `vite.config.ts` and add:
```typescript
server: {
  proxy: {
    '/api': {
      target: 'https://your-backend-url.onrender.com',
      changeOrigin: true,
    },
  },
},
```

---

## Testing Your Deployment

### Health Check
```bash
curl https://your-backend-url.onrender.com/api/health
```
Expected: `{"status":"ok","timestamp":"..."}`

### Chat Test
```bash
curl -X POST https://your-backend-url.onrender.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "Hello"}],
    "systemPrompt": "You are a helpful assistant."
  }'
```

---

## Troubleshooting

### "Unexpected token '<'" Error
**Cause**: Frontend is calling `/api/chat` but backend isn't deployed.

**Fix**:
1. Deploy backend to Render.com
2. Update `VITE_API_URL` in frontend .env
3. Rebuild and redeploy frontend

### CORS Errors
**Cause**: Backend doesn't allow requests from your frontend.

**Fix**:
1. Set `FRONTEND_URL` environment variable in Render
2. Wait for redeploy

### API Key Errors
**Cause**: Invalid or missing API key.

**Fix**:
1. Verify `ANTHROPIC_API_KEY` is set correctly in Render
2. Check the key is valid in your Anthropic dashboard

---

## File Locations

```
/workspace/uk-hospitality-compliance/
├── server/                    # Backend files
│   ├── index.mjs             # Main server file
│   ├── package.json          # Dependencies
│   ├── render.yaml           # Render config
│   └── README.md             # Server docs
├── deployment-package/        # Ready-to-deploy backend
│   ├── index.mjs
│   ├── package.json
│   └── render.yaml
├── dist/                     # Built frontend
└── src/
    └── pages/
        └── EHOInspectorBot.tsx  # Updated to use VITE_API_URL
```

---

## Architecture Overview

```
┌─────────────────────┐     ┌──────────────────────┐     ┌─────────────────┐
│   Frontend (Deployed) │ ──► │  Backend Proxy (Render) │ ──► │  Anthropic API   │
│  wov565qnn1zj...    │     │  your-backend.onrender │     │  claude-haiku    │
│                       │     │                        │     │                  │
│  VITE_API_URL ────────┼────►│  /api/chat            │     │                  │
└─────────────────────┘     └──────────────────────┘     └─────────────────┘

✅ API key is NEVER exposed to frontend
✅ Secure server-side proxy
✅ CORS configured for your domain
```

---

## Need Help?

If you encounter issues:
1. Check Render dashboard logs
2. Test backend URL directly with curl
3. Verify environment variables are set correctly
4. Check browser console for specific error messages
