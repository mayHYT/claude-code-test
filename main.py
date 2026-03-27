from flask import Flask, jsonify

app = Flask(__name__)

# 未使用的变量
unused_var = "this is not used"
another_unused = 123


@app.route("/api/users", methods=["GET"])
def get_users():
    users = [
        {"id": 1, "name": "Alice", "email": "alice@example.com"},
        {"id": 2, "name": "Bob", "email": "bob@example.com"},
    ]
    return jsonify(users)


@app.route("/api/bad", methods=["GET"])
def bad_code():
    pass
    return jsonify({"status": "ok"})


@app.route("/api/test", methods=["GET"])
def test_function():
    data = None
    if False:
        data = get_something()
    return jsonify(data)


def get_something():
    return {"key": "value"}


def unused_function():
    print("never called")
    return True


class UserService:
    """Service for managing users"""

    def __init__(self, db_url):
        self.db_url = db_url
        self.connected = False

    def connect(self):
        self.connected = True
        return True

    def disconnect(self):
        self.connected = False

    def get_user_by_id(self, user_id):
        if not self.connected:
            raise Exception("Not connected to database")
        return {"id": user_id, "name": "Test User"}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
