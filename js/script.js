function saveUserSession(userData) {
  localStorage.setItem("sr_ai_job_hunter_user", JSON.stringify(userData));
}

function getUserSession() {
  const user = localStorage.getItem("sr_ai_job_hunter_user");
  return user ? JSON.parse(user) : null;
}

function logoutUser() {
  localStorage.removeItem("sr_ai_job_hunter_user");
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");
  const resumeForm = document.getElementById("resumeForm");

  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("signupName").value.trim();
      const email = document.getElementById("signupEmail").value.trim();
      const mobile = document.getElementById("signupMobile").value.trim();
      const password = document.getElementById("signupPassword").value.trim();

      const userData = {
        name,
        email,
        mobile,
        password,
        plan: "Monthly Support"
      };

      localStorage.setItem("sr_ai_job_hunter_registered_user", JSON.stringify(userData));
      saveUserSession(userData);
      alert("Account created successfully!");
      window.location.href = "dashboard.html";
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("loginName").value.trim();
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();

      const registered = localStorage.getItem("sr_ai_job_hunter_registered_user");

      if (!registered) {
        alert("No account found. Please create account first.");
        window.location.href = "signup.html";
        return;
      }

      const userData = JSON.parse(registered);

      if (email === userData.email && password === userData.password) {
        saveUserSession(userData);
        alert("Login successful!");
        window.location.href = "dashboard.html";
      } else if (name === userData.name && email === userData.email) {
        saveUserSession(userData);
        alert("Demo login successful!");
        window.location.href = "dashboard.html";
      } else {
        alert("Invalid login details.");
      }
    });
  }

  const userName = document.getElementById("userName");
  const userEmail = document.getElementById("userEmail");

  if (userName || userEmail) {
    const currentUser = getUserSession();
    if (!currentUser) {
      window.location.href = "login.html";
      return;
    }

    if (userName) userName.textContent = currentUser.name || "User";
    if (userEmail) userEmail.textContent = currentUser.email || "demo@email.com";
  }

  if (resumeForm) {
    resumeForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const preferredRole = document.getElementById("preferredRole").value.trim();
      const skills = document.getElementById("skillsBox").value.trim();

      const resumeData = {
        preferredRole,
        skills
      };

      localStorage.setItem("sr_ai_job_hunter_resume_data", JSON.stringify(resumeData));

      const status = document.getElementById("resumeStatus");
      status.classList.remove("hidden");
    });
  }
});

function showPaymentMessage() {
  const box = document.getElementById("paymentSuccess");
  if (box) {
    box.classList.remove("hidden");
  }
}