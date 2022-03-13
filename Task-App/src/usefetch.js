import { useEffect, useState } from "react";
const useFetch=(url)=>{
    const [data,setData]=useState(null)
    const [isPending,setIsPending]=useState(true)
    const[error,setError]=useState(null)
    useEffect(()=>{
        //koska kun siirrytään eri routeteihin niin ne fetch jää vielä voimaan pitää siivota
         const abortCont=new AbortController();
        fetch(url,{
            headers: {"Content-Type": "application/json",
          Authorization: 'beartoken ' + localStorage.getItem('token')
        },
        },{signal:abortCont.signal}).then((res)=>{
            if(!res.ok){
                throw Error('could not fetch data for that resource');
            }
           return res.json();
        }).then((data)=>{
            console.log(data)
            setIsPending(false)
            setError(null)
    
            setData(data)
    
        }).catch(err=>{
            console.log('error tuli')
            if(err.name==='AbortError'){
                console.log('fetch aborted')
            }else{
                console.log('error tuli')
            setData(null)
            setError(err.message)
            setIsPending(false)
            }
        })   
        return ()=>{
            abortCont.abort()
        }
    }, [url]);

    return {data,isPending,error}
}
export default useFetch