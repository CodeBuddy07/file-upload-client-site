import { toast } from "react-toastify";
import QR from "../../Shared/QR/QR";
import { useState } from "react";
import useAxiosSecure from "../../Authentication/AxiosSecure/useAxiosSecure";

const Text = () => {

    const [link, setLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [clicked, setClicked] = useState(false);

    const axiosSecure = useAxiosSecure();

    function generateTitle(text) {

        // Trim the text to remove unnecessary whitespace
        text = text.trim();
    
        // Check if the text is empty
        if (!text) {
            return "Untitled"; // Default title for empty input
        }
    
        // Split the text into sentences based on punctuation marks
        const sentences = text.match(/[^\.!\?]+[\.!\?]+/g);
    
        // If there is no clear sentence structure, take the first few words
        if (!sentences || sentences.length === 0) {
            const words = text.split(/\s+/).slice(0, 5); // Get the first 5 words
            return words.join(" ") + "..."; // Create a simple title from the first few words
        }
    
        // Use the first sentence or a meaningful snippet as the title
        const firstSentence = sentences[0].trim();
    
        // Optionally, limit the title length
        const title = firstSentence.length > 50 ? firstSentence.substring(0, 50) + "..." : firstSentence;
    
        return title;
    }

    const handleSave = async (e) => {
        setLoading(true);
        setClicked(true);
        setLink('');
        e.preventDefault();
        const text = e.target.text.value;

        const name = generateTitle(text);
        
        if (!text) {
            toast.warning("Please enter some text",{theme:"colored"});
            setLoading(false);
            setClicked(false);
            return;
        }

        try {
            const response = await axiosSecure.post('/upload-text', { text, name });

            toast.success(`Text saved to Google Drive!`, {theme: "colored"});
            setLink(response?.data?.customLink)
            setLoading(false);
        } catch (error) {
            toast.error('Error saving text',{theme: "colored"});
            setLoading(false);
            console.log(error);
        }
    };

    


    return (
        <div className="flex flex-col lg:flex-row justify-center items-center min-w-screen min-h-screen gap-20 lg:p-32 p-5 lg:mt-0 mt-24">
            <div className="border border-[#A855F7] rounded-md p-5 flex-1 ">
                <h1 className="text-2xl font-bold text-[#9B27AF]">Add text to get QR code</h1>
                <div className="border-t-2 border-dotted border-[#CD93D7] mt-3"></div>
                <form onSubmit={(e)=>handleSave(e)} className="my-5 flex flex-col">
                    <h1>Type Here : </h1>
                    <textarea name="text" className="textarea textarea-bordered mt-2" placeholder="Write whatever you want"></textarea>
                    <button type="submit" className="mt-5 btn bg-[#9B27AF] hover:bg-purple-500 text-lg font-bold text-white">Generate QR Code</button>
                </form>
            </div>
            <QR link={link} loading= {loading} clicked={clicked}></QR>
        </div>
    )
};

export default Text;