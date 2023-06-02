import { useContext, useState } from "react";
import { MapContext, PlacesContext } from "../context";
import { LoadingPlaces } from "./LoadingPlaces";
import { Feature } from "../interfaces/places";

export const SearchResults = () => {
	const { map, getRouteBetweenPoints } = useContext(MapContext);
	const { places, isLoadingPlaaces, userLocation } = useContext(PlacesContext);

	const [activePlaceId, setActivePlaceId] = useState("");

	const onPlaceClick = (place: Feature) => {
		const [lng, lat] = place.center;

		setActivePlaceId(place.id);

		map?.flyTo({
			zoom: 14,
			center: [lng, lat],
		});
	};

	const onGetRouteClick = (place: Feature) => {
		if (!userLocation) {
			return;
		}

		const [lng, lat] = place.center;

		getRouteBetweenPoints(userLocation, [lng, lat]);
	};

	if (isLoadingPlaaces) {
		return <LoadingPlaces />;
	}

	if (places.length === 0) {
		return <></>;
	}

	return (
		<ul className="list-group mt-3">
			{places.map((place) => (
				<li
					key={place.id}
					className={`list-group-item list-group-item-action pointer ${
						activePlaceId === place.id ? "active" : ""
					}`}
					onClick={() => onPlaceClick(place)}
				>
					<h6>{place.text_es}</h6>
					<p
						style={{
							fontSize: "12px",
						}}
					>
						{place.place_name_es}
					</p>
					<button
						className={`btn ${
							activePlaceId === place.id
								? "btn-outline-light"
								: "btn-outline-primary"
						} btn-sm`}
						onClick={() => onGetRouteClick(place)}
					>
						Direcciones
					</button>
				</li>
			))}
		</ul>
	);
};
