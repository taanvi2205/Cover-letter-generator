document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("coverLetterForm");
  const downloadBtn = document.getElementById("downloadDocxBtn");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        jobTitle: document.getElementById("jobTitle").value,
        company: document.getElementById("company").value,
        jobDesc: document.getElementById("jobDesc").value
      };

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      document.getElementById("cover_letter").value = result.cover_letter;
      document.getElementById("result").classList.remove("hidden");
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener("click", async () => {
      const coverLetterContent = document.getElementById("cover_letter").value;

      const response = await fetch("/download_docx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cover_letter: coverLetterContent })
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Cover_Letter.docx";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
});
