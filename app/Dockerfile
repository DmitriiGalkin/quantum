FROM node:18-alpine as build
WORKDIR /app
COPY package.json /app/package.json
RUN npm install --only=prod --force
COPY . /app
RUN npm run build
FROM nginx:1.23.3-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


##FROM node:18-alpine as build
##WORKDIR /app
##COPY package.json /app/package.json
##RUN npm install --force
##COPY . /app
##RUN npm run build
#FROM nginx:1.23.3-alpine
##COPY --from=build /app/build /usr/share/nginx/html
#
#COPY --from=/etc/nginx/conf.d/nginx-ldap-auth.conf /etc/nginx/nginx.conf
#
#
#COPY nginx.conf /etc/nginx/nginx.conf
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
