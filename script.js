document.getElementById('predictionForm').addEventListener('submit', async function (e) {
    e.preventDefault();

  const inputData = {
    "Pregnancies": parseInt(document.getElementById('pregnancies').value),
    "Glucose": parseFloat(document.getElementById('glucose').value),
    "BloodPressure": parseFloat(document.getElementById('bloodPressure').value),
    "SkinThickness": parseFloat(document.getElementById('skinThickness').value),
    "Insulin": parseFloat(document.getElementById('insulin').value),
    "BMI": parseFloat(document.getElementById('bmi').value),
    "DiabetesPedigreeFunction": parseFloat(document.getElementById('diabetesPedigreeFunction').value),
    "Age": parseInt(document.getElementById('age').value)
};


    try {
        const response = await fetch('http://localhost:8000/api/hfp_prediction', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ inputs: [inputData] })
        });

        const result = await response.json();
        const prediction = result.prediction[0];

        // Assuming prediction is in the form of { "0": 0, "1": 100 } or similar
        const predictedClass = prediction["1"] > prediction["0"] ? "Yes" : "No";

        document.getElementById('result').innerHTML = `
            <div class="alert alert-info text-start" role="alert">
                <h4 class="alert-heading">Prediction Result</h4>
                <p><strong>Prediction:</strong> ${predictedClass}</p>
            </div>
        `;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').innerHTML = `
            <div class="alert alert-danger" role="alert">
                An error occurred while making the prediction.
            </div>
        `;
    }
});
