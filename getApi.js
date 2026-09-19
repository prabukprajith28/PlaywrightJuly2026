function getApi(){
    const  response = fetch('https://automationexercise.com/api/productsList').then((data)=> {
        return data.json()
    })
    return response
}
getApi().then(data =>{
    console.log(JSON.stringify(data))
})