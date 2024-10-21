import { useEffect, useState } from "react";
import useAxiosSecure from "../../Authentication/AxiosSecure/useAxiosSecure";
import { toast } from "react-toastify";
import QRCode from "react-qr-code";
import Loading from "../../Shared/Loading/Loading";


const Uploads = () => {

    const axiosSecure = useAxiosSecure();

    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const callData = () => {
        setLoading(true);
        axiosSecure.get('/files')
            .then((response) => {
                setFiles(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                toast.error("Server error!", { theme: "colored" });
                setLoading(false);
            })
    }

    useEffect(() => {
        callData()
    }, []);

    const handleDelete = (id) => {

        axiosSecure.delete(`/upload/${id}`)
            .then((response) => {
                toast.success(response.data.message, { theme: "colored" });
                callData()
            })
            .catch((error) => {
                console.log(error);
                toast.error("Server error!", { theme: "colored" })
            })
    }

    function formatDate(isoString) {
        const date = new Date(isoString);

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
            timeZone: 'UTC'
        };

        return date.toLocaleString('en-US', options);
    }


    return (

        <div className="flex flex-col items-center min-h-screen pt-32 py-10 bg-gray-100">
            <h1 className="text-3xl font-bold mb-5 text-purple-600">Uploaded Files</h1>

            <div className="w-full lg:max-w-[80%] max-w-[95%] bg-white shadow-md rounded-lg p-5">
                {loading ?
                    <Loading></Loading>
                    :
                    <></>
                }
                {files.length === 0 ? (
                    <p className={loading? "hidden" : "text-gray-500 text-center"}>No files uploaded yet.</p>
                ) : (
                    <div className="w-full ">

                        {files.map((file, index) => (
                            <div key={file.id} className="flex justify-start items-center border-b">
                                <h1 className="text-xl font-semibold p-2">{index + 1}.</h1>
                                <div className={"w-24 h-24"}>
                                    <QRCode
                                        size={256}
                                        style={{ height: "96px", maxWidth: "96px", width: "96px" }}
                                        value={`https://drive.google.com/file/d/${file.id}/view`}
                                        viewBox={`0 0 256 256`}
                                    />
                                </div>
                                <div className=" p-2 h-32 pt-3">
                                    <h1 className="text-lg font-semibold flex h-8 overflow-hidden w-fit text-ellipsis">Title:  <span className="font-normal w-40 overflow-hidden text-ellipsis md:w-fit ps-2 ">{file.name}</span> </h1>
                                    <p className="font-semibold text-sm md:text-base"> Created on: <span className="md:text-sm text-xs font-normal">{formatDate(file.createdTime)}</span> </p>

                                    <div className=" flex justify-start items-center md:mt-3">
                                        <a
                                            href={`https://drive.google.com/file/d/${file.id}/view`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline mr-4 btn md:btn-sm btn-xs"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:size-6 size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525" />
                                            </svg>

                                            Visit

                                        </a>

                                        <button
                                            onClick={() => handleDelete(file.id)}
                                            className="text-red-500 hover:text-red-700 btn md:btn-sm btn-xs"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:size-6 size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                            Delete

                                        </button>
                                    </div>
                                </div>
                            </div>

                        ))}

                    </div>
                )}
            </div>
        </div>

    );
};

export default Uploads;