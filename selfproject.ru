server {
	listen 443 ssl;

	server_name selfproject.ru;
	ssl_certificate /etc/ssl/selfproject.ru.crt;
	ssl_certificate_key /etc/ssl/selfproject.ru.key;
	ssl_session_cache   shared:SSL:10m;
	ssl_session_timeout 10m;
	keepalive_timeout 70;
	ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
	ssl_prefer_server_ciphers on;
	ssl_stapling on;
	ssl_trusted_certificate /etc/ssl/ca.crt;
	resolver 8.8.8.8;

    root /var/www/quantum/app/build;
    index index.html;

    location / {
            try_files $uri /index.html =404;
    }

      location /api/ {
        proxy_pass          http://localhost:4000/;
        proxy_http_version 1.1;
        proxy_set_header    Host             $host;
        proxy_set_header    X-Real-IP        $remote_addr;
        proxy_set_header    X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_read_timeout 1800;
        proxy_connect_timeout 1800;
      }
}
