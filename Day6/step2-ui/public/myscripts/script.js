let url = "http://localhost:2020"
function loaddata() {
    fetch(url + "/data", { method: "GET" })
        .then((dbres) => {
            return dbres.json();
        })
        .then((jsondata) => {
            // console.log(jsondata);
            // console.log(jsondata.length)
            document.getElementById("box").innerHTML = "";
            jsondata.forEach((val, idx) => {
                document.getElementById("box").innerHTML += `
            <tr>
                <td>${idx + 1}</td>
                <td>${val.title}</td>
                <td>${val.firstname}</td>
                <td>${val.lastname}</td>
                <td>${val.city}</td>
                <td><button data-fid="${val._id}" class="btn btn-warning"> Edit </button> </td>
                <td><button data-fid="${val._id}" class="btn btn-danger"> Delete </button> </td>
            </tr>
        `
            })

        })
        .catch((error) => {
            console.log("Error ", error)
        })
}
function init() {
    loaddata();
    /* document.getElementById("loadbtn").addEventListener("click", clickHandler); */
    document.getElementById("addbtn").addEventListener("click", addFriendHandler);
    document.getElementById("box").addEventListener("click", deleteHandler);
    document.getElementById("box").addEventListener("click", editHandler);
    document.getElementById("updatebtn").addEventListener("click", updateHandler);
    document.getElementsByClassName("editbox")[0].setAttribute("style", "display:none")
};
/* function clickHandler(){
    loaddata();
}; */
function deleteHandler(evt) {
    // alert("delete button was clicked");
    // if(evt.target.getAttribute("class") === "btn btn-danger"){
    if (evt.target.textContent === " Delete ") {
        // alert("delete button was clicked"+" id is "+evt.target.getAttribute("data-fid"));
        fetch(url + "/delete", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: evt.target.getAttribute("data-fid")
            })
        })
            .then((res) => {
                loaddata();
                return res.json()
            })
            .then((jsonres) => {
                console.log(jsonres)
            })
            .catch((err) => {
                console.log("Error ", err)
            })
    }

};
function editHandler(evt) {
    if (evt.target.textContent === " Edit ") {
        // alert("you clicked the edit button")
        fetch(url + "/edit/" + evt.target.getAttribute("data-fid"), {
            method: "GET"
        })
            .then((res) => {
                document.getElementsByClassName("editbox")[0].setAttribute("style", "display:static");
                document.getElementsByClassName("addbox")[0].setAttribute("style", "display:none");
                return res.json();
            })
            .then((jsonres) => {
                // console.log(jsonres);
                document.getElementById("e_titleip").value = jsonres.title;
                document.getElementById("e_fname").value = jsonres.firstname;
                document.getElementById("e_lname").value = jsonres.lastname;
                document.getElementById("e_city").value = jsonres.city;
                document.getElementById("e_id").value = jsonres._id;
            })
            .catch((error) => {
                console.log("Error ", error)
            })
    }

};

function addFriendHandler() {
    let title = document.getElementById("titleip").value;
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let city = document.getElementById("city").value;
    if (title && fname && lname && city) {
        fetch(url + "/data", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
                "title": document.getElementById("titleip").value,
                "firstname": document.getElementById("fname").value,
                "lastname": document.getElementById("lname").value,
                "city": document.getElementById("city").value,
            }),
        })
            .then((dbres) => dbres)
            .then((dbres) => {
                console.log("DB Response", dbres);
                loaddata();
            })
            .catch((error) => console.log("Error ", error))
    }
    else {
        alert("please fill all the details")
    }
};

function updateHandler() {
    fetch(url + "/edit/" + document.getElementById("e_id").value, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
            "title": document.getElementById("e_titleip").value,
            "firstname": document.getElementById("e_fname").value,
            "lastname": document.getElementById("e_lname").value,
            "city": document.getElementById("e_city").value,
        }),
    })
        .then((dbres) => {
            document.getElementsByClassName("addbox")[0].setAttribute("style", "display:static");
            document.getElementsByClassName("editbox")[0].setAttribute("style", "display:none");
            return dbres;
        })
        .then((dbres) => {
            console.log("DB Response", dbres);
            loaddata();
        })
        .catch((error) => console.log("Error ", error))
};


document.addEventListener("DOMContentLoaded", init);