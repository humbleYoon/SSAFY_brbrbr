class USER():
    KST = datetime.now(timezone('Asia/Seoul'))

    __table_name__ = 'USER'
    user_id = db.Column(db.String(100), primary_key=True)
    email = db.Column(db.String(100))
    password = db.Column(db.String(100))
    name = db.Column(db.String(50))
    nickname = db.Column(db.String(50))
    age = db.Column(db.Integer)
    gender = db.Column(db.String(2))
    created = db.Column(db.DateTime, default=KST)
    updated = db.Column(db.DateTime, default=KST)
    #