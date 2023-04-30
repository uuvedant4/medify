import joblib
import sys
import numpy as np

# Load the saved model
model = joblib.load('model.joblib')

# Function to make a prediction based on input data
def make_prediction(input_data):
    # Convert input data to numpy array and reshape it to match the expected shape of the model input
    input_data = np.array(input_data).reshape(1, -1)
    
    # Make the prediction using the loaded model
    prediction_prob = model.predict_proba(input_data)
    prediction = prediction_prob[:, 1]
    # Return the prediction as a string
    return str(prediction[0])

# Parse command-line arguments and make a prediction
if __name__ == '__main__':
    input_data = list(map(float, sys.argv[1:]))
    prediction = make_prediction(input_data)
    print(prediction)
