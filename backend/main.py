from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.preprocessing import OneHotEncoder
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from datetime import datetime

app = Flask(__name__)
# Allow CORS for all routes
CORS(app)

@app.route("/")
def home():
    return "Hello, this is a simple Flask server with CORS enabled!"

@app.route("/show")
def show():
    # Load the CSV file
    file_path_updated = "./updated_weather_data.csv"
    data_updated = pd.read_csv(file_path_updated)

    # Convert the "date" column to a datetime
    data_updated['date'] = pd.to_datetime(data_updated['date'])

    # Extract the year, month, and day as separate features
    data_updated['year'] = data_updated['date'].dt.year
    data_updated['month'] = data_updated['date'].dt.month
    data_updated['day'] = data_updated['date'].dt.day

    # One-hot encode the "datatype" column
    encoder = OneHotEncoder(drop='first', sparse=False)
    datatype_encoded = encoder.fit_transform(data_updated[['datatype']])
    datatype_encoded_df = pd.DataFrame(datatype_encoded, columns=encoder.get_feature_names_out(['datatype']))

    # Concatenate encoded and original data
    data_preprocessed = pd.concat([data_updated, datatype_encoded_df], axis=1)
    data_preprocessed.drop(columns=['date', 'datatype'], inplace=True)

    # Separate the target variable (value) and features
    X = data_preprocessed.drop(columns=['value'])
    y = data_preprocessed['value']

    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

    # Initialize and train the linear regression model
    model = LinearRegression()
    model.fit(X_train, y_train)

    # Function to predict values for a given date
    def predict_values_for_date(input_date):
        prediction_data = pd.DataFrame(columns=X_train.columns)
        prediction_data['year'] = [input_date.year]
        prediction_data['month'] = [input_date.month]
        prediction_data['day'] = [input_date.day]
        for col in prediction_data.columns[3:]:
            prediction_data[col] = [0]
        predictions = {}
        for col in prediction_data.columns[3:]:
            prediction_data[col] = [1]
            prediction_value = model.predict(prediction_data)[0]
            predictions[col.replace("datatype_", "")] = prediction_value
            prediction_data[col] = [0]
        return predictions

    # Years into the future to predict
    future_years = [2, 4, 10, 25, 50, 100]
    today_date = datetime.today()

    # Initialize an array to hold the results for each future year
    results = []

    for years in future_years:
        # Calculate the future date by adding the years to the current date
        future_date = today_date.replace(year=today_date.year + years)

        # Predict values for that date
        predicted_values = predict_values_for_date(future_date)

        # Add the predictions to the results array
        results.append(
            {
                "year": future_date.year,
                "PRCP": predicted_values.get('PRCP'),
                "TAVG": predicted_values.get('TAVG'),
                "ASLP": predicted_values.get('ASLP')
            }
        )

    return jsonify(results)


if __name__ == "__main__":
    # Run the app in debug mode on http://127.0.0.1:8000/
    app.run(host="0.0.0.0", port=8000, debug=True)
