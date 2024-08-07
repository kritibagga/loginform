import "./FormFooter.css";
import facebook from "./Image/facebook.png";
import google from "./Image/google.png";
import instagram from "./Image/instagram.png";

const FormFooter = () => {
	return (
		<div className='form-end'>
			<div className="link-wrap">
			<a href='https://www.google.com/'>
				<img
					src={facebook}
					alt='facebook'
				/>
			</a>
			</div>
			<div className="link-wrap">
			<a href='https://www.google.com/'>
				<img
					src={google}
					alt='google'
				/>
			</a>
			</div>
			<div className="link-wrap">
			<a href='https://www.google.com/'>
				<img
					src={instagram}
					alt='instagram'
				/>
			</a>
			</div>
		</div>
	);
};

export default FormFooter;
