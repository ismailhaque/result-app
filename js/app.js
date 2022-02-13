//get elements

const student_form = document.getElementById('student_form');
const data_list = document.getElementById('data_list');
const alert_m = document.querySelector('.a-massage');

student_form.addEventListener('submit', function (e) {
    e.preventDefault();

    let name = student_form.querySelector("input[placeholder='Student Name']");
    let roll = student_form.querySelector("input[placeholder='Roll Number']");
    let student_class = student_form.querySelector("input[placeholder='Class']");
    let photo = student_form.querySelector("input[placeholder='Photo']");
    let gender = student_form.querySelector("input[type='radio']:checked");
    let ban = student_form.querySelector("input[placeholder='Bangla']");
    let eng = student_form.querySelector("input[placeholder='English']");
    let math = student_form.querySelector("input[placeholder='Math']");
    let sci = student_form.querySelector("input[placeholder='Science']");
    let ss = student_form.querySelector("input[placeholder='Social Science']");
    let rel = student_form.querySelector("input[placeholder='Religion']");

    if (name.value == '' || roll.value == '' || student_class.value == '' || photo.value == '' || gender.value == '' || ban.value == '' || eng.value == '' || math.value == '' || sci.value == '' || ss.value == '' || rel.value == '') {
        
        alert_m.innerHTML = 'All fields are required';
        alert_m.classList.add(`alert`);

        setInterval(function () {
            alert_m.innerHTML = '';
            alert_m.classList.remove(`alert`);
        }, 5000);

    } else {

        let storage_data = [];

        if (dataGet('stu_data')) {

            storage_data = dataGet('stu_data');

        }

        storage_data.push({
            name: name.value,
            roll: roll.value,
            className: student_class.value,
            gender: gender.value,
            photo: photo.value,
            ban: ban.value,
            eng: eng.value,
            math: math.value,
            sci: sci.value,
            ss: ss.value,
            rel: rel.value,

        });

        dataSend('stu_data', storage_data);

        student_form.querySelector("input[placeholder='Student Name']").value = '';
        student_form.querySelector("input[placeholder='Roll Number']").value = '';
        student_form.querySelector("input[placeholder='Class']").value = '';
        student_form.querySelector("input[placeholder='Photo']").value = '';
        student_form.querySelector("input[type='radio']:checked").removeAttribute('checked');
        student_form.querySelector("input[placeholder='Bangla']").value = '';
        student_form.querySelector("input[placeholder='English']").value = '';
        student_form.querySelector("input[placeholder='Math']").value = '';
        student_form.querySelector("input[placeholder='Science']").value = '';
        student_form.querySelector("input[placeholder='Social Science']").value = '';
        student_form.querySelector("input[placeholder='Religion']").value = '';

        allStudentData();

    }

});

allStudentData();

function allStudentData() {
    let result = new Result;

    let all_data = dataGet('stu_data');

    let data = '';

    all_data.map((student, index) => {
       
        data += `
        <tr>
            <td>${ index + 1 }</td>
            <td>${ student.name }</td>
            <td>${ student.roll }</td>
            <td>${ student.className }</td>
            <td>${ student.gender }</td>
            <td> ${result.finalResult(student.ban, student.eng, student.math, student.sci, student.ss, student.rel).finalCgpa} </td>			 
            <td> ${result.finalResult(student.ban, student.eng, student.math, student.sci, student.ss, student.rel).finalResult} </td>									 
            <td><img style="width:50px; height:50px; object-fit:cover;" src="${ student.photo }"</td>									 
            <td>
            <button class="btn btn-info btn-sm" data-bs-toggle="modal" onclick="getSingleResult(${index})" data-bs-target="#student_single_modal" >View</button>
                <button onclick="deleteStudent(${ index })" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button>
            </td>									 
        </tr>`
        
    });

    data_list.innerHTML = data;
}

// delete student
function deleteStudent(id){

    const con = document.querySelector(`#deletConf`);
    
    con.addEventListener(`click`, function(){

        let stu_data = dataGet('stu_data');
        stu_data.splice(id , 1);
        dataSend('stu_data', stu_data);
        allStudentData();
        
    })
        
}

// viwe student
const student_result_data = document.querySelector('.student-result-data');
function getSingleResult(index){
    let result = new Result;
    let storage_data = dataGet('stu_data');
    student_result_data.innerHTML = `
            <div class="v-body">
            <div class="v-img"><img class="shadow" src="${ storage_data[index].photo }" alt=""></div>
            <div class="v-contant">
            <h2>Name: ${ storage_data[index].name }</h2>
            <p>Roll: ${storage_data[index].roll}</p>
            <p>Class: ${storage_data[index].className}</p>
            <p>Gender: ${storage_data[index].gender}</p>
            </div>
            </div>
            
            <hr>
            <table class="table table-striped table-dark table-hover table-bordered">
                <thead>
                    <tr>
                        <td>Subject</td>
                        <td>Marks</td>
                        <td>GPA</td>
                        <td>Grade</td>
                        <td>CGPA</td>
                        <td>Result</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Bangla</td>
                        <td>${ storage_data[index].ban }</td>
                        <td>${ result.result(storage_data[index].ban).abba }</td>
                        <td>${ result.result(storage_data[index].ban).mama }</td>
                        <td rowspan="6">  

                        ${ result.finalResult(  storage_data[index].ban, storage_data[index].eng, storage_data[index].math, storage_data[index].sci, storage_data[index].ss, storage_data[index].rel  ).finalCgpa }
                        
                        </td> 
                        <td rowspan="6">${ result.finalResult(  storage_data[index].ban, storage_data[index].eng, storage_data[index].math, storage_data[index].sci, storage_data[index].ss, storage_data[index].rel  ).finalResult }</td>
                    </tr>
                    <tr>
                        <td>English</td>
                        <td>${ storage_data[index].eng }</td>
                        <td>${ result.result(storage_data[index].eng).abba}</td>
                        <td>${ result.result(storage_data[index].eng).mama }</td>

                    </tr>
                    <tr>
                        <td>Math</td>
                        <td>${ storage_data[index].math }</td>
                        <td>${ result.result(storage_data[index].math).abba }</td>
                        <td>${ result.result(storage_data[index].math).mama }</td>

                    </tr>
                    <tr>
                        <td>Science</td>
                        <td>${ storage_data[index].sci }</td>
                        <td>${ result.result(storage_data[index].sci).abba }</td>
                        <td>${ result.result(storage_data[index].sci).mama }</td>

                    </tr>
                    <tr>
                        <td>Social Science</td>
                        <td>${ storage_data[index].ss }</td>
                        <td>${ result.result(storage_data[index].ss).abba }</td>
                        <td>${ result.result(storage_data[index].ss).mama }</td>

                    </tr>
                    <tr>
                        <td>Religion</td>
                        <td>${ storage_data[index].rel }</td>
                        <td>${ result.result(storage_data[index].rel).abba }</td>
                        <td>${ result.result(storage_data[index].rel).mama }</td>

                    </tr>
                </tbody>
            </table>
            
    `;
}