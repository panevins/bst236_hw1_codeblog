# This python script reads data from text files, processes the data, and combines it into a single JSON file.
# The text files from the previous problems are used as input in the raw-data folder.
# cities.txt contains latitude/longitude for each city from a ChatGPT query and may contain some errors

import json
import re

# File paths
cities_file_path = './raw-data/cities.txt'
meantemps_file_path = './raw-data/meantemps.txt'
python_temps_file_path = './raw-data/python.txt'
R_temps_file_path = './raw-data/result_R.txt'
output_file_path = 'combined_cities.json'

# Read the cities txt file
try:
    with open(cities_file_path, 'r', encoding='utf-8') as file:
        cities_lines = file.readlines()
        cities_data = {}
        for line in cities_lines:
            try:
                # Split the line into city and coordinates
                city, coords = line.split(':')
                city = city.strip()
                coords = coords.strip().strip('()')
                
                # Split the coordinates into latitude and longitude
                latitude, longitude = map(float, coords.split(','))
                
                # Add the city data to the dictionary
                city_name = city.rsplit(',', 1)[0]  # Extract everything before the last comma
                city_name = city_name.strip().replace(',', '')  # Remove commas from city names
                cities_data[city_name] = {
                    'latitude': latitude,
                    'longitude': longitude
                }
            except ValueError:
                print(f"Error: Could not parse line: {line}")
                continue
except FileNotFoundError:
    print(f"Error: The file {cities_file_path} was not found.")
    exit(1)

# Read the mean temperatures text file
try:
    with open(meantemps_file_path, 'r', encoding='utf-8') as file:
        meantemps_lines = file.readlines()
except FileNotFoundError:
    print(f"Error: The file {meantemps_file_path} was not found.")
    exit(1)

# Parse the mean temperatures and store them in a dictionary
mean_temps = {}
for line in meantemps_lines:
    try:
        # Remove unwanted characters and split the line
        line = line.strip().strip('(),')
        city, temp = line.split('", ')
        city = city.strip().replace(',', '')  # Remove commas from city names
        city = city.strip('"')
        temp = float(temp)
        mean_temps[city] = temp
    except ValueError:
        print(f"Error: Could not parse line: {line}")
        continue

# Read the additional temperatures text file
try:
    with open(python_temps_file_path, 'r', encoding='utf-8') as file:
        python_temps_content = file.read().strip()
except FileNotFoundError:
    print(f"Error: The file {python_temps_file_path} was not found.")
    exit(1)

# Parse the additional temperatures and store them in a dictionary
python_temps = {}
try:
    python_temps_content = python_temps_content.strip('{}')
    for item in python_temps_content.split('0, '):
        city, temps = item.split('=')
        city = city.strip().replace(',', '')  # Remove commas from city names
        city = city.strip().replace('  ', ' ')  # Remove extra spaces
        city = city.strip()
        median, sd = map(float, temps.split('/'))
        python_temps[city] = {
            'median_temperature': median,
            'sd_temperature': sd
        }
except ValueError as e:
    print(f"Error: Could not parse additional temperatures data: {e}")
    exit(1)

# Read the additional temperatures text file
try:
    with open(R_temps_file_path, 'r', encoding='utf-8') as file:
        r_temps_content = file.read().strip()
except FileNotFoundError:
    print(f"Error: The file {R_temps_file_path} was not found.")
    exit(1)

# Parse the additional temperatures and store them in a dictionary
R_temps = {}
try:
    r_temps_content = r_temps_content.strip('{}')
    for item in re.split(r'(?<=\d), ', r_temps_content):
        city, temps = item.split('=')
        city = city.strip().replace(',', '')  # Remove commas from city names
        city = city.strip().replace('  ', ' ')  # Remove extra spaces
        city = city.strip()
        minimum, mean, maximum = map(float, temps.split('/'))
        R_temps[city] = {
            'minimum_temperature': minimum,
            'mean_temperature': mean,
            'maximum_temperature': maximum
        }
except ValueError as e2:
    print(f"Error: Could not parse R temperatures data: {e2}")
    exit(1)

# Combine the data
for city in cities_data:
    if city in mean_temps:
        cities_data[city]['original_mean_temperature'] = mean_temps[city]
    else:
        print(f"Warning: No mean temperature found for {city}")
    
    if city in python_temps:
        cities_data[city].update(python_temps[city])
    else:
        print(f"Warning: No python temperature data found for {city}")
    if city in R_temps:
        cities_data[city].update(R_temps[city])
    else:
        print(f"Warning: No R temperature data found for {city}")

# Write the combined data to a new JSON file
with open(output_file_path, 'w', encoding='utf-8') as json_file:
    json.dump(cities_data, json_file, indent=4, ensure_ascii=False)

print(f"Combination complete. The data has been saved to '{output_file_path}'.")