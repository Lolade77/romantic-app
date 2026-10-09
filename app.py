from flask import Flask, render_template

app = Flask(__name__)

CONFIG = {
    "her_name": "baby girl 😉",
    "intro_title": "Someone sent you a private letter... 💌",
    "main_question": "You’ve made me the happiest person since I met you. Now I’m wondering… Are you my God-given person? Will you spend the rest of your life with me? ❤️",
    "personal_note_title": "One More Thing... 💌",
    "personal_note_body": "I love the way you laugh, your sweet heart, and how every day feels brighter just knowing you're in it. You are truly special to me.",
    "yes_title": "You Made Me The Happiest Person Ever! 💖",
    "yes_message": "I promise to cherish, love, and hold your hand through every chapter of our lives. Forever and always! ✨🥂",
    "use_photo": True,
}

@app.route("/")
def home():
    return render_template("index.html", config=CONFIG)

if __name__ == "__main__":
    app.run(debug=True, port=5000)