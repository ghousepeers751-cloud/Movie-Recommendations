# CineMatic: AI-Powered Movie Recommendations

---

## 1. System Design

### Architecture Overview
- **Frontend Framework:** Next.js (React)
- **Styling:** Tailwind CSS with ShadCN UI components
- **Generative AI:** Google's Gemini models via Genkit
- **Deployment:** Serverless infrastructure

### Core Components
- **Next.js App Router:** For routing and server-side rendering (SSR).
- **React Server Components (RSC):** To handle data fetching and logic on the server.
- **Genkit Flows:** Server-side functions that interact with the Gemini Large Language Model (LLM) to get movie recommendations.
- **Static JSON Database:** A simple `movies.json` file acts as the local movie database.
- **Admin Panel:** A separate section of the app for managing application data.

---

## 2. Implementation Details

### AI Recommendation Engine
- The user enters a text description of the movie they want to watch into a form.
- This prompt is sent to a Genkit flow (`recommend-from-text.ts`).
- The Genkit flow calls the Gemini LLM with a structured prompt, requesting movie recommendations in a specific JSON format.
- The LLM returns a list of movies, including title, description, poster URL, and other metadata.
- The frontend displays these recommendations as interactive movie cards.

### Local Movie Database
- A page at `/movies` displays a list of movies from the local `src/data/movies.json` file.
- This allows for a browsable library of curated films.
- A client-side search feature allows users to filter movies by title.

### Admin Functionality
- **Paste Movie Data (`/admin/paste-movies`):** Allows an admin to directly edit the content of `movies.json`.
- **Augment Movie Details (`/admin/augment-movie`):** A GenAI-powered tool that takes a movie title and reviews, and generates a one-sentence summary.

---

## 3. Result & Analysis

### Key Outcomes
- A fully functional web application that provides personalized movie recommendations.
- A user-friendly interface built with modern, responsive components.
- Successful integration of a Large Language Model (Gemini) to power the core feature.
- A simple but effective local database for displaying a curated movie list.

### Analysis
- The use of Genkit simplifies the interaction with the LLM, allowing for structured inputs and outputs.
- The separation of the AI recommendations and the local movie database allows for two distinct ways for users to discover content.
- The admin panel provides a basic but essential way to manage the app's data without needing to directly edit code.

---

## 4. Application (Screenshots/Features)

*(You can take screenshots of these pages for your slides)*

- **Homepage:** Features a hero image, the main recommendation form, and the grid of AI-generated movie recommendations.
- **Movie DB Page:** Shows the grid of movies from the local `movies.json` file, with a search bar for filtering.
- **Movie Cards:** Displays the movie poster, title, description, and buttons to watch a trailer or find more info.
- **Trailer Player:** A modal window that embeds a YouTube or Dailymotion player to watch a movie trailer.
- **Admin Panel:** A dashboard with links to the data management tools.

---

## 5. Limitations

- **Static Database:** The `movies.json` file is static and requires manual updates through the admin panel. It is not a scalable, real-time database.
- **No User Accounts:** The application does not support user profiles, watchlists, or personalized history. Recommendations are session-based.
- **Simple AI Prompts:** The AI recommendation prompt is straightforward. It doesn't consider user history or fine-grained preferences.
- **Video Player:** The trailer player only supports YouTube and Dailymotion. Other video sources require code changes.

---

## 6. Future Scope

- **Integrate a Real-Time Database:** Replace the `movies.json` file with a cloud database like Firestore to allow for dynamic data, user-generated content, and more complex queries.
- **User Authentication:** Add user sign-up and login to enable personalized features like saved watchlists, recommendation history, and ratings.
- **Advanced AI Recommendations:**
    - Implement a "similar movies" feature.
    - Fine-tune the recommendation model based on user ratings and feedback.
    - Use user history to provide more personalized suggestions over time.
- **Expand Content:** Add support for TV shows, documentaries, and other forms of media.
- **Enhanced Admin Tools:** Build more robust tools for managing a larger dataset, including bulk uploads and editing.

---

## 7. Conclusion

CineMatic successfully demonstrates the power of integrating Generative AI into a modern web application. Using Next.js and Genkit, we were able to quickly build a user-friendly movie recommendation engine that provides a dynamic and engaging user experience. While the current implementation has limitations, it establishes a strong foundation that can be expanded with more advanced features like real-time data, user personalization, and more sophisticated AI capabilities.

---

## 8. References

- **Next.js:** [https://nextjs.org/](https://nextjs.org/)
- **React:** [https://react.dev/](https://react.dev/)
- **Tailwind CSS:** [https://tailwindcss.com/](https://tailwindcss.com/)
- **ShadCN UI:** [https://ui.shadcn.com/](https://ui.shadcn.com/)
- **Genkit (for Google AI):** [https://firebase.google.com/docs/genkit](https://firebase.google.com/docs/genkit)
- **Lucide Icons:** [https://lucide.dev/](https://lucide.dev/)
