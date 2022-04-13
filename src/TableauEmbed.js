import React,{useRef,useEffect, useState} from "react";
import urls from './urls'
function TableauEmbed() {
    const {tableau} = window;
    const ref = useRef(null)
    const [url,setUrl] = useState(null)
    let viz = null;
    // const url = 'https://public.tableau.com/views/WorldIndicators/GDPpercapita'
    const options = {
        device : 'desktop'
    }
    function initViz(){
        if(url){
           viz = new tableau.Viz(ref.current,url,options)
        }
       
    }
    const setUrlValue = (e)=>{
        const { value } = e.target;
        if(value == -1){
            setUrl(null);
            if(viz){
                viz.dispose();
            }
        }else{
            if(viz){
                viz.dispose();
            }
            console.log('url-->',urls[value].url)
            setUrl(urls[value].url);
        }
       
    }
    const setViz = ()=>{
        initViz()
    }
    useEffect(()=>{
            setViz()
    },[url])

    const rows = [ <option value={-1}>Select..</option>];
    urls.forEach((url,index)=>{
        rows.push(<option value={index}>{url.label}</option>)
    })
  return (
      <div className="col-md-12">
          <div className="col-md-12 drop-down-container">
                <select className="form-select form-select-lg m-5 p-3 drop-down-select" onChange={(e)=>setUrlValue(e)} aria-label="Default select">
                    {rows}
                </select>
            </div>
     {url ? <div className='col-md-12-offset-4 ui-container p-3 ui-dashboard' ref={ref}/>
       :  <h1 className="display-5 m-5 p-3 ui-dashboard">Please select Option</h1> } 
    </div>

  );
}

export default TableauEmbed;
