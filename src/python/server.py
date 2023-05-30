from flask import Flask, request, jsonify
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.stem import PorterStemmer
from flask_cors import CORS
from flask_cors import cross_origin

app = Flask(__name__)
CORS(app, origins='http://localhost:3000')

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    text = data['text']
    
    # Tokenize the text into sentences
    sentences = sent_tokenize(text)
    
    # Tokenize the sentences into words and remove stop words
    stop_words = set(stopwords.words('english'))
    words = word_tokenize(text)
    words = [word for word in words if word.casefold() not in stop_words]
    
    # Perform stemming on the words
    stemmer = PorterStemmer()
    stemmed_words = [stemmer.stem(word) for word in words]
    
    # Calculate the frequency of each word
    word_frequency = {}
    for word in stemmed_words:
        if word in word_frequency:
            word_frequency[word] += 1
        else:
            word_frequency[word] = 1
    
    # Calculate the score of each sentence based on word frequency
    sentence_scores = {}
    for sentence in sentences:
        for word in word_tokenize(sentence.lower()):
            if word in word_frequency:
                if len(sentence.split(' ')) < 30:
                    if sentence in sentence_scores:
                        sentence_scores[sentence] += word_frequency[word]
                    else:
                        sentence_scores[sentence] = word_frequency[word]
    
    # Select the top 3 sentences with the highest scores
    summary_sentences = sorted(sentence_scores, key=sentence_scores.get, reverse=True)[:3]
    summary = ' '.join(summary_sentences)
    
    return jsonify({'summary': summary})

if __name__ == '__main__':
    app.run()
