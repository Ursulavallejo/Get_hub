# stage1 as builder
FROM node:16 as builder
WORKDIR /app

# copy the package.json to install dependencies
COPY package.json .
COPY package-lock.json .
COPY .env.example .env
 
# Set env variables
ARG NEXT_PUBLIC_SPACE_ID
RUN sed -i "s|{{NEXT_PUBLIC_SPACE_ID}}|${NEXT_PUBLIC_SPACE_ID}|g" ./.env
ARG NEXT_PUBLIC_ENVIRONMENT
RUN sed -i "s|{{NEXT_PUBLIC_ENVIRONMENT}}|${NEXT_PUBLIC_ENVIRONMENT}|g" ./.env
ARG NEXT_PUBLIC_CONTENT_DELIVERY_TOKEN
RUN sed -i "s|{{NEXT_PUBLIC_CONTENT_DELIVERY_TOKEN}}|${NEXT_PUBLIC_CONTENT_DELIVERY_TOKEN}|g" ./.env
ARG NEXT_PUBLIC_SENDGRID_API_KEY
RUN sed -i "s|{{NEXT_PUBLIC_SENDGRID_API_KEY}}|${NEXT_PUBLIC_SENDGRID_API_KEY}|g" ./.env


# Install the dependencies and make the folder
RUN npm install
COPY . .

# Build the project and copy the files
RUN npm run build

RUN rm -rf node_modules
RUN npm install --production

FROM node:alpine

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/next.config.js /app/next.config.js
COPY --from=builder /app/next-i18next.config.js /app/next-i18next.config.js

WORKDIR /app

EXPOSE 3000 80

ENTRYPOINT ["npm", "start"]