from apscheduler.schedulers.background import BackgroundScheduler
from app.config import SCHEDULER_INTERVAL_MINUTES

_scheduler = BackgroundScheduler()

def start_scheduler(fn, db_fn):
    def job():
        db = db_fn()
        try: fn(db)
        finally: db.close()
    _scheduler.add_job(job, 'interval', minutes=SCHEDULER_INTERVAL_MINUTES)
    _scheduler.start()

def stop_scheduler():
    _scheduler.shutdown()

def get_scheduler_status():
    return {"running": _scheduler.running}
