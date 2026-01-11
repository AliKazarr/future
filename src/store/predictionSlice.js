import { createSlice } from "@reduxjs/toolkit";

const predictionSlice = createSlice({
  name: "predictions",
  initialState: {
    list: [
      {
        id: 1,
        title: "Biyonik Entegrasyon",
        year: 2030,
        desc: "Yapay zeka çiplerinin beyin-bilgisayar arayüzü ile doğrudan bağlantısı.",
      },
      {
        id: 2,
        title: "Otonom Şehirler",
        year: 2045,
        desc: "Tüm ulaşım ve enerji ağlarının AI tarafından yönetildiği karbon-nötr yaşam alanları.",
      },
    ],
  },
  reducers: {},
});

export default predictionSlice.reducer;
