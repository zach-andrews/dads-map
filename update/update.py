import json
from glob import glob


def get_countries():
    countries = glob("../data/visited/*")
    new_countries = ["".join(x.split('/')[-1]) for x in countries]
    return(new_countries)

def get_existing_data():
    f = open('../data/data.json')
    data = json.load(f)
    f.close()
    return data

def get_existing_countries(data):
    existing_countries = [ x['properties']['ISO_A3'] for x in data['features']]
    return(existing_countries)

def check_new_countries(existing,new):
    return(list(set(new)-set(existing)))

def get_data(countries):
    # grab all the data from countries.geojson
    # add it to the data.json
    print(countries)

    with open('../data/countries.geojson', "r") as f:
        countries_data = json.load(f)
    
    with open('../data/data.json', "r") as f2:
        data = json.load(f2)
    
    #search countries data for ISO_A3 with countries. grab all data and append it to data
    new_country_data = [x for x in countries_data['features'] if x['properties']['ISO_A3'] in countries]

    for x in new_country_data:
        data['features'].append(x)
    
    with open("../data/data.json", "w") as f3:
        json.dump(data, f3)


if __name__ == "__main__":
    new_countries = check_new_countries(get_existing_countries(get_existing_data()),get_countries())
    get_data(new_countries)