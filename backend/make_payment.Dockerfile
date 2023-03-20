FROM python:3-slim
WORKDIR /usr/src/app
COPY http.reqs.txt ./
COPY amqp.reqs.txt ./
RUN python -m pip install --no-cache-dir -r http.reqs.txt
RUN python -m pip install --no-cache-dir -r amqp.reqs.txt
COPY ./make_payment.py ./amqp_setup.py ./invokes.py ./
CMD [ "python", "./make_payment.py" ]