/* eslint-disable no-unused-vars */
import React, { Suspense, useEffect } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Stars,
  Float,
  PerspectiveCamera,
  Effects,
} from "@react-three/drei";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import useSound from "use-sound";

// Bileşen Importları
import { futuristicTheme } from "./theme";
import AICore from "./components/canvas/AICore";
import CyberGrid from "./components/canvas/CyberGrid";
import Predictor from "./components/ui/Predictor";
import FutureCard from "./components/ui/FutureCard";
import TypewriterText from "./components/ui/TypewriterText";
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
function App() {
  const isMobile = useMediaQuery("(max-width:600px)");

  // Redux Verileri
  const { list } = useSelector((state) => state.predictions);
  const {
    data: aiResponse,
    loading,
    dangerLevel,
  } = useSelector((state) => state.ai);

  // Dinamik Stil Değişkenleri
  const themeColor = dangerLevel === "HIGH" ? "#ff003c" : "#00f2ff";
  const glowColor =
    dangerLevel === "HIGH" ? "rgba(255, 0, 60, 0.6)" : "rgba(0, 242, 255, 0.4)";

  // Ses Efektleri
  const [playScan, { stop: stopScan }] = useSound("/scan.mp3", { volume: 0.5 });
  const [playGlitch] = useSound("/glitch.mp3", { volume: 0.5 });
  const [playSuccess] = useSound("/success.mp3", { volume: 0.4 });

  // Sistem Etkileşim Takibi (Sesler için)
  useEffect(() => {
    if (loading) playScan();
    else stopScan();
  }, [loading, playScan, stopScan]);

  useEffect(() => {
    if (aiResponse) {
      if (dangerLevel === "HIGH") playGlitch();
      else playSuccess();
    }
  }, [aiResponse, dangerLevel, playGlitch, playSuccess]);

  return (
    <ThemeProvider theme={futuristicTheme}>
      <CssBaseline />

      {/* KRİTİK HATA/TEHLİKE ANINDA EKRAN PARAZİTİ */}
      {dangerLevel === "HIGH" && <div className="danger-overlay" />}

      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          bgcolor: "#050505",
          overflowX: "hidden",
          transition: "all 0.5s ease",
          animation:
            dangerLevel === "HIGH"
              ? "glitch-skew 1s infinite linear alternate-reverse"
              : "none",
        }}
      >
        {/* 3D EVREN KATMANI (Fixed pozisyonda, her yerin arkasında) */}
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 0,
          }}
        >
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 2, 8]} />
            <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={4}
              fade
              speed={1}
            />
            <Suspense fallback={null}>
              <Float speed={dangerLevel === "HIGH" ? 10 : 2}>
                <AICore color={themeColor} />
              </Float>
              <CyberGrid speed={loading ? 20 : 1} color={themeColor} />
              <EffectComposer>
                <Bloom
                  intensity={1.5} // Parlama şiddeti
                  luminanceThreshold={0.1} // Hangi parlaklıktaki objelerin parlayacağı (düşük = daha çok parlama)
                  luminanceSmoothing={0.9} // Parlama yumuşaklığı
                  mipmapBlur // Daha sinematik bir görüntü için
                />
                <Noise opacity={0.05} /> // Çok hafif bir retro/teknolojik
                kumlama kumlama
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
                //Köşeleri hafif karartarak odağı merkeze toplar
              </EffectComposer>
            </Suspense>
            <OrbitControls
              enableZoom={false}
              autoRotate
              autoRotateSpeed={dangerLevel === "HIGH" ? 5 : 0.5}
            />
          </Canvas>
        </Box>

        {/* KULLANICI ARAYÜZÜ (3D evrenin üzerinde yüzen katman) */}
        <Container
          maxWidth="lg"
          sx={{ position: "relative", zIndex: 1, py: 5 }}
        >
          {/* LOGO / BAŞLIK */}
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant={isMobile ? "h4" : "h1"}
              sx={{
                fontFamily: "Orbitron",
                fontWeight: 900,
                color: themeColor,
                textShadow: `0 0 30px ${glowColor}`,
                letterSpacing: 5,
              }}
            >
              NEURAL FUTURE
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {/* SOL KOLON: ANALİZ MERKEZİ */}
            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  bgcolor: "rgba(0,0,0,0.6)",
                  p: 3,
                  borderRadius: "10px",
                  border: `1px solid ${themeColor}`,
                  backdropFilter: "blur(10px)",
                }}
              >
                <Predictor />

                <Box
                  sx={{
                    mt: 4,
                    minHeight: "300px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.div
                        key="loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Box sx={{ textAlign: "center" }}>
                          <CircularProgress
                            size={50}
                            sx={{ color: themeColor }}
                          />
                          <Typography
                            sx={{
                              mt: 2,
                              color: themeColor,
                              fontFamily: "monospace",
                            }}
                          >
                            VERİ AYRIŞTIRILIYOR...
                          </Typography>
                        </Box>
                      </motion.div>
                    ) : aiResponse ? (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ width: "100%" }}
                      >
                        <Box
                          sx={{
                            p: 4,
                            bgcolor: "rgba(5,5,5,0.9)",
                            border: `2px solid ${themeColor}`,
                            boxShadow: `0 0 30px ${glowColor}`,
                            position: "relative",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              color: themeColor,
                              mb: 2,
                              fontFamily: "Orbitron",
                            }}
                          >
                            {dangerLevel === "HIGH"
                              ? "⚠️ KRİTİK VERİ ÇIKTISI"
                              : "> ANALİZ RAPORU"}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "1.1rem",
                              color: "#fff",
                              lineHeight: 1.6,
                            }}
                          >
                            <TypewriterText text={aiResponse} />
                          </Typography>
                        </Box>
                      </motion.div>
                    ) : (
                      <Typography
                        sx={{
                          color: themeColor,
                          opacity: 0.4,
                          fontFamily: "monospace",
                        }}
                      >
                        [ SİSTEM TARAMA İÇİN HAZIR ]
                      </Typography>
                    )}
                  </AnimatePresence>
                </Box>
              </Box>
            </Grid>

            {/* SAĞ KOLON: ARŞİVLENMİŞ VERİLER (SABİT PROJEKSİYONLAR) */}
            <Grid item xs={12} md={5}>
              <Box sx={{ background: "transparent" }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: themeColor,
                    mb: 3,
                    fontFamily: "Orbitron",
                    textAlign: "center",
                    textShadow: `0 0 10px ${glowColor}`,
                  }}
                >
                  SABİT PROJEKSİYONLAR
                </Typography>

                <Box
                  sx={{
                    maxHeight: "65vh",
                    overflowY: "auto",
                    pr: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    "&::-webkit-scrollbar": { width: "3px" },
                    "&::-webkit-scrollbar-thumb": { bgcolor: themeColor },
                  }}
                >
                  {list && list.length > 0 ? (
                    list.map((item) => (
                      <FutureCard
                        key={item.id}
                        title={item.title}
                        description={item.desc}
                        year={item.year}
                        borderColor={themeColor} // Kartlar tehlike anında kırmızıya döner
                      />
                    ))
                  ) : (
                    <Typography color="error">
                      Veri akışı sağlanamıyor.
                    </Typography>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
