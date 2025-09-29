// URL
export const API_URL = "https://ajax.test-danit.com/api/v2";

// ЛОГІН ТА ПАРОЛЬ
export async function login(email, password) {
  const response = await fetch(`${API_URL}/cards/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Неправильний логін або пароль");
  }

  const token = await response.text(); // API повертає токен як текст
  localStorage.setItem("token", token);
  return token;
}

// вихід
export function logout() {
  localStorage.removeItem("token");
}

// отримати картки
export async function getCards() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/cards`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return await response.json();
}

// створити картку
export async function createCard(cardData) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cardData),
  });
  return await response.json();
}

// видалити картку
export async function deleteCard(id) {
  const token = localStorage.getItem("token");
  await fetch(`${API_URL}/cards/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

// оновити картку
export async function updateCard(id, cardData) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/cards/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cardData),
  });
  return await response.json();
}
