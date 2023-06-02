export interface IPlace {
	type:        string;
	query:       string[];
	features:    Feature[];
	attribution: string;
}

export interface Feature {
	id:            string;
	type:          string;
	place_type:    string[];
	relevance:     number;
	properties:    Properties;
	text_es:       string;
	place_name_es: string;
	text:          string;
	place_name:    string;
	center:        number[];
	geometry:      Geometry;
	context:       Context[];
}

export interface Context {
	id:           string;
	mapbox_id:    string;
	text_es:      string;
	text:         string;
	language_es?: Language;
	language?:    Language;
	wikidata?:    string;
	short_code?:  string;
}

export enum Language {
	En = "en",
	Es = "es",
	Pt = "pt",
}

export interface Geometry {
	coordinates: number[];
	type:        string;
}

export interface Properties {
	foursquare: string;
	landmark:   boolean;
	category:   string;
	address?:   string;
}
