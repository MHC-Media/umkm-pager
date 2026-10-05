/**
 * api.js - Layanan Komunikasi Terpusat ke Backend Google Apps Script
 * UMKM Kelurahan Pager
 */

const API_CONFIG = {
  // Ganti dengan URL Deployment Web App Google Apps Script Anda setelah deploy
  BASE_URL: "https://script.google.com/macros/s/AKfycbyW0QkSMi2heX-OCxdWrdGWkMxLeOUg9fc6wHB6keKp3QAScTAwhM2QH4HRKOOsHCsg/exec"
};

const ApiService = {
  async get(action, params = {}) {
    try {
      const queryParams = new URLSearchParams({ action, ...params });
      const response = await fetch(`${API_CONFIG.BASE_URL}?${queryParams.toString()}`);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("API GET Error:", error);
      return { success: false, message: "Koneksi ke server gagal: " + error.message };
    }
  },

  async post(action, payload = {}) {
    try {
      const response = await fetch(API_CONFIG.BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8", // Mencegah preflight CORS issues di Apps Script
        },
        body: JSON.stringify({ action, ...payload })
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("API POST Error:", error);
      return { success: false, message: "Koneksi ke server gagal: " + error.message };
    }
  },

  getSession() {
    return localStorage.getItem("pager_session_id");
  },

  setSession(sessionId) {
    localStorage.setItem("pager_session_id", sessionId);
  },

  clearSession() {
    localStorage.removeItem("pager_session_id");
    localStorage.removeItem("pager_user");
  }
};
