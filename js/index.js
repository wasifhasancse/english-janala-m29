// get lesson button API data
const lessonButtonSection = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((getButton) => getButton.json())
    .then((getButtonJson) => showButton(getButtonJson.data));
};

// get word details modal section
const getWordDetails = (wordId) => {
  fetch(`https://openapi.programming-hero.com/api/word/${wordId}`)
    .then((wordDetails) => wordDetails.json())
    .then((wordDetailsJson) => showWordDetails(wordDetailsJson.data)
    );
};

// show similar Word 
const getSimilarWord = (similarWords) => {
  const similarWordContainer = similarWords.map((similarWord) => `<span class="btn btn-soft btn-primary">${similarWord}</span>`);
  return similarWordContainer.join(" ");
};

// show word details modal section
const showWordDetails = (wordDetailsData) => {
  const modalDetailsContainer = document.getElementById("modal-details");
  modalDetailsContainer.innerHTML = " ";
  const modalDetails = document.createElement("div");
  modalDetails.className = "space-y-5";
  modalDetails.innerHTML = `
  <h2 class="text-2xl font-bold">${wordDetailsData.word} (<i class="fa-solid fa-microphone-lines"></i> : <span class="font-bangla">${wordDetailsData.pronunciation}</span> )</h2>
        <div>
          <h3 class="font-semibold text-lg">Meaning</h3>
          <p class="font-medium pt-1 font-bangla text-lg">${wordDetailsData.meaning}</p>
        </div>
        <div>
          <h3 class="font-semibold text-lg">Example</h3>
          <p class="font-medium pt-1">${wordDetailsData.sentence}</p>
        </div>
        <div>
          <h3 class="font-semibold text-lg font-bangla">সমার্থক শব্দ গুলো</h3>
          <div id="similar-word">${getSimilarWord(wordDetailsData.synonyms)}</div>
        </div>
  `;
  modalDetailsContainer.append(modalDetails);
  wordDetailsModal.showModal();
};

// remove Lesson Active Button
const removeLessonActiveButton = () => {
  const lessonAllButton = document.querySelectorAll(".lesson-button");
  lessonAllButton.forEach((element) => {
    element.classList.remove("active");
  });
};

// get clicked lesson button word data
const getWordLevel = (lessonButtonId) => {
  fetch(`https://openapi.programming-hero.com/api/level/${lessonButtonId}`)
    .then((getWordData) => getWordData.json())
    .then((getWordDataJson) => {
      removeLessonActiveButton();
      const getLessonActiveButton = document.getElementById(
        `lesson-button-${lessonButtonId}`,
      );
      getLessonActiveButton.classList.add("active");
      showWordData(getWordDataJson.data);
    });
};

// show clicked lesson button word data
const showWordData = (getWordData) => {
  const wordDataCardContainer = document.getElementById("lesson-word-show");
  wordDataCardContainer.innerHTML = "";

  // show empty message
  if (getWordData.length == 0) {
    const emptyMessage = document.createElement("div");
    emptyMessage.classList =
      "col-span-full bg-base-300 py-20 w-11/12 mx-auto rounded-xl flex flex-col items-center justify-center text-center gap-5";
    emptyMessage.innerHTML = `

        <img class="mx-auto" src="./assets/alert-error.png" alt="alert-error">
        <p class="font-bangla text-md md:text-lg text-gray-600">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <p class="font-bangla text-xl md:text-4xl font-semibold">
          নেক্সট Lesson এ যান
        </p>`;
    wordDataCardContainer.append(emptyMessage);
    return;
  }

  // show word list
  getWordData.forEach((wordData) => {
    const wordDataCard = document.createElement("div");
    wordDataCard.classList = "bg-base-200 p-10 space-y-10 rounded-lg mx-auto";
    wordDataCard.innerHTML = `
    <div class="text-center space-y-3.5">
          <h2 class="font-bold text-3xl">${wordData.word ? wordData.word : "Word পাওয়া যায় নি"}</h2>
          <p class="font-medium text-lg">Meaning / Pronounciation</p>
          <p class="font-bangla font-semibold text-2xl text-gray-600">${wordData.meaning ? wordData.meaning : "Meaning পাওয়া যায় নি"} / ${wordData.pronunciation ? wordData.pronunciation : "Pronunciation পাওয়া যায় নি"}</p>
        </div>
        <div class="flex items-center justify-between">
          <button onclick="getWordDetails(${wordData.id})" class="btn btn-soft btn-primary text-xl"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn btn-soft btn-primary text-xl"><i class="fa-solid fa-volume-high"></i></button>
        </div>
    `;
    wordDataCardContainer.append(wordDataCard);
  });
};

// get lesson button container and show lesson button
const showButton = (getButtonJson) => {
  const lessenButtonContainer = document.getElementById("lessons-button");
  getButtonJson.forEach((buttonData) => {
    const createButton = document.createElement("div");
    // createButton.classList = "btn btn-outline btn-primary group";
    createButton.innerHTML = `
    <button id="lesson-button-${buttonData.level_no}" onclick="getWordLevel(${buttonData.level_no})" class="btn btn-outline btn-primary lesson-button">
    <i class="fa-solid fa-book-open"></i> Lesson - ${buttonData.level_no}
    </button>`;
    lessenButtonContainer.append(createButton);
  });
};
lessonButtonSection();
