##Everything Implemented
#######################

from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson import ObjectId
import datetime
from bson.json_util import dumps
import bcrypt  # Import bcrypt for password hashing

app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": ["https://to-do-pal-new.vercel.app"]}})  # Allow requests from your Vue app's origin

# CORS(app, resources={r"/*": {"origins": ["http://localhost:5173"]}})
CORS(app, resources={r"/*": {"origins": ["https://to-do-pal-new.vercel.app", "http://localhost:5173"]}})



app.config["MONGO_URI"] = "mongodb://localhost:27017/newtodopal"
# app.config["MONGO_URI"] = "mongodb+srv://sanskarjaiswal2904:cLT81iq89uVmnBrP@todo.7w890j6.mongodb.net/newtodopal"


db = PyMongo(app).db

def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

def verify_password(password, hashed_password):
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password)

def validate_user_data(data):
    errors = {}
    if not data.get('name') or len(data.get('name')) > 50:
        errors['name'] = "Name is required and must be less than 50 characters."
    if not data.get('email'):
        errors['email'] = "Email is required."
    if not data.get('password') or len(data.get('password')) > 20:
        errors['password'] = "Password is required and must be less than 20 characters."
    if data.get('gender') not in ["male", "female", "others"]:
        errors['gender'] = "Gender must be 'male', 'female', or 'others'."
    return errors
#
# createSignup
@app.route("/signup", methods=["POST"])
def insertDB():
    data = request.get_json()
    errors = validate_user_data(data)
    if errors:
        return jsonify({"errors": errors}), 400

    hashed_password = hash_password(data.get('password'))
    user = {
        "name": data.get('name'),
        "email": data.get('email'),
        "password": hashed_password,
        "gender": data.get('gender'),
        "isAdmin": data.get('isAdmin', False)
    }

    db.userInfoCollection.insert_one(user)
    return jsonify({"message": "Signup successful"}), 201

# Login
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = db.userInfoCollection.find_one({"email": email})
    if user and verify_password(password, user['password']):
        return dumps(user), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401

# Get All Users
@app.route("/alluser", methods=["GET"])
def get_all_users():
    try:
        users = list(db.userInfoCollection.find({}, {"_id": 1, "name": 1, "email": 1}))
        for user in users:
            user["_id"] = str(user["_id"])
        return jsonify(users)
    except Exception as e:
        print(f"Error fetching users: {str(e)}")
        return jsonify({"error": "An error occurred while fetching users."}), 500

# Get One User
@app.route("/user/getsingle/<string:email>", methods=["GET"])
def get_single_user(email):
    user_with_email = db.userInfoCollection.find_one({"email": email})

    if user_with_email:
        return jsonify(user_with_email), 200
    else:
        return jsonify({"error": "User not found"}), 404

# Delete User
@app.route("/deleteUser/<string:sno>", methods=["DELETE"])
def delete_user(sno):
    try:
        user_id = ObjectId(sno)
    except Exception:
        return jsonify({"error": "Invalid user ID"}), 400

    user_to_delete = db.userInfoCollection.find_one({"_id": user_id})

    if user_to_delete:
        # Delete the user
        db.userInfoCollection.delete_one({"_id": user_id})

        # Also delete all notes associated with this user
        result = db.noteInfoCollection.delete_many({"userId": user_id})
        if result.deleted_count > 0:
            return jsonify({"message": "User and associated notes deleted successfully"}), 200
        else:
            return jsonify({"message": "User deleted successfully, but no associated notes found"}), 200
    else:
        return jsonify({"error": "User not found"}), 404

# Update User
@app.route("/profile/update/<string:user_id>", methods=["PATCH"])
def update_profile(user_id):
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    gender = data.get('gender')

    if not name or not email or not gender:
        return jsonify({"error": "Name, email, and gender are required."}), 400

    try:
        newUserId = ObjectId(user_id)
    except Exception as e:
        return jsonify({"error": f"Invalid user ID format: {user_id}"}), 400

    result = db.userInfoCollection.update_one(
        {"_id": newUserId},
        {"$set": {
            "name": name,
            "email": email,
            "gender": gender,
            "dateupdated": datetime.datetime.utcnow()
        }}
    )

    if result.matched_count > 0:
        return jsonify({"message": f"User profile with ID {user_id} updated successfully"}), 200
    else:
        return jsonify({"error": f"No user found with ID {user_id}"}), 404

# Post Notes
@app.route("/notes", methods=["POST"])
def save_note():
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    isCompleted = data.get('isCompleted')
    userId = data.get('userId')

    if not title or not description:
        return jsonify({"error": "Title and description are required."}), 400

    note = {
        "title": title,
        "description": description,
        "userId": ObjectId(userId),
        "isCompleted": isCompleted,
        "datecreated": datetime.datetime.utcnow()
    }

    db.noteInfoCollection.insert_one(note)
    return jsonify({"message": "Note saved successfully"}), 201

# Get Notes
@app.route("/notes/user/<string:user_id>", methods=["GET"])
def get_notes_by_user(user_id):
    try:
        user_id = ObjectId(user_id)
    except Exception as e:
        return jsonify({"error": "Invalid user ID"}), 400

    notes = db.noteInfoCollection.find({"userId": user_id}).sort("datecreated", -1)
    return dumps(notes), 200

# Delete Notes by User ID
@app.route("/notes/deleteall/<string:user_id>", methods=["DELETE"])
def delete_all_notes(user_id):
    try:
        user_object_id = ObjectId(user_id)
    except Exception as e:
        return jsonify({"error": "Invalid user ID format"}), 400

    result = db.noteInfoCollection.delete_many({"userId": user_object_id})
    if result.deleted_count > 0:
        return jsonify({"message": "All notes deleted successfully"}), 200
    else:
        return jsonify({"error": "No notes found to delete"}), 404

# Delete One Note
@app.route("/notes/deleteone/<string:sno>", methods=["DELETE"])
def delete_one_note(sno):
    try:
        note_id = ObjectId(sno)
    except Exception:
        return jsonify({"error": "Invalid note ID"}), 400

    note = db.noteInfoCollection.find_one({"_id": note_id})
    if note:
        db.noteInfoCollection.delete_one({"_id": note_id})
        return jsonify({"message": f"Note with ID {sno} deleted successfully"}), 200
    else:
        return jsonify({"error": f"No note found with ID {sno}"}), 404

# Update One Note
@app.route("/notes/update/<string:sno>", methods=["PATCH"])
def update_one_note(sno):
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    is_completed = data.get('isCompleted')

    update_fields = {}
    if title is not None:
        update_fields['title'] = title
    if description is not None:
        update_fields['description'] = description
    if is_completed is not None:
        update_fields['isCompleted'] = is_completed
    update_fields['dateupdated'] = datetime.datetime.utcnow()

    if not update_fields:
        return jsonify({"error": "At least one field (title, description, or isCompleted) is required."}), 400

    try:
        note_id = ObjectId(sno)
    except Exception:
        return jsonify({"error": "Invalid note ID"}), 400

    result = db.noteInfoCollection.update_one(
        {"_id": note_id},
        {"$set": update_fields}
    )

    if result.matched_count > 0:
        return jsonify({"message": f"Note with ID {sno} updated successfully"}), 200
    else:
        return jsonify({"error": f"No note found with ID {sno}"}), 404

if __name__ == "__main__":
    app.run(port=1024, debug=True)