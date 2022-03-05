const getData = (response)=>{
    let result = response?.data;
    if(result)
        return result
    return response;
}
export default getData