FROM python:3-slim
WORKDIR /usr/src/app
COPY ./backend/http.reqs.txt ./
RUN python -m pip install --no-cache-dir -r http.reqs.txt
RUN mkdir -p /usr/src/app/certs
COPY ./certs/cert.crt ./certs/certkey.key /usr/src/app/certs/
COPY ./backend/Booking/Booking.py ./
CMD [ "python", "./Booking.py" ]