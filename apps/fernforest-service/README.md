# Fernforest Service

This is the backend application for the Fernforest Nx monorepo.

## Run locally

From the project root:

```bash
npm run dev:service
```

Or directly through Nx:

```bash
npx nx serve fernforest-service
```

The service runs on port 4000 by default.

## API Endpoints

- GET /api/health
- POST /api/leads
- POST /api/orders
- GET /api/admin/leads
- GET /api/admin/orders

## Data storage

The backend stores its data in:

- apps/fernforest-service/data/leads.json
- apps/fernforest-service/data/orders.json
