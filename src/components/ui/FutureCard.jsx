import React from "react";
import { Box, Typography } from "@mui/material";

const FutureCard = ({ title, description, year, borderColor }) => {
  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(8px)",
        border: `1px solid ${borderColor}`,
        borderRadius: "4px",
        transition: "transform 0.3s ease",
        "&:hover": { transform: "scale(1.02)" },
      }}
    >
      <Typography variant="overline" sx={{ color: borderColor }}>
        YEAR: {year}
      </Typography>
      <Typography
        variant="h6"
        sx={{ color: "#fff", fontFamily: "Orbitron", fontSize: "1rem" }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "rgba(255,255,255,0.7)", mt: 1 }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default FutureCard;
