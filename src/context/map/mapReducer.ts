/* eslint-disable import/no-webpack-loader-syntax */
//@ts-ignore
import { Map, Marker } from "!mapbox-gl";

export interface IMapReducerState {
	isMapReady: boolean;
	map?: Map;
	markers: Marker[];
}

type IMapReducerActions =
	| { type: "setMap"; payload: Map }
	| { type: "setMarkers"; payload: Marker[] };

export const mapReducer = (
	state: IMapReducerState,
	action: IMapReducerActions
): IMapReducerState => {
	switch (action.type) {
		case "setMap":
			return {
				...state,
				isMapReady: true,
				map: action.payload,
			};
		case "setMarkers":
			return {
				...state,
				markers: action.payload,
			};
		default:
			return state;
	}
};
