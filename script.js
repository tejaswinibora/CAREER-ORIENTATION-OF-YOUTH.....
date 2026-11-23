/* PAGE NAVIGATION */

function goToPage(pageId) {

    // Restrict protected pages without login
    const protectedPages = ["coursePage", "careerPage", "thankPage"];

    if (protectedPages.includes(pageId) && !getLoggedInUser()) {
        alert("Please login first!");
        pageId = "loginPage";
    }

    document.querySelectorAll(".page").forEach(function(page) {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");

    window.scrollTo(0, 0);
}


/* USER STORAGE */

function getUsers() {
    return JSON.parse(localStorage.getItem("careerUsers") || "[]");
}

function getLoggedInUser() {
    return localStorage.getItem("careerLoggedIn");
}


/* REGISTRATION */

document.getElementById("registerForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim().toLowerCase();
    const phone = document.getElementById("regPhone").value.trim();
    const password = document.getElementById("regPassword").value;

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Enter a valid 10 digit mobile number.");
        return;
    }

    let users = getUsers();

    const existingUser = users.find(function(user) {
        return user.email === email;
    });

    if (existingUser) {
        alert("This email is already registered. Please login.");
        goToPage("loginPage");
        return;
    }

    const newUser = {
        name: name,
        email: email,
        phone: phone,
        password: password
    };

    users.push(newUser);

    localStorage.setItem("careerUsers", JSON.stringify(users));

    alert("Registration successful! Please login.");

    document.getElementById("registerForm").reset();

    document.getElementById("loginEmail").value = email;

    goToPage("loginPage");

});


/* LOGIN */

document.getElementById("loginForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    const users = getUsers();

    const user = users.find(function(item) {
        return item.email === email && item.password === password;
    });

    if (!user) {
        alert("Invalid email or password!");
        return;
    }

    localStorage.setItem("careerLoggedIn", user.email);

    document.getElementById("loginForm").reset();

    alert("Login successful!");

    goToPage("coursePage");

});


/* CAREER DATABASE */

const careerData = {

    Engineering: {
        course: "BE / BTech",
        jobs: "Software Engineer, Civil Engineer, Mechanical Engineer, Electrical Engineer",
        years: "4 Years",
        package: "Approx. ₹3–8 LPA (entry-level, varies)"
    },

    MBA: {
        course: "Master of Business Administration",
        jobs: "Business Analyst, HR Manager, Marketing Manager, Business Development Executive",
        years: "2 Years",
        package: "Approx. ₹3–8 LPA (entry-level, varies)"
    },

    BCS: {
        course: "Bachelor of Computer Science",
        jobs: "Software Developer, Data Analyst, IT Support, Web Developer",
        years: "3 Years (course-dependent)",
        package: "Approx. ₹3–6 LPA (entry-level, varies)"
    },

    BCA: {
        course: "Bachelor of Computer Applications",
        jobs: "Web Developer, Software Developer, IT Support",
        years: "3–4 Years (course-dependent)",
        package: "Approx. ₹3–6 LPA (entry-level, varies)"
    },

    Pharmacy: {
        course: "Bachelor of Pharmacy",
        jobs: "Pharmacist, Quality Control Assistant, Pharmaceutical Research Assistant",
        years: "4 Years",
        package: "Approx. ₹2.5–5 LPA (entry-level, varies)"
    },

    Law: {
        course: "BA LLB",
        jobs: "Advocate, Legal Associate, Legal Advisor",
        years: "5 Years",
        package: "Varies by role, employer and experience"
    },

    BBA: {
        course: "Bachelor of Business Administration",
        jobs: "HR Executive, Marketing Executive, Business Analyst",
        years: "3–4 Years (course-dependent)",
        package: "Approx. ₹3–6 LPA (entry-level, varies)"
    },

    BCom: {
        course: "Bachelor of Commerce",
        jobs: "Accountant, Finance Executive, Banking Assistant",
        years: "3–4 Years (course-dependent)",
        package: "Approx. ₹2.5–5 LPA (entry-level, varies)"
    },

    BA: {
        course: "Bachelor of Arts",
        jobs: "Content Writer, Research Assistant, Public Relations Assistant",
        years: "3–4 Years (course-dependent)",
        package: "Approx. ₹2.5–5 LPA (entry-level, varies)"
    },

    BSc: {
        course: "Bachelor of Science",
        jobs: "Lab Assistant, Research Assistant, Science-related roles",
        years: "3–4 Years (course-dependent)",
        package: "Approx. ₹2.5–5 LPA (entry-level, varies)"
    },

    Architecture: {
        course: "Bachelor of Architecture",
        jobs: "Architect, Interior Designer, Design Assistant",
        years: "5 Years",
        package: "Approx. ₹3–6 LPA (entry-level, varies)"
    },

    Journalism: {
        course: "Journalism and Mass Communication",
        jobs: "Reporter, Journalist, Content Writer, Media Assistant",
        years: "3–4 Years (course-dependent)",
        package: "Approx. ₹2.5–5 LPA (entry-level, varies)"
    },

    Design: {
        course: "Design",
        jobs: "Graphic Designer, UI Designer, Creative Designer",
        years: "3–4 Years (course-dependent)",
        package: "Approx. ₹3–6 LPA (entry-level, varies)"
    },

    CA: {
        course: "Chartered Accountancy",
        jobs: "Chartered Accountant, Auditor, Tax Consultant",
        years: "Usually 4–5+ Years, depending on progress",
        package: "Varies by qualification, role and experience"
    }

};


/* CAREER SELECTION */

let selectedCareer = "";

function showCareer() {

    if (!getLoggedInUser()) {
        alert("Please login first!");
        goToPage("loginPage");
        return;
    }

    selectedCareer = document.getElementById("courseSelect").value;

    if (!selectedCareer) {
        alert("Please select a course!");
        return;
    }

    const data = careerData[selectedCareer];

    if (!data) {
        alert("Career information not available.");
        return;
    }

    const output = document.getElementById("careerOutput");

    output.innerHTML = `

        <div class="career-box">

            <h3>${data.course}</h3>

            <div class="info-box">
                <h4>💼 Job Opportunities</h4>
                <p>${data.jobs}</p>
            </div>

            <div class="info-box">
                <h4>📚 Course Duration</h4>
                <p>${data.years}</p>
            </div>

            <div class="info-box">
                <h4>💰 Expected Package</h4>
                <p>${data.package}</p>
            </div>

        </div>

    `;

    goToPage("careerPage");

}


/* THANK YOU PAGE */

function showThankYou() {

    const email = getLoggedInUser();

    const user = getUsers().find(function(item) {
        return item.email === email;
    });

    document.getElementById("thankMessage").textContent =
        user ? "Thank you " + user.name + "!" : "Thank you for visiting.";

    goToPage("thankPage");

}


/* LOGOUT */

function logout() {

    localStorage.removeItem("careerLoggedIn");

    selectedCareer = "";

    document.getElementById("courseSelect").value = "";

    document.getElementById("careerOutput").innerHTML = "";

    alert("You have logged out.");

    goToPage("home");

}


/* RESTRICT ACCESS WHEN NOT LOGGED IN */

document.querySelectorAll(".protected").forEach(function(section) {

    section.addEventListener("click", function() {

        if (!getLoggedInUser()) {
            goToPage("loginPage");
        }

    });

});


/* FINISH BUTTON */

document.querySelector("#careerPage button")
.addEventListener("click", function() {

    showThankYou();

});


/* REMEMBER LOGIN ON REFRESH */

window.addEventListener("load", function() {

    if (getLoggedInUser()) {
        goToPage("coursePage");
    } else {
        goToPage("home");
    }

});