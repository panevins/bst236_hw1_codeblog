import json

# Read the text file
input_file_path = 'Homeworks/hw2_proj/bst236_hw1_codeblog/visualize-temp-copy/cities.txt'
output_file_path = 'Homeworks/hw2_proj/bst236_hw1_codeblog/visualize-temp-copy/cities.json'

try:
    with open(input_file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()
except FileNotFoundError:
    print(f"Error: The file {input_file_path} was not found.")
    exit(1)

# Initialize an empty dictionary to store the city data
cities_data = {}

# Parse each line and extract city information
for line in lines:
    try:
        # Split the line into city and coordinates
        city, coords = line.split(':')
        city = city.strip()
        coords = coords.strip().strip('()')
        
        # Split the coordinates into latitude and longitude
        latitude, longitude = map(float, coords.split(','))
        
        # Add the city data to the dictionary
        cities_data[city] = {
            'latitude': latitude,
            'longitude': longitude
        }
    except ValueError:
        print(f"Error: Could not parse line: {line}")
        continue

# Write the dictionary to a JSON file
with open(output_file_path, 'w', encoding='utf-8') as json_file:
    json.dump(cities_data, json_file, indent=4, ensure_ascii=False)

print(f"Conversion complete. The data has been saved to '{output_file_path}'.")
