FROM node:17-alpine as BUILD

WORKDIR /app
COPY . ./
RUN npm ci
RUN npm run build

# production environment
FROM nginx:latest

COPY --from=BUILD /app/build /usr/share/nginx/html
COPY nginx/non-root.conf /etc/nginx/nginx.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]