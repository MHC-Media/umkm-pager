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
      // Mengirim action dan payload sebagai query parameters untuk mencegah masalah 302 redirect POST di Google Apps Script
      const queryParams = new URLSearchParams({ action, ...payload });
      const response = await fetch(`${API_CONFIG.BASE_URL}?${queryParams.toString()}`, {
        method: "GET", // Menggunakan GET dengan query string lebih stabil di Apps Script Web App
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("API POST Error:", error);
      return { success: false, message: "Koneksi ke server gagal: " + error.message };
    }
  }

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
