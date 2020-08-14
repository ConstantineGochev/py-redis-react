FROM python:3.6
COPY . /app
WORKDIR /app
#RUN python3 -m venv /opt/venv
RUN cd venv && /bin/bash -c "source bin/activate"
RUN pip install -r requirements.txt
ENV FLASK_APP=server.py
EXPOSE 5000
CMD cd src && flask run 
