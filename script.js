const get = (id) => document.getElementById(id);

const input = get("search-input");
const searchBtn = get("search-btn");
const profileContainer = get("profile-container");
const noResults = get("no-results");

const avatar = get("avatar");
const userName = get("userName");
const user = get("user");
const date = get("date");
const bio = get("bio");
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const user_location = get("user_location");
const page = get("page");
const twitter = get("twitter");
const company = get("company");

const root = document.documentElement.style;
const modeText = get("mode-text");
const modeIcon = get("mode-icon");

let darkMode = false;

async function getUserData(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error("User not found");

        const data = await response.json();
        updateProfile(data);
    } catch (error) {
        noResults.classList.remove("hidden");
        profileContainer.classList.add("hidden");
    }
}

function updateProfile(data) {
    noResults.classList.add("hidden");
    profileContainer.classList.remove("hidden");

    avatar.src = data.avatar_url;
    userName.innerText = data.name || "No Name Provided";
    user.href = data.html_url;
    user.innerText = `@${data.login}`;
    date.innerText = `Joined ${new Date(data.created_at).toDateString()}`;
    bio.innerText = data.bio || "No bio available";
    repos.innerText = data.public_repos;
    followers.innerText = data.followers;
    following.innerText = data.following;
    user_location.innerText = data.location || "Not Available";
    page.href = data.blog || "#";
    page.innerText = data.blog ? "Website" : "Not Available";
    twitter.href = data.twitter_username ? `https://twitter.com/${data.twitter_username}` : "#";
    twitter.innerText = data.twitter_username || "Not Available";
    company.innerText = data.company || "Not Available";
}

searchBtn.addEventListener("click", () => {
    if (input.value.trim()) {
        getUserData(input.value.trim());
    }
});

get("theme-toggle").addEventListener("click", () => {
    darkMode = !darkMode;
    if (darkMode) {
        root.setProperty("--lm-bg", "#141D2F");
        root.setProperty("--lm-bg-content", "#1E2A47");
        root.setProperty("--lm-text", "white");
        modeText.innerText = "LIGHT";
        modeIcon.src = "./assets/images/sun-icon.svg";
    } else {
        root.setProperty("--lm-bg", "#f6f8ff");
        root.setProperty("--lm-bg-content", "#fefefe");
        root.setProperty("--lm-text", "#4b6a9b");
        modeText.innerText = "DARK";
        modeIcon.src = "./assets/images/moon-icon.svg";
    }
});
