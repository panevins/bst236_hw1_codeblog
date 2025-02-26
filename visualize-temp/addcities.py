import json

# File paths
cities_file_path = './raw-data/cities.txt'
meantemps_file_path = './raw-data/meantemps.txt'
additional_temps_file_path = './raw-data/python.txt'
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
                city_name = city.split(',')[0]  # Extract the city name without the country
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
        city, temp = line.split(', ')
        city = city.strip('"')
        temp = float(temp)
        mean_temps[city] = temp
    except ValueError:
        print(f"Error: Could not parse line: {line}")
        continue

# Read the additional temperatures text file
try:
    with open(additional_temps_file_path, 'r', encoding='utf-8') as file:
        additional_temps_content = file.read().strip()
except FileNotFoundError:
    print(f"Error: The file {additional_temps_file_path} was not found.")
    exit(1)

# Parse the additional temperatures and store them in a dictionary
additional_temps = {}
try:
    additional_temps_content = additional_temps_content.strip('{}')
    for item in additional_temps_content.split(', '):
        city, temps = item.split('=')
        city = city.strip()
        median, sd = map(float, temps.split('/'))
        additional_temps[city] = {
            'median_temperature': median,
            'sd_temperature': sd
        }
except ValueError as e:
    print(f"Error: Could not parse additional temperatures data: {e}")
    exit(1)

# Combine the data
for city in cities_data:
    if city in mean_temps:
        cities_data[city]['mean_temperature'] = mean_temps[city]
    else:
        print(f"Warning: No mean temperature found for {city}")
    
    if city in additional_temps:
        cities_data[city].update(additional_temps[city])
    else:
        print(f"Warning: No additional temperature data found for {city}")

# Write the combined data to a new JSON file
with open(output_file_path, 'w', encoding='utf-8') as json_file:
    json.dump(cities_data, json_file, indent=4, ensure_ascii=False)

print(f"Combination complete. The data has been saved to '{output_file_path}'.")