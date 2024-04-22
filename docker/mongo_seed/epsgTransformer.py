#Python script reading a filtered json file with a featureCollections and transforming every coordinates
#present inside from EPSG:3857 to EPSG:4326 in order to be use in the Pathfinder app

import json
from pyproj import Transformer

print("En cours...")

with open('filtered_hikes.json', 'r') as r:
    json_data = json.load(r)

# Initialize the transformer
transformer = Transformer.from_crs("EPSG:3857", "EPSG:4326")

def transform_geometry_coordinates(geometry, bbox):
    if geometry["type"] == "Point":
        x, y = geometry["coordinates"]
        lon, lat = transformer.transform(x, y)
        geometry["coordinates"] = [lat, lon]
    elif geometry["type"] == "MultiLineString" or geometry["type"] == "LineString" or geometry["type"] == "Polygon":
        for i in range(len(geometry["coordinates"])):
            if isinstance(geometry["coordinates"][i][0], list):
                for j in range(len(geometry["coordinates"][i])):
                    x, y = geometry["coordinates"][i][j]
                    lon, lat = transformer.transform(x, y)
                    geometry["coordinates"][i][j] = [lat, lon]
            else:
                x, y = geometry["coordinates"][i]
                lon, lat = transformer.transform(x, y)
                geometry["coordinates"][i] = [lat, lon]

    new_bbox = []
    for i in range(0, len(bbox), 2):
        x, y = bbox[i], bbox[i + 1]
        lon, lat = transformer.transform(x, y)
        new_bbox.extend([lat, lon])
    return new_bbox

for hike in json_data:
    hike['bbox'] = transform_geometry_coordinates(hike['geometry'], hike['bbox'])

with open('filtered_hikes_epsg.json', 'w', encoding='utf-8') as w:
    json.dump(json_data, w, ensure_ascii=False, indent=4)

print("Done")

