FROM node:14.18.0 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.default.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
# CMD ["npx", "tailwindcss", "-o", "./src/assets/css/tailwind.css", "--watch","nginx", "-g", "daemon off;"]
CMD ["nginx", "-g", "daemon off;"]

