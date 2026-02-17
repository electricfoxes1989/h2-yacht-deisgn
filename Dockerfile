FROM node:20-alpine AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY patches ./patches
RUN corepack enable && corepack prepare pnpm@10.4.1 --activate
RUN pnpm install --frozen-lockfile

ARG VITE_SANITY_PROJECT_ID
ARG VITE_SANITY_DATASET
ARG VITE_SANITY_API_TOKEN
ENV VITE_SANITY_PROJECT_ID=${VITE_SANITY_PROJECT_ID}
ENV VITE_SANITY_DATASET=${VITE_SANITY_DATASET}
ENV VITE_SANITY_API_TOKEN=${VITE_SANITY_API_TOKEN}

COPY . .
RUN pnpm build

FROM node:20-alpine AS runtime

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080
ARG VITE_SANITY_PROJECT_ID
ARG VITE_SANITY_DATASET
ARG VITE_SANITY_API_TOKEN
ENV VITE_SANITY_PROJECT_ID=${VITE_SANITY_PROJECT_ID}
ENV VITE_SANITY_DATASET=${VITE_SANITY_DATASET}
ENV VITE_SANITY_API_TOKEN=${VITE_SANITY_API_TOKEN}

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

EXPOSE 8080
CMD ["node", "dist/index.js"]
