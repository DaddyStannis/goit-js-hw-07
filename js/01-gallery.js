import { galleryItems } from "./gallery-items.js";
// Change code below this line
const GALLERY = document.querySelector(".gallery");
showPreviewOfGalleryItems(galleryItems);
GALLERY.addEventListener("click", showOriginalImage);

function showPreviewOfGalleryItems(galleryItems) {
  for (const item of galleryItems) {
    const htmlElement = `
      <div class="gallery__item">
        <a class="gallery__link" href=${item.original}>
          <img
            class="gallery__image"
            src=${item.preview}
            data-source=${item.original}
            alt=${item.description}
          />
        </a>
      </div>
    `;
    GALLERY.insertAdjacentHTML("beforeend", htmlElement);
  }
}

function showOriginalImage(e) {
  if (e.target.nodeName !== "IMG") {
    return;
  }
  e.preventDefault();

  const instance = basicLightbox.create(
    `<img src="${e.target.dataset["source"]}">`,
    {
      onShow: (instance) => {
        document.addEventListener("keydown", eventHandler);
      },
      onClose: (instance) => {
        document.removeEventListener("keydown", eventHandler);
      },
    }
  );

  instance.show();

  function eventHandler(event) {
    if (event.key === "Escape") {
      instance.close();
    } else if (event.key === "ArrowRight") {
      const image = document.querySelector(".basicLightbox__placeholder>img");
      const sources = galleryItems.map((img) => img.original);
      const imageIndex = sources.findIndex((src) => src === image.src);
      image.src = sources[imageIndex < sources.length - 1 ? imageIndex + 1 : 0];
    } else if (event.key === "ArrowLeft") {
      const image = document.querySelector(".basicLightbox__placeholder>img");
      const sources = galleryItems.map((img) => img.original);
      const imageIndex = sources.findIndex((src) => src === image.src);
      image.src = sources[imageIndex > 0 ? imageIndex - 1 : sources.length - 1];
    }
  }
}
