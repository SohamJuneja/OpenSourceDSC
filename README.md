# OpenSourceDSC

<br>

<p align="center">
    <img src="https://gdscjgec.github.io/assets/logo.png" alt="logo">
</p>
Hey there!

Welcome to **OpenSourceDSC**, a friendly and beginner-friendly repository created by the Developer Student Club (DSC) at NIT Hamirpur!

Whether you're here to make your very first open source contribution or just looking to have some fun collaborating with fellow students — you're in the right place.

---

## What is this repo for?

This repo is a playground for:

- Learning how to contribute to open source.
- Understanding Git and GitHub basics.
- Building confidence by making pull requests.
- Collaborating with a supportive community.

---

## How to contribute?

Follow these easy steps:

1. **Fork** this repository.
2. **Clone** your fork.

```bash
git clone https://github.com/SohamJuneja/OpenSourceDSC.git
```

3. Add your name, a fun fact, or anything cool you want to share in the `contributors.md` file.
4. **Commit** your changes.

```bash
git add .
git commit -m "Added my contribution"
```

5. **Push** it!

```bash
git push origin main
```

6. Create a **Pull Request**

---

## Rules and Guidelines

- Be respectful and kind
- Encourage others we're all learning!
- Do not spam PRs. If an issue has been assigned to anyone or a if PR for the issue has already been opened please do not open another PR for the issue
- Feel free to ask questions about the codebase from the mentors. We are here to help you in every way possible so don't hesitate
- Have fun!

---

## Join the DSC Community

Stay updated with all our fun workshops, hackathons, and projects:

- [Follow us on LinkedIn](https://www.linkedin.com/company/dsc-nit-hamirpur/)
- [Whatsapp Community](https://chat.whatsapp.com/InWuiwmPzEE8qh3XUYUWLY)

---

## Final Words

We're so excited to see you contribute! Every step counts, and you're officially part of the open-source family now.

> "The best way to learn is to build, break, fix, and share!"

Happy Contributing!

# Tech Club Website

## Migrating to Tailwind CSS

We are gradually migrating the website from traditional CSS to Tailwind CSS. This improves maintainability and provides a more consistent design system.

### Setup

1. Install dependencies:
```bash
npm install
```

2. Build Tailwind CSS:
```bash
npx tailwindcss -i ./css/tailwind.css -o ./css/styles.tailwind.css
```

3. For development with auto-refresh:
```bash
npm run watch:css
```

### Migration Progress

- [x] Layout CSS (layout.css) - Migrated to Tailwind
- [ ] Styles CSS (styles.css) - To be migrated
- [ ] Mobile responsive layout - Improved
- [ ] Dark mode - To be implemented with Tailwind

### File Structure

- `css/tailwind.css` - Tailwind directives
- `css/styles.tailwind.css` - Generated Tailwind output
- `css/styles.css` - Original styles (to be migrated)

### Contributing

When contributing to this project, please create a new branch for each CSS file you're migrating to Tailwind.
