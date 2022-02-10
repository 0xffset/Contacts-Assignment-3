document.addEventListener("DOMContentLoaded", function(e) {
   
    async function fetchSourceData() {
      let data = await fetch("https://www.raydelto.org/agenda.php");   
      return data.json();
    }
    
    async function loadFromSourceData() {
        tableContact = document.querySelector("#TableContact tbody");
        tableContact.innerHTML = '';
        let data = await fetchSourceData();
        console.log(data);
        data.forEach(function(x,i) {
            let tr = document.createElement("tr"),
                tdFirstName = document.createElement("td"),
                tdLastName = document.createElement("td"),
                tdPhone = document.createElement("td");
        tdFirstName.innerHTML = x.nombre;
        tdLastName.innerHTML = x.apellido;
        tdPhone.innerHTML = x.telefono;
        tr.appendChild(tdFirstName);
        tr.appendChild(tdLastName);
        tr.appendChild(tdPhone);
        tableContact.appendChild(tr);
        })
    }    
    loadFromSourceData();
})
document.getElementById("form-contact").addEventListener("submit", function(e){
        e.preventDefault();
       var firstName = document.getElementById("firstname").value,
            lastName = document.getElementById("lastname").value,
            phone = document.getElementById("phone").value;

    const Data = {
        'nombre': firstName,
        'apellido': lastName,
        'telefono': phone
    }
    try {
        fetch("http://www.raydelto.org/agenda.php", {
            method: 'POST',
            body: JSON.stringify(Data),
            hearders: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => console.log(res))
        .catch(error => console.error('Error:', error))
    } catch(e) {
        console.log("Error. A Error has been occur");
    }

});
