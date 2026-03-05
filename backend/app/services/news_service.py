from app.domain.news.sentiment import analyze_sentiment
from app.repositories.news_repository import NewsRepository
from app.providers.news_provider import NewsProvider

from app.domain.news.sentiment import analyze_sentiment
from app.repositories.news_repository import NewsRepository
from app.providers.news_provider import NewsProvider
from app.config import MARKET_SYMBOLS

class NewsService:
    def __init__(self):
        self.repo = NewsRepository()
        self.provider = NewsProvider()

    def fetch_and_analyze_news(self, db):
        articles = self.provider.fetch_rss_news()
        analyzed = []
        for a in articles:
            if not self.repo.news_exists(db, a['url']):
                score = analyze_sentiment(a['title'] + " " + a['summary'])
                symbol = self.provider.detect_symbol(a['title'] + " " + a['summary'], MARKET_SYMBOLS)
                
                news_item = self.repo.save_news(
                    db, a['title'], a['source'], a['url'], 
                    None, # published_at pourrait être parsé ici
                    score, symbol
                )
                analyzed.append(news_item)
        return analyzed

    def get_recent_news(self, db, limit=20):
        return self.repo.get_recent_news(db, limit)

    def get_sentiment_for_symbol(self, db, symbol):
        news = self.repo.get_news_by_symbol(db, symbol)
        if not news: return 0.0
        return sum(n.sentiment_score for n in news) / len(news)
