const champWrapper = document.querySelector(".champ-wrapper");
const searchInput = document.querySelector(".search");
const menuBtn = document.querySelector(".menu");
const favorite = document.querySelector(".favorite");
const body = document.querySelector("body");
const clearBtn = document.querySelector(".clear");
const popup = document.querySelector(".popup");
const popupText = document.querySelector(".popup-text");

function getData() {
  fetch(
    "http://ddragon.leagueoflegends.com/cdn/11.23.1/data/tr_TR/champion.json"
  )
    .then((res) => res.json())
    .then((res) => {
      const name = Object.values(res.data);
      for (let x = 0; x < name.length; x++) {
        champWrapper.innerHTML += `
        <div class='champ'>
          <img src="http://ddragon.leagueoflegends.com/cdn/11.22.1/img/champion/${
            name[x].id
          }.png" alt="">
          <h1 class='name'>${name[x].id}</h1>
          <p class='title'>${name[x].title}</p>
          <p class='blurb'>${name[x].blurb}</p>
          <p class='tag'>${name[x].tags}</p>
          <i class="fas fa-star star" data-id="${[x + 1]}"></i>
        </div>
        `;
      }

      searchInput.addEventListener("input", () => {
        const champNames = document.querySelectorAll(".name");
        const search = searchInput.value.toLowerCase();
        champNames.forEach((champName) => {
          champName.parentElement.style.display = "flex";
          if (!champName.innerHTML.toLowerCase().includes(search)) {
            champName.parentElement.style.display = "none";
          }
        });
      });

      function startConf() {
        const champs = JSON.parse(localStorage.getItem("champs"));
        if (!champs) {
          localStorage.setItem("champs", JSON.stringify([]));
        } else {
          champs.forEach((champ) => {
            addHTML(champ);
          });
        }
      }

      startConf();

      function addHTML(champ) {
        const wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");

        wrapper.addEventListener("click", (e) => {
          const text = e.currentTarget.children[1].children[0].textContent;
          let champs = JSON.parse(localStorage.getItem("champs"));
          champs = champs.filter((cp) => cp.champ != text);

          localStorage.setItem("champs", JSON.stringify(champs));
          e.currentTarget.remove();
        });

        const favWrapper = document.querySelector(".favorite-champ-wrapper");

        const img = document.createElement("img");
        img.src = champ.img;

        const texts = document.createElement("div");
        texts.classList.add("texts");

        const name = document.createElement("h1");
        name.classList.add("name");
        name.textContent = champ.champ;

        const title = document.createElement("p");
        title.classList.add("title");
        title.textContent = champ.title;

        const tag = document.createElement("p");
        tag.classList.add("tag");
        tag.textContent = champ.tag;

        texts.append(name);
        texts.append(title);
        texts.append(tag);
        wrapper.append(img);
        wrapper.append(texts);
        favWrapper.append(wrapper);
        favorite.append(favWrapper);
      }

      const stars = document.querySelectorAll(".star");
      stars.forEach((star) => {
        star.addEventListener("click", (e) => {
          const name = e.currentTarget.parentElement.children[1].textContent;
          const img = e.currentTarget.parentElement.children[0].src;
          const title = e.currentTarget.parentElement.children[2].textContent;
          const tag = e.currentTarget.parentElement.children[4].textContent;
          e.currentTarget.classList.toggle("fav");
          const favTitle = document.querySelector(".favTitle");
          favTitle.style.display = "none";
          clearBtn.style.display = "flex";

          // favWrapper.innerHTML += `
          // <div class='wrapper'>
          //   <img src="${img}" alt="">
          //   <div class='texts'>
          //     <h1 class='name'>${name}</h1>
          //     <p class='title'>${title}</p>
          //     <p class='tag'>${tag}</p>
          //   </div>
          // </div
          // `;

          if (localStorage.champs.includes(name)) {
            const favText = document.createElement("p");
            favText.classList.add("popup-text");
            favText.innerHTML = `${name} zaten kayıtlı`;
            popup.append(favText);
            favText.style.backgroundColor = "tomato";
            setTimeout(() => {
              favText.remove();
            }, 1500);
          } else {
            const wrapper = document.createElement("div");
            wrapper.classList.add("wrapper");

            wrapper.addEventListener("click", (e) => {
              const text = e.currentTarget.children[1].children[0].textContent;
              e.currentTarget.remove();
              let champs = JSON.parse(localStorage.getItem("champs"));
              champs = champs.filter((cp) => cp.text != text);
              localStorage.setItem("champs", JSON.stringify(champs));
            });

            const favWrapper = document.querySelector(
              ".favorite-champ-wrapper"
            );

            const imgDiv = document.createElement("img");
            imgDiv.src = img;

            const texts = document.createElement("div");
            texts.classList.add("texts");

            const nameDiv = document.createElement("h1");
            nameDiv.classList.add("name");
            nameDiv.textContent = name;

            const titleDiv = document.createElement("p");
            titleDiv.classList.add("title");
            titleDiv.textContent = title;

            const tagDiv = document.createElement("p");
            tagDiv.classList.add("tag");
            tagDiv.textContent = tag;

            wrapper.append(imgDiv);
            wrapper.append(texts);
            texts.append(nameDiv);
            texts.append(titleDiv);
            texts.append(tagDiv);
            favWrapper.append(wrapper);

            const champ = {
              img: img,
              champ: name,
              title: title,
              tag: tag,
            };

            const champs = JSON.parse(localStorage.getItem("champs"));
            champs.push(champ);
            localStorage.setItem("champs", JSON.stringify(champs));

            const favText = document.createElement("p");
            favText.classList.add("popup-text");
            favText.innerHTML = `${name} başarıyla kaydedildi`;
            popup.append(favText);
            setTimeout(() => {
              favText.remove();
            }, 1500);
          }
        });
      });

      menuBtn.addEventListener("click", () => {
        favorite.classList.toggle("active");
        const wrapper = document.querySelectorAll(".wrapper");
        const favWrapper = document.querySelector(".favorite-champ-wrapper");
        const favTitle = document.querySelector(".favTitle");
        if (!favWrapper.innerHTML.includes("div")) {
          favTitle.style.display = "block";
        } else {
          favTitle.style.display = "none";
        }
        if (wrapper.length === 0) {
          clearBtn.style.display = "none";
        } else {
          clearBtn.style.display = "flex";
        }
        if (favorite.classList.contains("active")) {
          body.style.overflow = "hidden";
        } else {
          body.style.overflow = "auto";
        }
      });

      clearBtn.addEventListener("click", (favWrapper) => {
        favWrapper.innerHTML = "";
        localStorage.removeItem("champs");
        window.location.reload();
      });
    });
}

getData();
