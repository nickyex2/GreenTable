FROM python:3-slim
WORKDIR /usr/src/app
COPY ./backend/http.reqs.txt ./
COPY ./backend/amqp.reqs.txt ./
RUN python -m pip install --no-cache-dir -r amqp.reqs.txt
RUN python -m pip install --no-cache-dir -r http.reqs.txt
RUN mkdir -p /usr/src/app/certs
COPY ./certs/cert.crt ./certs/certkey.key /usr/src/app/certs/
COPY ./backend/Make_Payment.py ./backend/amqp_setup.py ./backend/invokes.py ./
CMD [ "python", "./Make_Payment.py" ]
