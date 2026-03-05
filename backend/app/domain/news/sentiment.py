from textblob import TextBlob

def analyze_sentiment(text):
    if not text: return 0.0
    return round(TextBlob(text).sentiment.polarity, 3)
