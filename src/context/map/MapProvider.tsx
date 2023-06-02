import { useReducer, useContext, useEffect } from "react";

/* eslint-disable import/no-webpack-loader-syntax */
//@ts-ignore
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "!mapbox-gl";

import { MapContext } from "./MapContext";
import { IMapReducerState, mapReducer } from "./mapReducer";
import { PlacesContext } from "../places/PlacesContext";
import { directionApi } from "../../api";
import { IDirection } from "../../interfaces/directions";

interface IMapProviderProps {
	children: JSX.Element | JSX.Element[];
}

const initialState: IMapReducerState = {
	isMapReady: false,
	map: undefined,
	markers: [],
};

export const MapProvider = ({ children }: IMapProviderProps) => {
	const [state, dispatch] = useReducer(mapReducer, initialState);

	const { places } = useContext(PlacesContext);

	useEffect(() => {
		state.markers.forEach((marker) => {
			marker.remove();
		});

		const newMarkers: Marker[] = [];

		for (const place of places) {
			const [lng, lat] = place.center;

			const popup = new Popup().setHTML(
				`<h6>${place.text_es}</h6><p>${place.place_name_es}</p>`
			);

			const newMarker = new Marker()
				.setPopup(popup)
				.setLngLat([lng, lat])
				.addTo(state.map!);

			newMarkers.push(newMarker);
		}

		dispatch({ type: "setMarkers", payload: newMarkers });
	}, [places]);

	useEffect(() => {
		if (state.map?.getLayer("RouteString") && !places.length) {
			state.map.removeLayer("RouteString");
			state.map.removeSource("RouteString");
		}
	}, [places]);

	const setMap = (map: Map) => {
		const locationPopUp = new Popup().setHTML(
			`<h4>Hey</h4><p>Aquí nomás</p>`
		);

		new Marker({
			color: "#61dafb",
		})
			.setLngLat(map.getCenter())
			.setPopup(locationPopUp)
			.addTo(map);

		dispatch({ type: "setMap", payload: map });
	};

	const getRouteBetweenPoints = async (
		start: [number, number],
		end: [number, number]
	) => {
		const response = await directionApi.get<IDirection>(
			`/${start.join(",")};${end.join(",")}`
		);

		/* const { distance, duration } = response.data.routes[0];
		let kms = distance / 1000;
		kms = Math.round(kms * 100);
		kms /= 100;

		const min = Math.floor(duration / 60);

		console.log({ kms, min }); */

		const { geometry } = response.data.routes[0];
		const { coordinates } = geometry;

		const bounds = new LngLatBounds(start, start);

		for (const coordinate of coordinates) {
			const newCoordinate: [number, number] = [
				coordinate[0],
				coordinate[1],
			];

			bounds.extend(newCoordinate);
		}

		state.map?.fitBounds(bounds, {
			padding: 200,
		});

		const sourceData: AnySourceData = {
			type: "geojson",
			data: {
				type: "FeatureCollection",
				features: [
					{
						type: "Feature",
						properties: {},
						geometry: {
							type: "LineString",
							coordinates,
						},
					},
				],
			},
		};

		if (state.map?.getLayer("RouteString")) {
			state.map?.removeLayer("RouteString");
			state.map?.removeSource("RouteString");
		}

		state.map?.addSource("RouteString", sourceData);

		state.map?.addLayer({
			id: "RouteString",
			type: "line",
			source: "RouteString",
			layout: {
				"line-cap": "round",
				"line-join": "round",
			},
			paint: {
				"line-color": "black",
				"line-width": 3,
			},
		});
	};

	return (
		<MapContext.Provider
			value={{ ...state, setMap, getRouteBetweenPoints }}
		>
			{children}
		</MapContext.Provider>
	);
};
