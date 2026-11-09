
let students = [];

function addStudent() {
    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;

    if (name === "" || roll === "") {
        alert("Please enter student details");
        return;
    }

    if (students.some(s => s.roll === roll)) {
        alert("Roll number already exists");
        return;
    }

    students.push({
        name: name,
        roll: roll,
        present: 0,
        total: 0
    });

    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";

    displayStudents();
}

function markAttendance(index, status) {
    let student = students[index];

    student.total++;

    if (status === "Present") {
        student.present++;
    }

    displayStudents();
}

function deleteStudent(index) {
    students.splice(index, 1);
    displayStudents();
}

function displayStudents() {
    let list = document.getElementById("studentList");
    let search = document.getElementById("search").value.toLowerCase();

    list.innerHTML = "";

    students.forEach((s, i) => {
        if (
            s.name.toLowerCase().includes(search) ||
            s.roll.toLowerCase().includes(search)
        ) {
            let percentage = s.total === 0
                ? 0
                : ((s.present / s.total) * 100).toFixed(2);

            list.innerHTML += `
                <tr>
                    <td>${s.name}</td>
                    <td>${s.roll}</td>
                    <td>
                        <button onclick="markAttendance(${i}, 'Present')">
                            Present
                        </button>
                        <button onclick="markAttendance(${i}, 'Absent')">
                            Absent
                        </button>
                    </td>
                    <td>${percentage}%</td>
                    <td>
                        <button onclick="deleteStudent(${i})">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        }
    });
}
