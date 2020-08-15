FROM python:3.6
COPY . /app
WORKDIR /app
RUN python3 -m venv venv
RUN cd venv && /bin/bash -c "source bin/activate"
RUN pip install -r requirements.txt
ENV FLASK_APP=server.py
ENV FLASK_ENV=development
EXPOSE 5000
CMD cd src && flask run -h 0.0.0.0 -p 5000
