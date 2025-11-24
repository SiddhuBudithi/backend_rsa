# 1. Use LTS Node
FROM node:18

# 2. Create app directory
WORKDIR /usr/src/app

# 3. Copy package.json
COPY package*.json ./

# 4. Install dependencies
RUN npm install --production

# 5. Copy rest of backend
COPY . .

# 6. Expose port
EXPOSE 5000

# 7. Start command
CMD ["node", "server.js"]
