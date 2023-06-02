import { BtnMyLocation, MapView, ReactLogo, SearchBar } from "../components";

export const HomeScreen = () => {
	return (
		<div>
			<SearchBar />

			<MapView />

			<BtnMyLocation />

			<ReactLogo />
		</div>
	);
};
