function solve() {
    const formRef = document.querySelector("form");
    const taskRef = document.getElementById("task");
    const taskDescRef = document.getElementById("description");
    const dateRef = document.getElementById("date");

    const sectionRef = document.querySelectorAll("section");
    const openRef = sectionRef[1];
    const inProgress = sectionRef[2];
    const completeRef = sectionRef[3];

    formRef.addEventListener("submit", onSubmit);

    function onSubmit(event) {
        event.preventDefault();
        const taskValue = taskRef.value;
        const taskDesc = taskDescRef.value;
        const date = dateRef.value;

        if(!taskDesc || !taskValue || !date){
            return
        }
        let myArticle = createArticle(taskValue, taskDesc, date);
        openRef.children[1].appendChild(myArticle);
        taskRef.value = "";
        taskDescRef.value = ""; 
        dateRef.value = "";
    }

    function createArticle(name, desc, date) {
        let article = document.createElement("article");
        article.innerHTML = `
            <h3>${name}</h3>
            <p>Description: ${desc}</p>
            <p>Due Date: ${date}</p>
            <div class="flex">
                <button class="green">Start</button>
                <button class="red">Delete</button>
            </div>
        `;

        const button = article.querySelectorAll("button");
        const startBtn = button[0];
        const deleteBtn = button[1];
        startBtn.addEventListener("click", moveArticle);
        deleteBtn.addEventListener("click", onDelete);
          
        return article
    }

    function moveArticle(event) {
        const article = event.target.parentElement.parentElement;
        const btns = article.querySelectorAll("button");
        const deleteBtn = btns[0];
        const finishBtn = btns[1];
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.remove("green");
        deleteBtn.classList.add("red");

        finishBtn.textContent = "Finish";
        finishBtn.classList.remove("red");
        finishBtn.classList.add("orange");

        deleteBtn.removeEventListener("click", moveArticle);
        deleteBtn.addEventListener("click", onDelete);

        finishBtn.removeEventListener("click", onDelete);
        finishBtn.addEventListener("click", onFinish);

        inProgress.children[1].appendChild(article);
    }

    function onDelete(event){
        event.target.parentElement.parentElement.remove();
    }

    function onFinish(event) {
        const article = event.target.parentElement.parentElement;
        event.target.parentElement.remove();

        completeRef.children[1].appendChild(article);
    }
}


