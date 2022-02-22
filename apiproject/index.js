function abrete() {
    $('#create').dialog({
        modal: true,
        overlay: {
            opacity: 0.7,
            background: "black"
        },
        draggable: false,
        open: function(event, ui) {
            $('.ui-widget-overlay').bind('click', function() {
                $("#create").dialog('close');
            });
        },

    });
};

function onFormSubmit() {
    var userName = document.getElementById("name").value;
    var userEmail = document.getElementById("email").value;
    var userGender = document.getElementById("gender").value;
    var userStatus = document.getElementById("status").value;

    $("#create").dialog('close');
    postData(userName, userEmail, userGender, userStatus);

}


var dataUiList = [];


function readFormData() {

    const request = new XMLHttpRequest();

    request.open('GET', `https://gorest.co.in/public/v1/users/`);
    request.setRequestHeader("Authorization", "Bearer bc1e0809f9bb5ce03125ea49290ec9c8acc225870ebd21e484217e79b88800db");
    request.setRequestHeader("Content-Type", "application/json");
    request.send();

    request.onload = () => {
        if (request.status === 200) {
            console.log("Success list"); // So extract data from json and create table
            var listData = JSON.parse(request.response).data;
            dataUiList = [];

            dataUiList += `<tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Gender</th>
            <th scope="col">Status</th>
        </tr>`;
            for (var key = 0; key <= listData.length - 1; key++) {
                var userid = listData[key].id;
                var username = listData[key].name;
                var useremail = listData[key].email;
                var usergender = listData[key].gender;
                var userstatus = listData[key].status;



                var tbody = document.querySelector("tbody");
                tbody = "<tr><td>" + userid + "</td><td>" + username + "</td><td>" + useremail + "</td><td>" + usergender + "</td><td>" + userstatus + "</td></tr>";

                dataUiList += tbody;


            }
            document.querySelector(".table").innerHTML = dataUiList;

        }
    }
}
readFormData();

// function reloadP() {

//     // sessionStorage.setItem("reloading", "true");
//     document.location.reload();
//     console.log("reloading")


// }



function postData(user_name, user_email, user_gender, user_status) {

    console.log("post user data has been called");

    const request = new XMLHttpRequest();
    request.open('POST', 'https://gorest.co.in/public/v1/users');
    request.setRequestHeader("Authorization", "Bearer bc1e0809f9bb5ce03125ea49290ec9c8acc225870ebd21e484217e79b88800db");
    request.setRequestHeader("Content-Type", "application/json");
    var raw = JSON.stringify({
        "name": user_name,
        "email": user_email,
        "gender": user_gender,
        "status": user_status
    });


    request.onload = () => {

        console.log(`result from server onload: -> ${request.response}`);
        if (request.status == 200 || request.status == 201) {
            readFormData()

        } else {
            alert("failed")

        }
    }

    request.send(raw);


}


document.querySelector("#table").addEventListener("click", event => {
    let dataTr = event.target.parentNode;
    let dataId = dataTr.querySelectorAll("td")[0].innerText;
    let dataName = dataTr.querySelectorAll("td")[1].innerText;
    let dataEmail = dataTr.querySelectorAll("td")[2].innerText;
    let dataGender = dataTr.querySelectorAll("td")[3].innerText;
    let dataStatus = dataTr.querySelectorAll("td")[4].innerText;

    $('#update').dialog({
        modal: true,
        overlay: {
            opacity: 0.7,
            background: "black"
        },
        draggable: false,
        open: function(event, ui) {
            $('.ui-widget-overlay').bind('click', function() {
                $("#update").dialog('close');
            });
        },

    });

    userId = document.getElementById("id1").value = dataId
    userName = document.getElementById("name1").value = dataName;
    userEmail = document.getElementById("email1").value = dataEmail;
    userGender = document.getElementById("gender1").value = dataGender;
    userStatus = document.getElementById("status1").value = dataStatus;
    $("#id1").attr("disabled", true);

    var updatButton = document.getElementById("btn1");
    updatButton.addEventListener("click", () => {

        console.log(dataName)
        console.log(document.getElementById("name1").value)
        dataTr.querySelectorAll("td")[0].innerHTML = document.getElementById("id1").value
        dataTr.querySelectorAll("td")[1].innerHTML = document.getElementById("name1").value
        dataTr.querySelectorAll("td")[2].innerHTML = document.getElementById("email1").value
        dataTr.querySelectorAll("td")[3].innerHTML = document.getElementById("gender1").value
        dataTr.querySelectorAll("td")[4].innerHTML = document.getElementById("status1").value

    })
    console.log(dataTr.rowIndex)
})



function editData(u_id, u_name, u_email, u_gender, u_status) {

    const request = new XMLHttpRequest();
    var raw = JSON.stringify({
        "id": u_id,
        "name": u_name,
        "email": u_email,
        "gender": u_gender,
        "status": u_status
    });
    request.open('PUT', `https://gorest.co.in/public/v1/users/${u_id}`);
    request.setRequestHeader("Authorization", "Bearer bc1e0809f9bb5ce03125ea49290ec9c8acc225870ebd21e484217e79b88800db");
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = () => {
        console.log(`result from server : -> ${request.response}`);
        if (request.status == 200 || request.status == 201) {
            readFormData();


            console.log(JSON.parse(request.response).data.email)

        } else {
            alert(JSON.parse(request.response).data[0].message)
        }
    }

    request.send(raw);
}

function updateData() {

    let uid = document.getElementById("id1").value
    let uname = document.getElementById("name1").value
    let uemail = document.getElementById("email1").value
    let ugender = document.getElementById("gender1").value
    let ustatus = document.getElementById("status1").value
    $("#update").dialog('close');
    editData(uid, uname, uemail, ugender, ustatus);

}