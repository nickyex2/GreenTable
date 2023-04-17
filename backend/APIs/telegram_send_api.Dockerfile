FROM python:3-slim
WORKDIR /usr/src/app
COPY ./backend/http.reqs.txt ./
RUN python -m pip install --no-cache-dir -r http.reqs.txt
COPY ./backend/APIs/telegram_send_api.py ./
RUN mkdir -p /usr/src/app/certs
COPY ./certs/cert.crt ./certs/certkey.key /usr/src/app/certs/
COPY ./backend/APIs/s3ndm3@n0tif1cationf0rt3l3gr@m.session ./
CMD [ "python", "./telegram_send_api.py" ]