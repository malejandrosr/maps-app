import axios from "axios";

const directionApi = axios.create({
	baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
	params: {
		alternatives: false,
		geometries: "geojson",
		overview: "simplified",
		steps: false,
		access_token: process.env.MAPBOX_ACCESS_TOKEN as string,
	},
});

export default directionApi;
