const alterBox = document.getElementById("alter-box");
const imgBox = document.getElementById("img-box");
const form = document.getElementById("p-form");

const description = document.getElementById("id_description");
const image = document.getElementById("id_image");
const btnBox = document.getElementById("btn-box");

const csrf = document.getElementsByName("csrfmiddlewaretoken");

let mediaURL = window.location.href + "media/";

const btns = [...btnBox.children];
const url = "";

const handleAlerts = (type, text) => {
  alterBox.innerHTML =
    '<div class="alter alter-${type}" role="alter">${text}</div>';
};

image.addEventListener("change", () => {
  const img_data = image.files[0];
  console.log(img_data.name);
  const url = URL.createObjectURL(img_data);
  console.log(url);
  newurl = "media/image/name".replace("name", img_data.name);
  imgBox.innerHTML =
    '<img src="url" style="width:450px;height:450px;">'.replace("url", newurl);
  btnBox.classList.remove("not-visible");
});

let id = null;
let filter = null;
btns.forEach((btn) =>
  btn.addEventListener("click", () => {
    filter = btn.getAttribute("data-filter").toUpperCase();
    console.log(filter.toUpperCase());
  })
);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("data sender su");
  btnBox.hidden = true;
  console.log("data are processing");
  const fd = new FormData();
  fd.append("csrfmiddlewaretoken", csrf[0].value);
  fd.append("name", image.files[0].name);
  fd.append("image", image.files[0]);
  fd.append("action", filter);
  fd.append("id", id);

  $.ajax({
    type: "POST",
    url: url,
    enctype: "multipart/form-data",
    data: fd,
    success: function (response) {
      const data = JSON.parse(response.data);
      console.log(data);
      btnBox.hidden = false;

      afterurl = '<img src="url" style="width=450px;height:450px;">'.replace(
        "url",
        "media/" + data[0].fields.image
      );
      imgBox.innerHTML = afterurl;
      const sText = "Successfully saved ${data[0].fields.name}";
      handleAlerts("success", sText);
      setTimeout(() => {
        alterBox.innerHTML = "";
      }, 3000);
    },
    error: function (error) {
      console.log(error);
      handleAlerts("danger", "ops...somethings wrongs");
    },
    cache: false,
    contentType: false,
    processData: false,
  });
});
