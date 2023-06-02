import React from "react";
import ReactDOM from "react-dom/client";

/* eslint-disable import/no-webpack-loader-syntax */
//@ts-ignore
import mapboxgl from "!mapbox-gl";

import { MapsApp } from "./MapsApp";

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN as string;

if (!navigator.geolocation) {
	alert("El navegador no tiene acceso a Geolocation");
	throw new Error("El navegador no tiene acceso a Geolocation");
}

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<React.StrictMode>
		<MapsApp />
	</React.StrictMode>
);
