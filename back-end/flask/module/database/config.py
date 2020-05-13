db = {
    'user': 'supergrammer',
    'password': 'rlaguscjf123',
    'host': 'localhost',
    'port': 3306,
    'database': 'SSAFY'
}

DB_URL = f"mysql+pymysql://{db['user']}:{db['password']}@{db['host']}:{db['port']}/{db['database']}?charset=utf8"
