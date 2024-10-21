
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Home/Shared/Loading/Loading';


const FileViewPage = () => {
    const { filename } = useParams();

    useEffect(() => {
        // Construct the Google Drive link
        const googleDriveLink = `https://file-upload-server-site.vercel.app/folder/${filename}`; // Replace YOUR_FILE_ID with the actual file ID from the upload response
        // Redirect to the Google Drive link
        window.location.href = googleDriveLink;
    }, [filename]);

    return <Loading></Loading>; // Optional loading state while redirecting
};

export default FileViewPage;
