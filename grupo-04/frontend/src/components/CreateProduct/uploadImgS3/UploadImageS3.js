import React , {useState} from 'react';
import { uploadFile } from 'react-s3';
import './uploadImageS3.css';
window.Buffer = window.Buffer || require("buffer").Buffer;

const UploadImageS3 = (props) => {

    const config = { 
        bucketName: process.env.REACT_APP_BUCKET_NAME, 
        dirName: process.env.REACT_APP_DIR_NAME, /* opcional */
        region: process.env.REACT_APP_REGION, 
        accessKeyId: process.env.REACT_APP_ACCESS_ID, 
        secretAccessKey: process.env.REACT_APP_ACCESS_KEY, 
    };

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagesSelectedPrevious, setImagesSelectedPrevious] = useState([]);

    const handleFileInput = (e) => {
        for(let i=0; i< e.target.files.length; i++){
            console.log(e.target.files[i]);
            if (e.target.files[i] !== undefined) {
                //Cargamos la previsualizacion
                const name = e.target.files[i].name;
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[i]);
                reader.onload = (e) => {
                    e.preventDefault();
                    props.setImagesPrevious(oldArray =>[...oldArray ,{img:e.target.result, name:name}] );
                };               
                //Seteamos el array de archivos a subir
                props.setImagesFiles(oldArray => [...oldArray ,e.target.files[i]]);
            }
        }
    }

    const handleUpload = async (files) => {
        files.forEach((file)=>{
            uploadFile(file, config)
            .then(data => {
                console.log(data)
                //Aca validamos status de data y guardamos la url
                //en algun useState de product
                //mostramos cartel de que todo salio bien
            })
            .catch(err => console.error(err))
        });
        await deleteBufferImage(); //luego limpiamos
    }

    const deleteBufferImage = async () =>{
        setImagesSelectedPrevious([]);
        setSelectedFiles([]);
    }

    return(
        <>
        <div className={`image-upload-wrap ${props.borderClass}`}>
            <input
                className="file-upload-input"
                type="file" 
                onChange={handleFileInput} 
                multiple 
                accept="image/*"
            />
            <div className="text-information">
                <h3>Arrastre y suelte un archivo o seleccione una imagen</h3>
            </div>
        </div>
        {/*imagesSelectedPrevious.length !== 0? 
            <div className="previu-files-upload">
                {imagesSelectedPrevious.map((image, index)=>{
                    return (
                    <img
                        key={index+image}
                        src={image}
                        alt=""
                        height="150px"
                        width="250px"
                    />)
                })}
                <button onClick={() => handleUpload(selectedFiles)}> Upload to S3</button>
                <button onClick={deleteBufferImage}> Cancel </button>
            </div>
            :
            <></>
        */}
        
        </>
    )
}

export default UploadImageS3;