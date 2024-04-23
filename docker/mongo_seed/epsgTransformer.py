import json
from pyproj import Transformer

print("En cours...")

# Read the input JSON file
with open('filtered_hikes.json', 'r') as r:
    json_data = json.load(r)

# Initialize the transformer
transformer = Transformer.from_crs("EPSG:3857", "EPSG:4326")

# Function to transform coordinates in a geometry object and bbox
def transform_geometry_coordinates(geometry, bbox):
    if geometry["type"] == "Point":
        x, y = geometry["coordinates"]
        lon, lat = transformer.transform(x, y)
        geometry["coordinates"] = [lat, lon]  # Reverse lat and lon
    elif geometry["type"] == "LineString" or geometry["type"] == "Polygon":
        for i in range(len(geometry["coordinates"])):
            if isinstance(geometry["coordinates"][i][0], list):
                for j in range(len(geometry["coordinates"][i])):
                    x, y = geometry["coordinates"][i][j]
                    lon, lat = transformer.transform(x, y)
                    geometry["coordinates"][i][j] = [lat, lon]  # Reverse lat and lon
            else:
                x, y = geometry["coordinates"][i]
                lon, lat = transformer.transform(x, y)
                geometry["coordinates"][i] = [lat, lon]  # Reverse lat and lon

    # Transform the bbox coordinates
    new_bbox = []
    for i in range(0, len(bbox), 2):
        x, y = bbox[i], bbox[i + 1]
        lon, lat = transformer.transform(x, y)
        new_bbox.extend([lat, lon])  # Reverse lat and lon
    return new_bbox

# Iterate through the features in the JSON object and transform the coordinates
for hike in json_data:
    hike['bbox'] = transform_geometry_coordinates(hike['geometry'], hike['bbox'])

# Write the transformed JSON object to a new file
with open('filtered_hikes_epsg.json', 'w', encoding='utf-8') as w:
    json.dump(json_data, w, ensure_ascii=False, indent=4)

print("Done")

