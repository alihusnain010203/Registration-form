const degree = document.getElementById("degree");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const semester = document.getElementById("semester");
const table_body = document.getElementById("tbody");
const submitButton = document.getElementById("btn");
const booksDiv = document.getElementById('books');
const bookList = document.getElementById('bookList');
const tableData = [];
let number=0;
const bookData={
    BSCS:['MATH','OS','DB'],
    BSIT:['STAT','PHYSICS','ENGLISH'],
    BSSE:['OOP','DSA','Internet Programming'],
}

const rollNoGenerator = (degree, name, semester) => {
    let roll = `${degree}-${name}-${semester}-${number}`;
    number++;
    console.log(roll);
    return roll;
};;
degree.addEventListener("change",()=>{
        booksDiv.style.display = 'block';
        bookList.innerHTML = '';

        console.log(bookData[degree.value]);
        bookData[degree.value].forEach(book => {
            const checkbox = document.createElement('input');
           checkbox.type = 'checkbox';
            checkbox.name = 'selectedBooks';
            checkbox.value = book;


            const label = document.createElement('label');
            label.textContent = book;
            label.appendChild(checkbox);

            bookList.appendChild(label);
            
        });
})
const submitForm = () => {
  if (
    degree.value !== "" &&
    firstName !== "" &&
    lastName !== "" &&
    email !== "" &&
    semester !== ""
  ) {
    tableData.unshift({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      degree: degree.value,
      semester: semester.value,
    });

    table_body.innerHTML = "";

    alert(`Student Registered ${new Date().toLocaleString()}`);

    tableData.forEach((item, index) => {
      let row = document.createElement("tr");
      row.innerHTML = `
                <td>${item.firstName} ${item.lastName}</td>
                <td>${item.email}</td>
                <td>${rollNoGenerator(item.degree,item.firstName,item.semester)}</td>
                <td>
                        <button class='delete-btn'>🧺Delete</button>
                        <button class='edit-btn'>📝Edit</button>
                        <button class='ok-btn'>✅OK</button>
                </td>`;

      row.querySelector(".delete-btn").addEventListener("click", () => {
        tableData.splice(index, 1);
        table_body.removeChild(row);
      });

      row.querySelector(".edit-btn").addEventListener("click", () => {
        const cells = row.querySelectorAll("td");
        cells.forEach((cell) => {
            if(cell.textContent!=='🧺Delete' && cell.textContent!=='📝Edit' && cell.textContent!=='📝OK'){
                cell.contentEditable = true;
            }
          
        });
      });

      row.querySelector('.ok-btn').addEventListener('click',()=>{
        const cells = row.querySelectorAll("td");
        cells.forEach((cell) => {
          cell.contentEditable = false;
        });
      })
      table_body.appendChild(row);
      degree.value = "";
      firstName.value = "";
      lastName.value = "";
      semester.value = "";
      email.value = "";
      booksDiv.style.display = 'none';
    });
  } else {
    alert("Fill all Fields");
  }
};

submitButton.addEventListener("click", submitForm);
