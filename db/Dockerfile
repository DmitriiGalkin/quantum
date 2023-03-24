FROM mysql/mysql-server:latest

ENV MYSQL_ROOT_PASSWORD system604
ENV MYSQL_DATABASE quantum
ENV MYSQL_USER dima
ENV MYSQL_PASSWORD dima1234

ADD init.sql /docker-entrypoint-initdb.d

EXPOSE 3306
