import { createContext } from "react";
import { Feature } from "../../interfaces/places";

export interface IPlacesContextProps {
	isLoading: boolean;
	userLocation?: [number, number];
	isLoadingPlaaces: boolean;
	places: Feature[];
	searchPlacesByTerm: (query: string)	=> Promise<Feature[]>;
}

export const PlacesContext = createContext<IPlacesContextProps>(
	{} as IPlacesContextProps
);
