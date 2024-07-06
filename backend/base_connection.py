import psycopg2

def create_connection():
    conn = None
    try:
        conn = psycopg2.connect(
            database="postgres",
            user="postgres",
            password="123",
            host="localhost",
            port="5432"
        )
        print("Connection to PostgreSQL DB successful")
        cur = conn.cursor()
        cur.execute("SELECT * FROM postgres.public.users")
        rows = cur.fetchall()
        for row in rows:
            print(row)
    except Exception as e:
        print(f"The error '{e}' occurred")

    return conn

create_connection()