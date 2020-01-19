
# FROM node:12-alpine

# # Create app directory
# WORKDIR /usr/src/app

# # Install app dependencies
# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# # where available (npm@5+)
# COPY package*.json ./

# RUN npm install -g @angular/cli
# RUN npm install

# # If you are building your code for production
# # RUN npm ci --only=production

# # Bundle app source
# COPY . .

# RUN npm run build

# EXPOSE 4200
# CMD ng serve --host 0.0.0.0

FROM node:alpine AS builder

WORKDIR /app

COPY . .

RUN npm install -g @angular/cli
RUN npm install && \
    npm run build --prod

FROM nginx:alpine

COPY --from=builder /app/dist/myla/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf