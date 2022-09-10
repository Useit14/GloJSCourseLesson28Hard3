/* eslint-disable indent */
const input = document.querySelector(".form__input");
const form = document.querySelector("#form");
const btnBack = document.querySelector("#btn-back");
let isTo = true;

const getData = (formData) => {
  const formBody = {};
  for (let [name, value] of formData) {
    formBody[name] = parseInt(value) ? +value : value;
  }

  const myHeaders = new Headers();
  myHeaders.append("apikey", "oFFRlLZ75b0HA7TGNLRo0SFrZESvWhXa");

  const requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  return fetch(
    `https://api.apilayer.com/currency_data/convert?to=${
      isTo ? formBody.selectTo : formBody.selectFrom
    }&from=${isTo ? formBody.selectFrom : formBody.selectTo}&amount=${
      formBody.amount
    }`,
    requestOptions
  ).then((response) => response.json());
};

const hideAllResponseBlocks = () => {
  const responseBlocksArray = Array.from(
    document.querySelectorAll("div.dialog__response-block")
  );
  responseBlocksArray.forEach((block) => (block.style.display = "none"));
};
const showResponseBlock = (blockSelector, msgText, spanSelector) => {
  hideAllResponseBlocks();
  document.querySelector(blockSelector).style.display = "block";
  if (spanSelector) {
    document.querySelector(spanSelector).textContent = msgText;
  }
};
const showError = (msgText) =>
  showResponseBlock(".dialog__response-block_error", msgText, "#error");
const showResults = (msgText) =>
  showResponseBlock(".dialog__response-block_ok", msgText, "#ok");
const showNoResults = () =>
  showResponseBlock(".dialog__response-block_no-results");

const changeСurrency = () => {
  const selectTo = document.querySelector("#to");
  const selectFrom = document.querySelector("#from");

  const bound = document.querySelector("#bound");
  bound.before(isTo ? selectFrom : selectTo);
  bound.after(isTo ? selectTo : selectFrom);
};

if (form) {
  form.addEventListener("submit", (e) => {
    if (input.value === "") {
      showNoResults();
    } else {
      const formData = new FormData(form);
      e.preventDefault();
      getData(formData)
        .then((data) => showResults(data.result))
        .catch((error) => showError(error));
    }
  });

  if (btnBack) {
    btnBack.addEventListener("click", (e) => {
      e.preventDefault();
      isTo = !isTo;
      changeСurrency();
    });
  }
}
