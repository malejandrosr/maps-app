import { useContext } from "react";
import { MapContext, PlacesContext } from "../context";

export const BtnMyLocation = () => {
	const { map, isMapReady } = useContext(MapContext);
	const { userLocation } = useContext(PlacesContext);

	const onClick = () => {
		if (!isMapReady) {
			throw new Error("El mapa no esta listo");
		}

		if (!userLocation) {
			throw new Error("No existe la ubicación del usuario");
		}

		map?.flyTo({
			zoom: 14,
			center: userLocation,
		});
	};

	return (
		<button
			className="btn btn-primary"
			style={{
				position: "fixed",
				right: "20px",
				top: "20px",
				zIndex: 999,
			}}
			onClick={onClick}
		>
			Mi Ubicación
		</button>
	);
};
