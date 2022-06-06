FROM node:14.18.0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npx", "tailwindcss", "-o", "./src/assets/css/tailwind.css", "--watch", "npm", "start"]
