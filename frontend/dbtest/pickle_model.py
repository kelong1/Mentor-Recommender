
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pickle
import pymongo

# Connect to MongoDB
client = pymongo.MongoClient("mongodb+srv://kelong:kelong@cluster0.x9dc8lu.mongodb.net/?retryWrites=true&w=majority")
db = client['test']
mentors_collection = db['mentors']  # Adjust collection name as needed

# Function to fetch mentor data from MongoDB
def get_mentors_from_mongodb():
    mentors_data = list(mentors_collection.find({}, {'_id': 0}))
    return mentors_data

# Data Cleaning
def clean_dataset(df):
    # 1. Handling Duplicates
    df.drop_duplicates(inplace=True)

    # 2. Handling Missing Values
    df['about'].fillna('', inplace=True)
    df['experience'].fillna('', inplace=True)
    df['education'].fillna('', inplace=True)

    # 3. Removing unnecessary columns
    columns_to_drop = ['timestamp', 'id', 'city', 'country_code', 'region', 'current_company:name', 'groups', 'url', 'people_also_viewed', 'following', 'posts', 'recommendations', 'recommendations_count', 'volunteer_experience', 'сourses']
    df.drop(columns=columns_to_drop, inplace=True)

    return df

# Clean the dataset
cleaned_df = clean_dataset(pd.DataFrame(get_mentors_from_mongodb()))

# TF-IDF Vectorization
def tfidf_vectorization(text_data):
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(text_data)
    return tfidf_matrix, vectorizer

# Combine relevant columns into a single text column
cleaned_df['combined_text'] = cleaned_df['about'] + ' ' + cleaned_df['experience'] + ' ' + cleaned_df['education']

# Perform TF-IDF vectorization
tfidf_matrix, vectorizer = tfidf_vectorization(cleaned_df['combined_text'])

# Pickle the model and vectorizer
with open('mentor_recommender_model.pkl', 'wb') as model_file:
    pickle.dump((tfidf_matrix, vectorizer), model_file)
