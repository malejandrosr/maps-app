import logo from "../logo.svg";

export const ReactLogo = () => {
	return (
		<img
			src={logo}
			alt="ReactLogo"
			style={{
				bottom: "20px",
				position: "fixed",
				right: "20px",
				width: "130px",
			}}
		/>
	);
};
