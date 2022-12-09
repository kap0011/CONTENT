import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SearchTag() {

    const { tag } = useParams();

    const [imgs, setImgs] = useState([]);
    const [imgTag, setImgTag] = useState(tag);
    const [showImg, setShowImg] = useState(false);
    const [showImgDetails, setShowImgDetails] = useState(null);

    console.log(imgTag);
  
    const getImgs = async () => {
      try{
          const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getImgsByTag`, {
            params: {
                imgTag
            }
          });
          setImgs(res.data.imgs)
      }catch(err){
          toast.error(err.response?.data.message || "Server Down!");
      }
    };
  
    const tagSearch = async (tag) => {
        setImgTag(tag);
        setShowImg(false);
    };
  
    useEffect(()=>{
      getImgs();
    }, [imgTag]);

return (
<>
      <ToastContainer/>
      <p className="m-4">Images: #{imgTag}</p>
      { !showImg ?
        (
            imgs.length > 0
            ?
            <div className="m-4 d-flex flex-wrap">
                {imgs.map((img, index)=>{
                    return (
                        <div key={index} className="p-4"><img src={img.url} alt={`img${index}`} onClick={()=>{setShowImg(true);setShowImgDetails(img)}}/></div>
                )})}
            </div>
            :
            <p>No Image found on Tag {imgTag}</p>
        )
      :
        <div className="container">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header  bg-light">
                <button type="button" className="btn-close" onClick={()=>{setShowImg(false);}}></button>
              </div>
              <div className="d-flex justify-content-center modal-body">
                <img src={showImgDetails.url} alt='Img' className="img-fluid"/>
              </div>
              <div className="modal-footer">
                {showImgDetails.tags.map((tag, index)=>{
                  return <p key={index} className="badge bg-light text-secondary" onClick={()=>tagSearch(tag)}>#{tag}</p>
                })}
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default SearchTag;
