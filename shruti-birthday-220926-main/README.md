# 🎂 Somyashree's Birthday Website 💖

<p align="center">
  <strong>A Special Birthday Surprise, Made With Love ❤️</strong>
</p>

<p align="center">
  A beautiful and interactive birthday website created specially for Somyashree.
</p>

---

## 🌸 About The Project

**Somyashree's Birthday Website** is a personalized and interactive birthday celebration website designed to make Somyashree's special day more memorable.

This website combines beautiful animations, romantic visuals, personalized birthday wishes, interactive moments, and custom background music to create a unique digital birthday surprise.

Every section is designed with love, creativity, and attention to detail. 💖

---

## ✨ Features

### 🎂 Interactive Birthday Celebration

A special birthday experience with interactive sections and beautiful visual effects.

### 💌 Personalized Birthday Wishes

A dedicated space for heartfelt birthday messages and special wishes for Somyashree.

### 🎵 Custom Birthday Music

Enjoy a personalized musical experience with custom background music.

* Custom MP3 audio support
* Play / Pause controls
* Volume control
* Loop playback
* Personalized song title
* Romantic ambient music fallback

### 🌹 Premium Romantic Design

A beautiful and elegant interface designed with a romantic visual theme and smooth transitions.

### ✨ Interactive Animations

Beautiful animations and interactive elements that make the birthday experience more engaging.

### 🎶 Sound Effects

Custom sound effects powered by the Web Audio API to enhance the interactive experience.

### 📱 Responsive Design

Designed to provide a beautiful experience on desktop and mobile devices.

---

## 🛠️ Tech Stack

| Technology    | Purpose                 |
| ------------- | ----------------------- |
| React         | User Interface          |
| TypeScript    | Type-safe development   |
| Vite          | Frontend Development    |
| HTML5         | Website Structure       |
| CSS3          | Styling and Animations  |
| Web Audio API | Music and Sound Effects |
| Git & GitHub  | Version Control         |
| Netlify       | Deployment              |

---

## 📂 Project Structure

```text
 Somyashree-Birthday-Website/
│
├── public/
│   └── varron-forever.mp3
│
├── src/
│   ├── components/
│   ├── data/
│   ├── types/
│   ├── utils/
│   │   └── audio.ts
│   │
│   ├── App.tsx
│   ├── audioConfig.ts
│   ├── main.tsx
│   └── index.css
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🎵 Custom Music Configuration

This website supports custom background music.

To add your favorite song, place the MP3 file inside the `public` folder.

### Example

```text
public/
└── varron-forever.mp3
```

Open the audio configuration file:

```text
src/audioConfig.ts
```

Update the song settings:

```ts
export const CUSTOM_AUDIO_CONFIG: CustomAudioSettings = {
  songUrl: "/varron-forever.mp3",

  songTitle: "Varron Forever 🎵",

  defaultVolume: 1.0,

  autoPlayOnFirstClick: true,
};
```

### Audio Features

* Custom song URL or local MP3 file
* Adjustable volume
* Play / Pause functionality
* Loop playback
* Romantic music fallback

> Note: Modern browsers may restrict autoplay until the user interacts with the website.

---

## 🚀 Getting Started

Follow these steps to run the website locally.

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* Git

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
```

### 2. Navigate to the Project

```bash
cd YOUR-REPOSITORY
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

Open the local URL shown in your terminal.

---

## 🏗️ Production Build

To create an optimized production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---

## 🌐 Deployment

This website can be deployed using **Netlify** with GitHub.

### Deployment Steps

1. Push the project to GitHub.
2. Open Netlify.
3. Import your GitHub repository.
4. Configure the build settings.
5. Deploy the website.

### Build Configuration

```text
Build Command: npm run build

Publish Directory: dist
```

After deployment, the birthday website will be accessible through your Netlify live URL.

---

## 🎨 Customization

You can personalize the website by changing:

* 🎂 Birthday person's name
* 💌 Birthday wishes
* 🎵 Background music
* 🌹 Romantic messages
* 📸 Photos and memories
* ✨ Animations
* 💖 Special birthday content

Make the website unique for your special person.

---

## 📸 Website Preview

<p align="center">
  <strong>🎂 A Special Birthday Experience For Somyashree 💖</strong>
</p>

*Add your website screenshots or live preview here.*

---

## 🔮 Future Improvements

* [ ] Add more personalized birthday sections
* [ ] Add photo gallery and memories
* [ ] Add more romantic themes
* [ ] Add additional music options
* [ ] Add more interactive animations
* [ ] Improve mobile experience
* [ ] Add more birthday surprises

---

## 🤝 Contributing

Suggestions and improvements are welcome.

If you have ideas to improve this birthday website, feel free to open an issue or submit a pull request.

---

## 📄 License

This project is created for personal and educational purposes.

Please ensure that you have the necessary rights to distribute any music, images, or third-party assets included in the website.

---

## 💖 Made With Love

<p align="center">
  <strong>Created With ❤️ For Somyashree</strong>
</p>

<p align="center">
  🎂 Happy Birthday, Somyashree! 🎂
</p>

<p align="center">
  <strong>Every Birthday Deserves A Beautiful Surprise. ✨</strong>
</p>

---

### 🔗 Connect With Me

**Developer:** Parag Patel

* LinkedIn: https://www.linkedin.com/in/paragpatel-soc

<p align="center">
  ⭐ If you like this project, consider giving it a star!
</p>
