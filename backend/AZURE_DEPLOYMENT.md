# Azure App Service Deployment Guide

## Step 1: Install Dependencies
```bash
cd backend
npm install
```

## Step 2: Test Locally
```bash
npm run dev
```

## Step 3: Deploy to Azure App Service

### Option A: Azure CLI Deployment
1. Install Azure CLI
2. Login: `az login`
3. Create Resource Group:
```bash
az group create --name chipset-backend --location "East US"
```

4. Create App Service Plan:
```bash
az appservice plan create --name chipset-plan --resource-group chipset-backend --sku B1 --is-linux
```

5. Create Web App:
```bash
az webapp create --resource-group chipset-backend --plan chipset-plan --name chipset-backend-api --runtime "NODE|18-lts"
```

6. Configure Environment Variables:
```bash
az webapp config appsettings set --resource-group chipset-backend --name chipset-backend-api --settings NODE_ENV=production PORT=8080 DB_SERVER=ledgerlegends.database.windows.net DB_NAME=reecruitments DB_USER=ledgerlegends DB_PASSWORD="Chakra*2006"
```

7. Deploy Code:
```bash
az webapp deployment source config-zip --resource-group chipset-backend --name chipset-backend-api --src backend.zip
```

### Option B: GitHub Actions (Recommended)
1. Push backend folder to GitHub repository
2. Go to Azure Portal > App Service > Deployment Center
3. Connect to GitHub
4. Select repository and branch
5. Azure will auto-configure GitHub Actions

### Option C: Azure Portal Manual Upload
1. Create App Service in Azure Portal
2. Go to Development Tools > Advanced Tools (Kudu)
3. Upload and extract your backend files
4. Configure environment variables in Application Settings

## Your Backend URL will be:
`https://chipset-backend-api.azurewebsites.net`

## Update Frontend:
Change your frontend API calls from `/api/recruitment` to:
`https://chipset-backend-api.azurewebsites.net/api/recruitment`

## Test Endpoints:
- Health: `https://chipset-backend-api.azurewebsites.net/api/test/health`
- DB Test: `https://chipset-backend-api.azurewebsites.net/api/test/db`
- Recruitment: `https://chipset-backend-api.azurewebsites.net/api/recruitment`