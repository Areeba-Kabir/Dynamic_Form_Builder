"use client";

import { Box, Typography, Button, Stack } from "@mui/material";
import Link from "next/link";

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#27425d",
        p: 3,
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          color: "#27425d",
          bgcolor: "#ffffff",
          p: 6,
          borderRadius: 4,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          maxWidth: 600,
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
          Welcome to Dynamic Form Builder
        </Typography>

        <Typography variant="body1" sx={{ mb: 4, fontSize: 18 }}>
          Easily create and manage your custom forms with dynamic question
          types. Get started by visiting your forms dashboard.
        </Typography>

        <Stack direction="row" justifyContent="center">
          <Link href="/forms" passHref>
            <Button
              variant="contained"
              sx={{
                color: "#ffffff",
                bgcolor: "#27425d",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                "&:hover": { bgcolor: "#e0e0e0" },
              }}
            >
              Go to Forms
            </Button>
          </Link>
        </Stack>
      </Box>
    </Box>
  );
}
