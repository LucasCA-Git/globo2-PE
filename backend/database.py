import os
import psycopg2
import redis

postgres_conn = psycopg2.connect(
    host=os.getenv("DB_HOST", "postgres"),
    port=os.getenv("DB_PORT", 5432),
    database=os.getenv("DB_NAME", "globo2_db"),
    user=os.getenv("DB_USER", "globo_user"),
    password=os.getenv("DB_PASSWORD", "123456")
)

redis_client = redis.Redis(
    host=os.getenv("REDIS_HOST", "redis"),
    port=os.getenv("REDIS_PORT", 6379),
    decode_responses=True
)
