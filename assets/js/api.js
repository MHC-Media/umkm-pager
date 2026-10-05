/**
 * api.js - Layanan Komunikasi Terpusat ke Backend Google Apps Script
 * UMKM Kelurahan Pager
 */

const API_CONFIG = {
  // Ganti dengan URL Deployment Web App Google Apps Script Anda yang terbaru
  BASE_URL: "https://script.google.com/macros/s/AKfycbxQ_WOKVSJcgvHdbIbqr7c15kdvhTfF2VSgL83_jzEdxbUVv3M07BwjW_qdGCtWUZeC/exec"
};

const ApiService = {
  /**
   * Melakukan request GET ke backend Apps Script
   */
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

  /**
   * Melakukan request POST ke backend Apps Script 
   * (Menggunakan URLSearchParams agar aman dari kendala 302 Redirect Google Apps Script)
   */
  async post(action, payload = {}) {
    try {
      const queryParams = new URLSearchParams({ action, ...payload });
      const response = await fetch(`${API_CONFIG.BASE_URL}?${queryParams.toString()}`, {
        method: "GET",
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("API POST Error:", error);
      return { success: false, message: "Koneksi ke server gagal: " + error.message };
    }
  },

  /**
   * Mengambil Session ID yang tersimpan di localStorage
   */
  getSession() {
    return localStorage.getItem("pager_session_id");
  },

  /**
   * Menyimpan Session ID ke localStorage
   */
  setSession(sessionId) {
    localStorage.setItem("pager_session_id", sessionId);
  },

  /**
   * Menghapus sesi lokal (Logout)
   */
  clearSession() {
    localStorage.removeItem("pager_session_id");
    localStorage.removeItem("pager_user");
  }
};
