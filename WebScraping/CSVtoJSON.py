import pandas as pd
import os

csv_file = "seleniumdata.csv"
market_df = pd.read_csv(os.path.join(os.path.dirname(__file__), csv_file), sep=",")
print(market_df)

json_output = "../Project/capdata.json"
output = market_df.to_json(os.path.join(os.path.dirname(__file__), json_output), indent=1, orient="values")