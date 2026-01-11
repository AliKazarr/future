/*import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const fetchAIPrediction = createAsyncThunk(
  "ai/fetchPrediction",
  async (topic, { rejectWithValue }) => {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        return rejectWithValue("API anahtarı bulunamadı.");
      }

      const genAI = new GoogleGenerativeAI(apiKey);

      // ÇÖZÜM: 'gemini-1.5-flash' yerine en stabil 'gemini-pro' kullanıyoruz.
      // Bu model her API anahtarı ile %100 çalışır.
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `Sen 2077 yılından gelen fütürist bir kahinsin. 
      "${topic}" konusunun 2050 yılındaki geleceğini 3-4 cümleyle, 
      teknik terimler kullanarak ve etkileyici bir dille anlat.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Sistem Hatası:", error);
      return rejectWithValue(
        "Bağlantı kurulamadı. Lütfen internetinizi veya API anahtarınızı kontrol edin."
      );
    }
  }
);

const aiSlice = createSlice({
  name: "ai",
  initialState: { data: "", loading: false, error: null },
  reducers: {
    resetAI: (state) => {
      state.data = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAIPrediction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAIPrediction.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAIPrediction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAI } = aiSlice.actions;
export default aiSlice.reducer; */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * fetchAIPrediction:
 * Bu thunk, girilen kelimeyi analiz eder ve simüle edilmiş bir gelecek senaryosu döner.
 * Türkiye'deki bölgesel API kısıtlamalarından etkilenmemesi için Mock-Data yapısı kullanılmıştır.
 */
export const fetchAIPrediction = createAsyncThunk(
  "ai/fetchPrediction",
  async (topic) => {
    // Gerçekçi bir 'bağlantı kuruluyor' hissi için 2 saniye bekleme
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const lowerTopic = topic.toLowerCase();

    // 1. Kritik Tehlike Analizi (Glitch ve Kırmızı Tema Tetikleyici)
    const dangerWords = [
      "savaş",
      "nükleer",
      "virüs",
      "salgın",
      "kaos",
      "kıyamet",
      "çöküş",
      "istila",
      "silah",
      "ölüm",
      "isyan",
      "felaket",
    ];

    const isDangerous = dangerWords.some((word) => lowerTopic.includes(word));

    // 2. Senaryo Veritabanı
    const scenarios = {
      nanoteknoloji:
        "2050'de nanobotlar kan dolaşımında devriye gezerek hastalıkları anında yok edecek. Madde sentezleyiciler sayesinde üretim maliyeti sıfıra inecek.",
      yapayzeka:
        "Yapay Genel Zeka (AGI), insan bilinciyle senkronize olup 'Neural-Cloud' ağını başlatacak. Fiziksel bedenler, dijital zihinlerin sadece birer taşıyıcısı olacak.",
      uzay: "Mars kolonileri ilk bağımsızlık bildirisini yayınlayacak. Jüpiter'in uydusu Europa'da ilk okyanus altı şehirleri kurulmaya başlanacak.",
      ekonomi:
        "Blockchain tabanlı kuantum para birimleri, fiziksel parayı tamamen silecek. İnsanların sosyal kredi skorları yeni evrensel para birimi olacak.",
      robotik:
        "Biyo-sentetik robotlar toplumsal rollerin %80'ini üstlenecek. İnsanlık, sadece sanat ve felsefe ile uğraştığı 'Büyük Boşluk' dönemine girecek.",
      DEFAULT: `${topic.toUpperCase()} alanındaki kuantum sıçraması, 2050 yılı itibariyle bildiğimiz gerçekliği temelden sarsacak. Yeni dünya düzeni bu teknoloji üzerine inşa edilecek.`,
    };

    // İlgili senaryoyu bulma
    const matchedKey =
      Object.keys(scenarios).find((k) => lowerTopic.includes(k)) || "DEFAULT";

    // 3. Çıktı Paketi
    return {
      text: scenarios[matchedKey],
      dangerLevel: isDangerous ? "HIGH" : "LOW",
      timestamp: new Date().toLocaleTimeString(),
    };
  }
);

const aiSlice = createSlice({
  name: "ai",
  initialState: {
    data: "", // AI'dan gelen metin
    loading: false, // Yüklenme durumu (Grid hızını etkiler)
    error: null, // Hata mesajı
    dangerLevel: "LOW", // Görsel temayı ve glitch efektini belirler
    lastUpdate: null, // Sistem logu için zaman damgası
  },
  reducers: {
    // Sistemi resetlemek için (Örn: Yeni arama yaparken)
    resetAI: (state) => {
      state.data = "";
      state.loading = false;
      state.error = null;
      state.dangerLevel = "LOW";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAIPrediction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = ""; // Eski veriyi temizle
      })
      .addCase(fetchAIPrediction.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.text;
        state.dangerLevel = action.payload.dangerLevel;
        state.lastUpdate = action.payload.timestamp;
      })
      // eslint-disable-next-line no-unused-vars
      .addCase(fetchAIPrediction.rejected, (state, action) => {
        state.loading = false;
        state.error = "NÖRAL BAĞLANTI HATASI: Veri akışı kesildi.";
      });
  },
});

export const { resetAI } = aiSlice.actions;
export default aiSlice.reducer;
