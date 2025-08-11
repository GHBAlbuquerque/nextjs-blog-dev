# 🌍 The Planet Blog

A visually stunning planet-themed blog built with **Next.js**, **Tailwind CSS**, and **TypeScript**.  
Discover new worlds, galaxies, and cosmic wonders through beautiful images and engaging articles.

## 🚀 Features

- **Dynamic blog posts** with title, excerpt, and publication date
- **Responsive design** optimized for desktop and mobile
- **Dark & light mode** support with smooth gradients
- **Featured post section** with large cover image
- **Reusable components** for Header, Post Cards, and Footer
- **Image-driven layout** to showcase planetary visuals
- **Login icon placeholder** for authentication

## 🛠️ Tech Stack

- **[Next.js](https://nextjs.org/)** – React framework for server-side rendering and static site generation
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS framework for styling
- **[TypeScript](https://www.typescriptlang.org/)** – Type-safe development
- **[clsx](https://github.com/lukeed/clsx)** – Conditional className handling
- **[React Icons](https://react-icons.github.io/react-icons/)** – Icon library for login/profile buttons

## 📂 Project Structure

src/
components/
Header/ # Blog title, subtitle, and login button
PostCard/ # Individual blog post preview
Footer/ # Footer with credits
pages/
index.tsx # Home page listing all posts
styles/ # Global Tailwind styles
public/uploads/ # Blog cover images

## 🖼️ Screenshots

![Screenshot of The Planet Blog](./misc/landing_page.png)

---

## 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/the-planet-blog.git
cd the-planet-blog

# Install dependencies
npm install

# Run the development server
npm run dev

# Then open http://localhost:3000 in your browser.
```

## ⚙️ Database Setup with Drizzle

Make sure you have set up your `drizzleConfig` before proceeding.

### Creating the table

```bash
npc drizzle-kit push
```

### Using migrations

To generate a new migration file:

```bash
npx drizzle-kit generate
```

To apply migrations:

```bash
npx drizzle-kit migrate
```

### Running seeds

To seed the database, run:

```bash
npx tsx src/db/drizzle/seed.ts
```

⸻

## 📜 License

This project is licensed under the MIT License.

⸻

✨ Done by @GHBAlbuquerque
“Discover new worlds and galaxies.”
