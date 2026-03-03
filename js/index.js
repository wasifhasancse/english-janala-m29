// get lesson button API data 
const lessonButtonSection = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((getButton) => getButton.json())
    .then((getButtonJson) => showButton(getButtonJson.data));
};

// get lesson button container and show lesson button
const showButton = (getButtonJson) => {
  const lessenButtonContainer = document.getElementById("lessons-button");
  getButtonJson.forEach((buttonData) => {
    const createButton = document.createElement("div");
    // createButton.classList = "btn btn-outline btn-primary group";
    createButton.innerHTML = `
    <button onclick="" class="btn btn-outline btn-primary group">
    <img class="group-hover:invert"
      src="./assets/fa-book-open.png" alt="fa-book-open"> Lesson - ${buttonData.level_no}
    </button>`;
    lessenButtonContainer.append(createButton);
  });
};
lessonButtonSection();
