import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { fetchAIPrediction } from "../../store/aiSlice";

const Predictor = () => {
  const [topic, setTopic] = useState("");
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.ai);

  return (
    <Box
      sx={{
        mt: 10,
        p: 4,
        borderRadius: 2,
        bgcolor: "background.paper",
        borderLeft: "4px solid #bc13fe",
      }}
    >
      <Typography variant="h4" mb={2}>
        AI Kehanet Motoru
      </Typography>
      <TextField
        fullWidth
        label="Bir teknoloji alanı girin (örn: Nanoteknoloji)"
        variant="outlined"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        onClick={() => dispatch(fetchAIPrediction(topic))}
        disabled={loading}
        sx={{ background: "linear-gradient(45deg, #00f2ff, #bc13fe)" }}
      >
        {loading ? <CircularProgress size={24} /> : "Geleceği Analiz Et"}
      </Button>

      {data && (
        <Typography sx={{ mt: 3, fontStyle: "italic", color: "#00f2ff" }}>
          " {data} "
        </Typography>
      )}
    </Box>
  );
};
export default Predictor;
