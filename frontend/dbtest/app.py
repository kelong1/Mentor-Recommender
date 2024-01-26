

from flask import Flask, request, jsonify
from sklearn.metrics.pairwise import cosine_similarity
import pickle
import pymongo
from flask_cors import CORS
from bson import ObjectId

app = Flask(__name__)
CORS(app)
# Load the pickled model and vectorizer
with open('mentor_recommender_model.pkl', 'rb') as model_file:
    tfidf_matrix, vectorizer = pickle.load(model_file)

# Connect to MongoDB
client = pymongo.MongoClient("mongodb+srv://kelong:kelong@cluster0.x9dc8lu.mongodb.net/?retryWrites=true&w=majority")
db = client['test']
mentors_collection = db['mentors']  # Adjust collection name as needed

# Function to fetch mentor data from MongoDB
# def get_mentors_from_mongodb():
#     mentors_data = list(mentors_collection.find({}, {'_id':0}))
#     return mentors_data
def get_mentors_from_mongodb():
    mentors_data = list(mentors_collection.find({}, {'_id': 1,'name':1,'position':1,'about': 1, 'experience': 1, 'education': 1}))
    for mentor in mentors_data:
        mentor['_id'] = str(mentor['_id'])
    return mentors_data

# Function to recommend mentors
def recommend_mentors(mentee_input, mentors_data, top_n=10):
    mentee_tfidf = vectorizer.transform([mentee_input])
    cosine_sim_mentee = cosine_similarity(mentee_tfidf, tfidf_matrix).flatten()

    # Retrieve mentor indices based on cosine similarity
    mentor_indices = cosine_sim_mentee.argsort()[-top_n:][::-1]

    # Extract mentor details from MongoDB using the indices
    recommended_mentors = [mentors_data[i] for i in mentor_indices]

    return recommended_mentors

# Updated recommend route
@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        mentee_input = request.json['mentee_input']

        # Fetch mentor data from MongoDB
        mentors_data = get_mentors_from_mongodb()

        # Perform recommendation
        recommended_mentors = recommend_mentors(mentee_input, mentors_data)

        return jsonify(recommended_mentors)
    except Exception as e:
        print(str(e))
        return jsonify(error='Internal Server Error'), 500

if __name__ == '__main__':
    app.run(debug=True)
