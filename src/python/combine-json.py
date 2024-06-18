import json

# Function to load JSON data from a file and normalize spaces
def load_json_normalize_spaces(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
        for item in data:
            item['address'] = item['address'].replace('\u00A0', ' ').strip()
            if 'name' in item:
                item['name'] = item['name'].replace('\u00A0', ' ').strip()
    return data

# Function to save JSON data to a file
def save_json(data, file_path):
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=2)

# Load and normalize data from both JSON files
coordinates_path = 'coordinates.json'  # Replace with your actual file path
addresses_path = 'all_address.json'  # Replace with your actual file path
data1 = load_json_normalize_spaces(coordinates_path)
data2 = load_json_normalize_spaces(addresses_path)

# Create a dictionary for quick lookup by address without spaces
address_to_coordinates = {item['address'].replace(' ', ''): item for item in data1}

# Combine data based on matching addresses
combined_data = []
for item in data2:
    address_no_spaces = item['address'].replace(' ', '')
    if address_no_spaces in address_to_coordinates:
        combined_item = {
            'name': item['name'],  # Preserve the original name with spaces
            'address': item['address'],  # Preserve the original address with spaces
            'lat': address_to_coordinates[address_no_spaces]['lat'],
            'long': address_to_coordinates[address_no_spaces]['long']
        }
        combined_data.append(combined_item)

# Save the combined data to a new JSON file
output_file_path = 'combined_data.json'  # Replace with your desired output file path
save_json(combined_data, output_file_path)

print(f"Combined data has been saved to {output_file_path}")
