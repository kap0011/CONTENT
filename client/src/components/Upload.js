import React, {useState} from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Upload({user}) {

  const [url, setUrl] = useState('');
  const [tags, setTags] = useState('');

  const uploadImg = async (e) => {
    e.preventDefault();
    // Here I validate using simple if else validation but in production we can do it same thing in easy maner using react-hook form and yup or other using libraries
    if(url !== '' && tags !== ''){
      const tagsArray = tags.split('#').map((tag) => tag.trim()).filter(tag => tag !== '');
      
      let rex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
      if(!rex.test(url)){
        return toast.error("url is not valid");
      }

      if(tagsArray.length > 3){
        return toast.error("You can only discribe three tags");
      }

      try{
          const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/uploadImg`,{
            url, tagsArray, userId:user._id
          });
          toast.success(res.data?.message || "Image uploaded successfully!");
          setUrl(''); setTags('');
      }catch(err){
          toast.error(err.response?.data.message || "Server Down!");
      }

    }else {
      toast.error("Please Enter all fields first!");
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="d-flex justify-content-start align-items-center ">
        <div className="card m-4 bg-light">
          <form onSubmit={(e)=>uploadImg(e)} className="p-4">
            <div className="form-outline mb-4">
              <label className="form-label" for="imgUrl">Image URL</label>
              <input type="text" id="imgUrl" className="form-control" placeholder="Enter your Image url" value={url} onChange={(e)=>setUrl(e.target.value)}/>
            </div>
            <div class="form-outline mb-4">
              <label className="form-label" for="tags">Tags</label>
              <input type="text" id="tags" className="form-control" placeholder="Enter #tags (Max Three)" value={tags} onChange={(e)=>setTags(e.target.value)}/>
            </div>
            <button type="submit" className="w-100 btn btn-primary btn-block">Upload</button>
            </form>
          </div>
        </div>
      </>
  );
}

export default Upload;
