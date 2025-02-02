import sys
import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest

# Read data from stdin
data = pd.read_json(sys.stdin)

# Train Isolation Forest Model
model = IsolationForest(contamination=0.1)
model.fit(data[['cpu', 'ram', 'disk', 'network']])

# Predict anomalies
data['anomaly'] = model.predict(data[['cpu', 'ram', 'disk', 'network']])
anomalies = data[data['anomaly'] == -1]

# Output anomalies
print(anomalies.to_json(orient='records'))
