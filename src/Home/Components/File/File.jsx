import axios from "axios";
import QR from "../../Shared/QR/QR";
import { useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Authentication/AxiosSecure/useAxiosSecure";


const File = () => {

    const [link, setLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [clicked, setClicked] = useState(false);

    const axiosSecure = useAxiosSecure()

    const handleUpload = async (e) => {
        setLoading(true);
        setClicked(true);
        setLink('');
        e.preventDefault();
    
        const file = e.target.file.files[0];
    
        if (!file) {
            toast.warning("Please select a file first",{theme:"colored"});
            setLoading(false);
            setClicked(false);
            return;
        }
    
        const formData = new FormData(); // Create a new FormData object
        formData.append("file", file);   // Append the selected file
    
        try {
            const response = await axiosSecure.post('/upload', formData, {
                withCredentials: true, // important to include cookies for authentication
                headers: {
                    'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
                },
            });
    
            toast.success(`File uploaded successfully`,{theme:"colored"});
            setLink(`https://drive.google.com/file/d/${response?.data?.fileId}/view`);
            setLoading(false);
        } catch (error) {
            toast.error('Error uploading file', {theme: "colored"});
            setLoading(false);
            console.log(error);
        }
    };
    

        return (
            <div className="flex flex-col lg:flex-row justify-center items-center min-w-screen min-h-screen gap-20 lg:p-32 p-5 lg:mt-0 mt-24">
                <div className="border border-[#A855F7] rounded-md p-5 flex-1 ">
                    <h1 className="text-2xl font-bold text-[#9B27AF]">Upload Your Files</h1>
                    <div className="border-t-2 border-dotted border-[#CD93D7] mt-3"></div>
                    <form onSubmit={(e) => handleUpload(e)} className="my-5 flex flex-col">
                        <h1>Select Your File : </h1>
                        <input type="file" className="file-input file-input-bordered w-full mt-2" name="file" />
                        <button type="submit" className="mt-5 btn bg-[#9B27AF] hover:bg-purple-500 text-lg font-bold text-white">Generate QR Code</button>
                    </form>
                </div>
                <QR link={link} loading= {loading} clicked={clicked}></QR>
            </div>
        );
    };

    export default File;