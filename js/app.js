//get elements

const student_form = document.getElementById('student_form');
const data_list = document.getElementById('data_list');

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

    if (name.value == '' || roll.value == '' || student_class.value == '' || photo.value == '') {

        alert('All fields are required');

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
            <td> A </td>									 
            <td> 4.8 </td>									 
            <td><img style="width:50px; height:50px; object-fit:cover;" src="${ student.photo }"</td>									 
            <td>
                <button class="btn btn-info btn-sm">View</button>
                <button onclick="deleteStudent(${ index })" class="btn btn-danger btn-sm">Delete</button>
            </td>									 
        </tr>`
        
    });

    data_list.innerHTML = data;
}

// delete student
function deleteStudent(id){

    let conf = confirm('Are you sre ?');

    if(conf){
        let storage_data = dataGet('stu-data');
        storage_data.splice(id, 1);
        dataSend('stu-data',storage_data);
        allStudentData();
    }else{
        return false;
    }


}
