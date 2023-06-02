import { useEffect, useReducer } from "react";

import { PlacesContext } from "./PlacesContext";
import { IPlacesReduerState, placesReducer } from "./placesReducer";
import { getUserLocation } from "../../helpers";
import { searchApi } from "../../api";
import { Feature, IPlace } from "../../interfaces/places";

const initialState: IPlacesReduerState = {
	isLoading: true,
	userLocation: undefined,
	isLoadingPlaaces: false,
	places: [],
};

interface IPlacesProviderProps {
	children: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({ children }: IPlacesProviderProps) => {
	const [state, dispatch] = useReducer(placesReducer, initialState);

	useEffect(() => {
		getUserLocation().then((location) => {
			dispatch({ type: "setUserLocation", payload: location });
		});
	}, []);

	const searchPlacesByTerm = async (query: string): Promise<Feature[]> => {
		if (query.length === 0) {
			dispatch({ type: "setPlaces", payload: [] });

			return [];
		}
		if (!state.userLocation) {
			throw new Error("No existe la ubicación del usuario");
		}

		dispatch({ type: "setLoadingPlaces" });

		const response = await searchApi.get<IPlace>(`/${query}.json`, {
			params: {
				proximity: state.userLocation.join(","),
			},
		});

		dispatch({ type: "setPlaces", payload: response.data.features });

		return response.data.features;
	};

	return (
		<PlacesContext.Provider value={{ ...state, searchPlacesByTerm }}>
			{children}
		</PlacesContext.Provider>
	);
};
