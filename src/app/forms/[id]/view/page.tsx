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
  MenuItem,
  Switch,
} from "@mui/material";

export default function ViewFormPage() {
  const { id } = useParams();
  const { forms } = useFormStore();

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
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 500 }}>
        {form.name}
      </Typography>

      <Stack spacing={3}>
        {form.questions.map((q, idx) => (
          <Paper key={q.id} elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              {idx + 1}. {q.label} {q.required && "*"}
            </Typography>

            {["text", "email", "password", "textarea"].includes(q.type) && (
              <TextField
                fullWidth
                placeholder={q.placeholder || "Your answer"}
                type={q.type === "textarea" ? "text" : q.type}
                multiline={q.type === "textarea"}
                rows={q.type === "textarea" ? 4 : 1}
                defaultValue={q.defaultValue || ""}
              />
            )}

            {q.type === "date" && (
              <TextField
                fullWidth
                type="date"
                defaultValue={q.defaultValue || ""}
              />
            )}

            {q.type === "datetime" && (
              <TextField
                fullWidth
                type="datetime-local"
                defaultValue={q.defaultValue || ""}
              />
            )}

            {q.type === "dropdown" && (
              <TextField select fullWidth defaultValue={q.defaultValue || ""}>
                {q.options?.map((opt) => (
                  <MenuItem key={opt.id} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            )}

            {q.type === "checkbox" && (
              <Stack spacing={1}>
                {q.options?.map((opt) => (
                  <FormControlLabel
                    key={opt.id}
                    control={<Checkbox />}
                    label={opt.label}
                  />
                ))}
              </Stack>
            )}

            {q.type === "radio" && (
              <RadioGroup>
                {q.options?.map((opt) => (
                  <FormControlLabel
                    key={opt.id}
                    value={opt.value}
                    control={<Radio />}
                    label={opt.label}
                  />
                ))}
              </RadioGroup>
            )}

            {q.type === "switch" && (
              <FormControlLabel
                control={<Switch defaultChecked={q.defaultValue === "true"} />}
                label={q.label}
              />
            )}

            {q.type === "button" && (
              <Button variant="contained" sx={{ mt: 1 }} fullWidth>
                {q.label}
              </Button>
            )}
          </Paper>
        ))}
      </Stack>

      <Button variant="contained" color="primary" sx={{ mt: 4 }} fullWidth>
        Submit
      </Button>
    </Box>
  );
}
