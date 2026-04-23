Prompt:

"Create a visual prototype for the Mood Tracker application.
Domain Models:
* MoodEntry: id, user_id, mood_level (1-5), note (string), activities (array of strings), created_at.
* User: id, email, name, preferences (object).
* Activity: id, name, icon (lucide-react name).
Business Logic (Use Cases):
* Logging Mood: Users select a mood level (emoji/number) and tag activities (e.g., 'Work', 'Gym', 'Sleep').
* Mood Trends: Displaying a simple visual summary of moods over the last 7 days.
* Filtering: Viewing past entries filtered by mood level (e.g., only 'Amazing' days).
* Real-time Statistics: Automatic calculation of the most frequent activity on 'Happy' days.
User Journey (App Flow):
* Dashboard: A clean overview showing the current day and a prominent 'How are you feeling?' prompt.
* Entry Form: A step-by-step or modal interface: Select Mood -> Select Activities -> Add Note.
* History View: A vertical timeline or grid showing past entries with mood icons and snippets of notes.
* Stats Page: Simple cards showing 'Average Mood' and 'Top Activity'.
* Settings: Toggle for notifications and Theme Switcher (Light/Dark).
Requirements:
1. No Backend: Do not use Supabase yet. Use setTimeout and hardcoded arrays in custom hooks (e.g., useMoods.ts) to mimic data fetching.
2. Components: Create a responsive layout using Card and Button components. Use Lucide-React for mood icons.
3. Styling: Follow the 'Apple Style' (minimalist, high whitespace, soft shadows, glassmorphism for the Header). Use a calming color palette (pastels). Ensure full Dark Mode support.
4. State: Use a Zustand store (useMoodStore.ts) to handle adding new entries and local state.
5. Localization: All text must use a t() function. Add 'uk' and 'en' translations for 'How are you?', 'Add Note', and 'Select Activity'.
6. Layout: Wrap the page in a MainLayout with a functional Bottom Navigation Bar (for mobile feel) and Header.
7. Architecture: Use the @/ alias for all imports as configured in vite.config.ts."
