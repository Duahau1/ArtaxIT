// JS file for dashboard.html

// log_out
function logOut() {
  localStorage.clear();
  window.location.href = "../index.html";
}

function removeList() {
  const removeElements = (elms) => elms.forEach((el) => el.remove());
  removeElements(document.querySelectorAll(".item_benefit"));
}

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// populating dashboard with data
// Handler when the DOM is fully loaded
let careBasic_benefits = [
  "Basic Troubleshooting",
  "Windows/iMac",
  "Remote Desktop",
  "Installation of AntiVirus",
  "Virus, Malware & Spyware Removal",
];

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("token")) {
    getData();
  } else {
    localStorage.clear();
    window.location.href = "../index.html";
  }
});

//dashboard.html view

function getData() {
  //Subscription and trouble ticket section
  fetch("https://mcval.herokuapp.com/dashboard", {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.subscription.status == "good") {
        //populating  view subscription overview items

        if (data.subscription.planName == "none") {
          document.getElementById("c-plan").innerHTML = "None";
          document.getElementById("p-plan").innerHTML = "$0.00";
          document.getElementById("n-billing").innerHTML = "";

          for (
            let i = 0;
            i < suggestion_b.length /*&& data.subscription.planName != "none"*/;
            i++
          ) {
            let child = document.createElement("li");
            child.innerHTML = suggestion_b[i];
            child.dataset.name = suggestion_b[i];
            child.setAttribute("class", "item_benefit");
            document.getElementById("plan_benefits").appendChild(child);
          }
        } else if (
          data.subscription.planName == "careBasic" &&
          data.subscription.planName != null
        ) {
          document.getElementById("c-plan").innerHTML =
            data.subscription.planName;
          document.getElementById("p-plan").innerHTML = plan_p[0];
          document.getElementById("n-billing").innerHTML =
            data.subscription.next_billing_day;

          for (
            let i = 0;
            i < careBasic_b.length /*&& data.subscription.planName != "none"*/;
            i++
          ) {
            let child = document.createElement("li");
            child.innerHTML = careBasic_b[i];
            child.dataset.name = careBasic_b[i];
            child.setAttribute("class", "item_benefit");
            document.getElementById("plan_benefits").appendChild(child);
          }
        } else if (data.subscription.planName == "carePlus") {
          document.getElementById("c-plan").innerHTML =
            data.subscription.planName;
          document.getElementById("p-plan").innerHTML = plan_p[1];
          document.getElementById("n-billing").innerHTML =
            data.subscription.next_billing_day;

          for (
            let i = 0;
            i < carePlus_b.length && data.subscription.planName != "none";
            i++
          ) {
            let child = document.createElement("li");
            child.innerHTML = carePlus_b[i];
            child.dataset.name = carePlus_b[i];
            child.setAttribute("class", "item_benefit");
            document.getElementById("plan_benefits").appendChild(child);
          }
        } else if (data.subscription.planName == "carePro") {
          document.getElementById("c-plan").innerHTML =
            data.subscription.planName;
          document.getElementById("p-plan").innerHTML = plan_p[2];
          document.getElementById("n-billing").innerHTML =
            data.subscription.next_billing_day;

          for (
            let i = 0;
            i < carePro_b.length && data.subscription.planName != "none";
            i++
          ) {
            let child = document.createElement("li");
            child.innerHTML = carePro_b[i];
            child.dataset.name = carePro_b[i];
            child.setAttribute("class", "item_benefit");
            document.getElementById("plan_benefits").appendChild(child);
          }
        }
      }

      if (data.trouble_ticket.ticket.length > 0) {
        var last = data.trouble_ticket.ticket.length - 1;
        document.getElementById("tid").innerHTML =
          data.trouble_ticket.ticket[last].issue;
        document.getElementById("tdescription").innerHTML =
          data.trouble_ticket.ticket[last].description;
        if (!data.trouble_ticket.ticket[last].status == 0)
          document.getElementById("tstatus").innerHTML = "Open";
        else document.getElementById("tstatus").innerHTML = "Close";
      } else if (!data.trouble_ticket.ticket.length > 0) {
        document.getElementById("tid").innerHTML = "None";
        document.getElementById("tdescription").innerHTML = "None";
        document.getElementById("tstatus").innerHTML = "N/A";
      } else {
        console.log(data.message);
      }
    });
}
