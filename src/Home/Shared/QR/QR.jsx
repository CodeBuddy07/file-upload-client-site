import QRCode from "react-qr-code";
import PropTypes from 'prop-types';
import { useRef } from "react";

const QR = ({ link, loading, clicked }) => {
    const qrRef = useRef();

    const downloadQR = () => {
        const svg = qrRef.current.firstChild; // Get the SVG element
        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = 256; // Set the canvas size
            canvas.height = 256;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            const imgData = canvas.toDataURL("image/png");

            const link = document.createElement("a");
            link.href = imgData;
            link.download = "qr-code.png"; // Desired filename
            link.click();

            URL.revokeObjectURL(url); // Clean up
        };

        img.src = url; // Set the image source to the blob URL
    };

    return (
        <div className="flex-1 flex justify-center items-center p-5">
            <h1 className={clicked ? "hidden" : "text-lg text-[#738392] font-semibold text-center"}>
                Generated QR code will be displayed here
            </h1>
            <div className={loading ? "skeleton h-80 w-96" : "hidden"}></div>
            <div className={ !link ? "hidden" :"flex gap-5 flex-col"}>
                <div ref={qrRef} className={ !link ? "hidden" : "w-96"}>
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={link}
                        viewBox={`0 0 256 256`}
                    />
                </div>
                <button onClick={downloadQR} className="mt-4 p-2 bg-blue-500 text-white rounded flex justify-center items-center gap-5 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>

                    <span className="text-lg font-semibold">Download QR Code</span>
                </button>
            </div>
        </div>
    );
};

export default QR;

QR.propTypes = {
    link: PropTypes.string,
    loading: PropTypes.bool,
    clicked: PropTypes.bool,
};
