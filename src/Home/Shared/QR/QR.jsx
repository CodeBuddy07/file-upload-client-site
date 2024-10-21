import QRCode from "react-qr-code";
import PropTypes from 'prop-types';


const QR = ({ link = "", loading, clicked }) => {

    return (
        <div className="flex-1 flex justify-center items-center p-5">

            <h1 className={clicked ? "hidden" : "text-lg text-[#738392] font-semibold text-center"}>Generated QR code will be desplayed here</h1>

            <div className={loading?"skeleton h-80 w-96": "hidden"}></div>

            <div className={!link ? "hidden":"w-96"}>
                <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={link}
                    viewBox={`0 0 256 256`}
                />

            </div>



        </div>
    );
};

export default QR;

QR.propTypes = {
    link: PropTypes.string,
    loading: PropTypes.bool,
    clicked: PropTypes.bool,
}