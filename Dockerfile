FROM nginx:alpine
RUN apk add --update bash && rm -rf /var/cache/apk/*
ADD dist/ /usr/share/nginx/html/
ADD run.sh /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
CMD ./run.sh
