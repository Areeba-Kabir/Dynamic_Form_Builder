"use client";

import { useFormStore } from "@/store/formStore";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import Link from "next/link";

export default function FormsPage() {
  const { forms, deleteForm } = useFormStore();

  return (
    <Box sx={{ p: 4, maxWidth: 900, mx: "auto" }}>
      {/* Navbar-like header */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        mb={4}
        spacing={{ xs: 2, sm: 0 }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Your Forms
        </Typography>

        <Link href="/forms/create" passHref>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#27425d",
              color: "#fff",
              "&:hover": { bgcolor: "#3a5578" },
            }}
          >
            + Create New Form
          </Button>
        </Link>
      </Stack>

      {/* Forms list */}
      <Stack spacing={2}>
        {forms.length === 0 && (
          <Typography variant="body1" color="text.secondary">
            No forms available. Click "Create New Form" to get started.
          </Typography>
        )}

        {forms.map((form) => (
          <Card
            key={form.id}
            variant="outlined"
            sx={{
              borderRadius: 3,
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              {/* Form name */}
              <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 500 }}>
                {form.name}
                <Typography variant="body2" color="text.secondary">
                  Version: {form.version}
                </Typography>
              </Typography>

              {/* Buttons */}
              <Stack direction="row" spacing={1}>
                <Link href={`/forms/${form.id}/view`} passHref>
                  <Button
                    size="small"
                    variant="outlined"
                    color="info"
                    sx={{ textTransform: "none" }}
                  >
                    View
                  </Button>
                </Link>

                <Link href={`/forms/${form.id}/edit`} passHref>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ textTransform: "none" }}
                  >
                    Edit
                  </Button>
                </Link>

                <Button
                  size="small"
                  color="error"
                  variant="outlined"
                  sx={{ textTransform: "none" }}
                  onClick={() => deleteForm(form.id)}
                >
                  Delete
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
