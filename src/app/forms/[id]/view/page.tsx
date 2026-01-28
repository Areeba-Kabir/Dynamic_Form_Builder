"use client";

import { useParams } from "next/navigation";
import { useFormStore } from "@/store/formStore";
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Stack,
  Button,
  Paper,
} from "@mui/material";

export default function ViewFormPage() {
  const { id } = useParams();
  const { forms } = useFormStore();

  // Find the form by id
  const form = forms.find((f) => f.id === id);

  if (!form) {
    return (
      <Box sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
        <Typography variant="h5" color="error">
          Form not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
      {/* Form Title */}
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 500 }}>
        {form.name}
      </Typography>

      <Stack spacing={3}>
        {form.questions.map((q, idx) => (
          <Paper key={q.id} elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            {/* Question Label */}
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              {idx + 1}. {q.label}
            </Typography>

            {/* Render input based on type */}
            {q.type === "text" && (
              <TextField fullWidth placeholder="Your answer" />
            )}

            {q.type === "checkbox" && (
              <Stack spacing={1}>
                {q.options?.map((opt, i) => (
                  <FormControlLabel
                    key={i}
                    control={<Checkbox />}
                    label={opt}
                  />
                ))}
              </Stack>
            )}

            {q.type === "radio" && (
              <RadioGroup>
                {q.options?.map((opt, i) => (
                  <FormControlLabel
                    key={i}
                    value={opt}
                    control={<Radio />}
                    label={opt}
                  />
                ))}
              </RadioGroup>
            )}

            {q.type === "button" && (
              <Button variant="contained" sx={{ mt: 1 }} fullWidth>
                {q.label}
              </Button>
            )}
          </Paper>
        ))}
      </Stack>

      {/* Submit button at the bottom like Google Forms */}
      <Button variant="contained" color="primary" sx={{ mt: 4 }} fullWidth>
        Submit
      </Button>
    </Box>
  );
}
