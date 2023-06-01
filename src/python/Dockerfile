FROM python:3.12.0b1
WORKDIR /
# RUN echo "185.199.108.133 raw.githubusercontent.com" >> /etc/hosts
RUN pip3 install flask
RUN pip3 install nltk
RUN pip3 install flask_cors
COPY ./nltk_data/punkt /root/nltk_data/tokenizers/punkt
COPY ./nltk_data/stopwords /root/nltk_data/corpora/stopwords
COPY . .
EXPOSE 5000
CMD ["python3", "server.py"]
