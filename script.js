const storageKey = "ytl-codex-workshop-checklist";
const checkboxes = [...document.querySelectorAll("[data-check]")];
const progressLabel = document.querySelector("#progress-label");
const progressBar = document.querySelector("#progress-bar");
const resetButton = document.querySelector("#reset-checklist");

function loadChecklist() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || {};
  } catch {
    return {};
  }
}

function updateProgress() {
  const checked = checkboxes.filter((checkbox) => checkbox.checked).length;
  progressLabel.textContent = `${checked} of ${checkboxes.length} ready`;
  progressBar.style.width = `${(checked / checkboxes.length) * 100}%`;
}

function saveChecklist() {
  const state = Object.fromEntries(
    checkboxes.map((checkbox) => [checkbox.dataset.check, checkbox.checked]),
  );
  localStorage.setItem(storageKey, JSON.stringify(state));
  updateProgress();
}

const savedChecklist = loadChecklist();
checkboxes.forEach((checkbox) => {
  checkbox.checked = Boolean(savedChecklist[checkbox.dataset.check]);
  checkbox.addEventListener("change", saveChecklist);
});

resetButton.addEventListener("click", () => {
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
  localStorage.removeItem(storageKey);
  updateProgress();
});

document.querySelectorAll("[data-copy-target]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.querySelector(`#${button.dataset.copyTarget}`);
    const label = button.querySelector(".copy-label");
    const prompt = target.textContent.trim();

    const showSuccess = () => {
      button.classList.add("copied");
      label.textContent = "Copied";
      window.setTimeout(() => {
        button.classList.remove("copied");
        label.textContent = "Copy";
      }, 1800);
    };

    const legacyCopy = () => {
      const textarea = document.createElement("textarea");
      textarea.value = prompt;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand("copy");
      textarea.remove();
      return copied;
    };

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(prompt);
      } else if (!legacyCopy()) {
        throw new Error("Copy is unavailable");
      }
      showSuccess();
    } catch {
      if (legacyCopy()) {
        showSuccess();
      } else {
        label.textContent = "Select text";
      }
    }
  });
});

updateProgress();
