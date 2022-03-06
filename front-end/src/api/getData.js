const getData = (response)=>{
    let result = response?.data;
    console.log("data")
    if(result){
        let result2 = result?.data;
        if(result2)
            return result2;
        return result
    }
        
    return response;
}
export default getData