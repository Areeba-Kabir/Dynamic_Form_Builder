"use client";

import { useFormStore, Question, FormSchema } from "@/store/formStore";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  MenuItem,
  IconButton,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import DeleteIcon from "@mui/icons-material/Delete";

const questionTypes = [
  { value: "text", label: "Text" },
  { value: "checkbox", label: "Checkbox" },
  { value: "radio", label: "Multiple Choice" },
  { value: "button", label: "Button" },
];

export default function EditFormPage() {
  const { id } = useParams();
  const router = useRouter();
  const { forms, updateForm } = useFormStore();

  const form = forms.find((f) => f.id === id);

  const [formName, setFormName] = useState(form?.name || "");
  const [questions, setQuestions] = useState<Question[]>(form?.questions || []);

  if (!form) return <Typography>Form not found</Typography>;

  // Add new question
  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { id: uuid(), label: "", type: "text", options: [] },
    ]);
  };

  // Update question fields
  const updateQuestion = (id: string, key: string, value: any) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ?
          {
            ...q,
            [key]: value,
            options:
              q.type === "checkbox" || q.type === "radio" ?
                (q.options ?? [])
              : undefined,
          }
        : q,
      ),
    );
  };

  // Add option for checkbox/radio
  const addOption = (questionId: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId ? { ...q, options: [...(q.options || []), ""] } : q,
      ),
    );
  };

  // Update option text
  const updateOption = (questionId: string, index: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId ?
          {
            ...q,
            options: q.options!.map((opt, i) => (i === index ? value : opt)),
          }
        : q,
      ),
    );
  };

  // Remove question
  const removeQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleUpdate = () => {
    if (!formName.trim()) {
      alert("Form name cannot be empty!");
      return;
    }
    if (questions.length === 0) {
      alert("Add at least one question!");
      return;
    }

    const updatedForm: FormSchema = {
      ...form,
      name: formName.trim(),
      questions,
    };

    updateForm(updatedForm);
    router.push("/forms");
  };

  return (
    <Box sx={{ p: 4, maxWidth: 900, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Edit Form
      </Typography>

      <TextField
        label="Form Name"
        value={formName}
        onChange={(e) => setFormName(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      />

      <Stack spacing={2}>
        {questions.map((q, idx) => (
          <Paper key={q.id} sx={{ p: 2 }} elevation={2}>
            <Stack spacing={1}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle1">Question {idx + 1}</Typography>
                <IconButton onClick={() => removeQuestion(q.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Stack>

              <TextField
                label="Question Label"
                value={q.label}
                onChange={(e) => updateQuestion(q.id, "label", e.target.value)}
                fullWidth
              />

              <TextField
                select
                label="Type"
                value={q.type}
                onChange={(e) => updateQuestion(q.id, "type", e.target.value)}
                fullWidth
              >
                {questionTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              {(q.type === "checkbox" || q.type === "radio") &&
                q.options?.map((opt, i) => (
                  <Stack key={i} direction="row" spacing={1}>
                    <TextField
                      value={opt}
                      onChange={(e) => updateOption(q.id, i, e.target.value)}
                      fullWidth
                      placeholder="Option text"
                    />
                    <IconButton
                      onClick={() =>
                        updateQuestion(
                          q.id,
                          "options",
                          q.options!.filter((_, idx) => idx !== i),
                        )
                      }
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                ))}

              {(q.type === "checkbox" || q.type === "radio") && (
                <Button size="small" onClick={() => addOption(q.id)}>
                  + Add Option
                </Button>
              )}
            </Stack>
          </Paper>
        ))}
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button variant="outlined" onClick={addQuestion}>
          + Add Question
        </Button>
        <Button variant="contained" onClick={handleUpdate}>
          Update Form
        </Button>
      </Stack>
    </Box>
  );
}
