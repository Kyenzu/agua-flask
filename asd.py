import pandas as pd 
from joblib import load
from flask import Flask, request, jsonify 
from flask_cors import CORS

# Load the trained model
model = load("decision_tree_model.joblib")

# Create Flask app
api = Flask(__name__)
CORS(api)

@api.route('/hfp_prediction', methods=['POST'])
def predict_heart_failure():
    data = request.json['inputs']
    input_df = pd.DataFrame(data)

    # Debugging - Check Input Data Types and Structure
    print("Raw Input Data:", data)
    print("Input DataFrame:\n", input_df.head())

    # Making the prediction using the model
    prediction = model.predict_proba(input_df)
    class_labels = model.classes_

    # Debugging - Check Model Prediction Probabilities
    print("Model Prediction Probabilities:", prediction)

    # Preparing the response with the prediction probabilities
    response = []
    for prob in prediction:
        prob_dict = {}
        for k, v in zip(class_labels, prob):
            prob_dict[str(k)] = round(float(v) * 100, 2)
        response.append(prob_dict)

    # Returning the response as JSON
    return jsonify({'prediction': response})

# Run the Flask app
if __name__ == "__main__":
    api.run(port=8000)
