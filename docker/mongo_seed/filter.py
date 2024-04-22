#Python script reading a json file of about 300mo (not present on the git) and extracting a quantity of objects from it
#chosen by the user in the desired format for the pathfinder app

import json

print("En cours...")

with open('france_hiking_foot_routes_line.json', 'r') as r:
    json_data = json.load(r)

filtered_hikes = []

for feature in json_data['features']:
    if feature['properties']['name'] is not None and feature['properties']['description'] is not None and \
       feature['properties']['distance'] is not None and feature['properties']['to'] is not None and \
       feature['properties']['from'] is not None and feature['properties']['symbol'] is not None and \
       feature['properties']['osmc-symbol'] is not None and feature['properties']['website'] is not None and \
       feature['properties']['operator'] is not None:

        filtered_hike = {
            "type": feature['type'],
            "hike_id": feature['id'],
            "geometry": {
            	"type": feature['geometry']['type'],
            	"coordinates": feature['geometry']['coordinates']
            },
            "properties": {
            	"name": feature['properties']['name'],
            	"description": feature['properties']['description'],
            	"distance": feature['properties']['distance'],
            	"to": feature['properties']['to'],
            	"from": feature['properties']['from'],
            	"symbol": feature['properties']['symbol'],
            	"osmc-symbol": feature['properties']['osmc-symbol'],
            	"website": feature['properties']['website'],
            	"operator": feature['properties']['operator']
            },
           "bbox": feature['bbox']
        }

        filtered_hikes.append(filtered_hike)
        if len(filtered_hikes) == 10:
            break

with open('filtered_hikes.json', 'w', encoding='utf-8') as w:
    json.dump(filtered_hikes, w, ensure_ascii=False, indent=4)

print(f"{len(filtered_hikes)} objets filtrés.")
