
async function fetchProfileData() {
    const url = 'https://raw.githubusercontent.com/Artur-Brasileiro/Portfolio/refs/heads/main/data/profile.json';
    const fetcing = await fetch(url);
    return await fetcing.json();
}