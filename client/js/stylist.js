async function initClients() {
  try {
    const jsonString = localStorage.getItem("UserData");
    const dataObject = JSON.parse(jsonString);
    console.log("Parsed Object:", dataObject);
    const userId = dataObject.UserID;
    const response = await fetch(`http://localhost:8081/stylist/${userId}`);
    const clients = await response.json();
    clients.forEach((client) => {
     initWardrobesOfClients(client.client_id);
    });
  } catch (error) {
    console.error("Failed to fetch clients:", error);
  }
}
const initWardrobesOfClients = async (userId) => {
  const res = await fetch(
    `http://localhost:8081/wardrobe/all/${userId}`
  );
  const wardrobes = await res.json();
  localStorage.setItem("wardrobesOfUser", JSON.stringify(wardrobes));
  wardrobes.forEach((wardrobe) => {
    createWardrobeCard(
      wardrobe.wardrobe_name,
      wardrobe.items,
      wardrobe.looks,
      wardrobe.readytowear,
      wardrobe.wardrobe_code
    );
  });
};

function initUserDetails() {
  const jsonString = localStorage.getItem("UserData");
  const dataObject = JSON.parse(jsonString);
  const userImg = document.getElementById("userImg_Name");
  const userName = document.getElementById("userName");
  userImg.src = dataObject.userImgUrl;
  userName.innerText = `${dataObject.userFirstName} ${dataObject.userLastName}`;
}
function createWardrobeCard(
  wardrobeName,
  clothesNumber,
  outfitsNumber,
  readyToWearPercentage,
  wardrobeCode
) {
  const wardrobeCard = document.createElement("div");
  wardrobeCard.classList.add("wardrobe-card", "wardrobe-card-fully");
  const buttonWardrobeTitle = document.createElement("button");
  buttonWardrobeTitle.classList.add("empty-button");
  const nameHeader = document.createElement("h3");
  nameHeader.classList.add("wardrobe-name");
  nameHeader.textContent = wardrobeName;
  buttonWardrobeTitle.appendChild(nameHeader);
  const clothesNumberHeader = createHeader(`Items - ${clothesNumber}`, [
    "clothes-number",
    "cards-write",
  ]);
  const outfitsNumberHeader = createHeader(`Looks - ${outfitsNumber}`, [
    "outfits-number",
    "cards-write",
  ]);
  const readyToWearHeader = document.createElement("h5");
  readyToWearHeader.classList.add("ready-to-wear");
  readyToWearHeader.textContent = "Ready to wear ";
  const readyToWearSpan = document.createElement("span");
  readyToWearSpan.classList.add("ready-to-wear-dont-bold", "ready-to-wear");
  readyToWearSpan.textContent = readyToWearPercentage + "%";
  readyToWearHeader.appendChild(readyToWearSpan);
  wardrobeCard.appendChild(buttonWardrobeTitle);
  wardrobeCard.appendChild(clothesNumberHeader);
  wardrobeCard.appendChild(outfitsNumberHeader);
  wardrobeCard.appendChild(readyToWearHeader);
  const myWardRobesSection = document.getElementById("my-wardRobes");
  myWardRobesSection.appendChild(wardrobeCard);
  buttonWardrobeTitle.addEventListener("click", function (event) {
    const wardrobeCode1 = JSON.stringify(wardrobeCode);
    localStorage.setItem("currentWardrobeCode", wardrobeCode1);
    localStorage.setItem("currentWardrobeName", wardrobeName);
    const cursorStyle = getComputedStyle(event.target).cursor;
    if (cursorStyle === "pointer") {
      window.location.href = "wardrobe.html";
    }
  });
}