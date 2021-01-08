
function fnFetchLocation(location){
    async function printWeather(){
        let url = "http://localhost:3000/weather?address=location";
        url = url.replace("location",location);
        let response = await fetch(url);
        let json = await response.json();
        return json;
    }
    
    printWeather().then((data) => {
        console.log(data);
        if(data.error){
            document.querySelector("#message1").textContent = data.error;
        }else{
            document.querySelector("#message1").textContent = data.address;
            document.querySelector("#message2").textContent = "Temperature is "+data.temperature+" degree celcius";
        }
    })
}

document.querySelector('form').addEventListener('submit',(event) => {
    event.preventDefault();
    document.querySelector("#message1").textContent = "Loading.......";
    document.querySelector("#message2").textContent = "";
    fnFetchLocation(document.querySelector('input').value);
});