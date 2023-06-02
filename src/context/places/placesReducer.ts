import { Feature } from "../../interfaces/places";

export interface IPlacesReduerState {
	isLoading: boolean;
	userLocation?: [number, number];
	isLoadingPlaaces: boolean;
	places: Feature[];
}

type IPlacesReducerActions =
	| {
			type: "setUserLocation";
			payload: [number, number];
	  }
	| { type: "setLoadingPlaces" }
	| {
			type: "setPlaces";
			payload: Feature[];
	  };

export const placesReducer = (
	state: IPlacesReduerState,
	action: IPlacesReducerActions
): IPlacesReduerState => {
	switch (action.type) {
		case "setUserLocation":
			return {
				...state,
				isLoading: false,
				userLocation: action.payload,
			};
		case "setLoadingPlaces":
			return {
				...state,
				isLoadingPlaaces: true,
				places: [],
			};
		case "setPlaces":
			return {
				...state,
				isLoadingPlaaces: false,
				places: action.payload,
			};
		default:
			return state;
	}
};
