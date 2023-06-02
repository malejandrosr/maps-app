import { createContext } from "react";

/* eslint-disable import/no-webpack-loader-syntax */
//@ts-ignore
import { Map } from "!mapbox-gl";

interface IMapContextProps {
	isMapReady: boolean;
	map?: Map;
	setMap: (map: Map) => void;
	getRouteBetweenPoints: (start: [number, number], end: [number, number]) => Promise<void>
}

export const MapContext = createContext<IMapContextProps>(
	{} as IMapContextProps
);
