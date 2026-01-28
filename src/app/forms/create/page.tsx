"use client";

import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useFormStore, Question, FormSchema } from "@/store/formStore";
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
import { useRouter } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";

const questionTypes = [
  { value: "text", label: "Text" },
  { value: "checkbox", label: "Checkbox" },
  { value: "radio", label: "Multiple Choice" },
  { value: "button", label: "Button" },
];

export default function CreateFormPage() {
  const addForm = useFormStore((s) => s.addForm);
  const router = useRouter();

  const [formName, setFormName] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { id: uuid(), label: "", type: "text", options: [] },
    ]);
  };

  const updateQuestion = (id: string, key: keyof Question, value: any) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ?
          {
            ...q,
            [key]: value,
            options:
              value === "checkbox" || value === "radio" ?
                (q.options ?? [])
              : undefined,
          }
        : q,
      ),
    );
  };

  const addOption = (questionId: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId ? { ...q, options: [...(q.options || []), ""] } : q,
      ),
    );
  };

  const updateOption = (questionId: string, index: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId ?
          { ...q, options: q.options!.map((o, i) => (i === index ? value : o)) }
        : q,
      ),
    );
  };

  const removeQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const createForm = () => {
    if (!formName.trim()) {
      alert("Form name cannot be empty!");
      return;
    }
    if (questions.length === 0) {
      alert("Add at least one question!");
      return;
    }

    const newForm: FormSchema = {
      id: uuid(),
      name: formName.trim(),
      questions,
    };

    addForm(newForm);
    router.push("/forms"); // redirect to Forms list
  };

  return (
    <Box sx={{ p: 4, maxWidth: 900, mx: "auto" }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Create Form
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
                {questionTypes.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>

              {/* Options for checkbox/radio */}
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
        <Button variant="contained" color="primary" onClick={createForm}>
          Create Form
        </Button>
      </Stack>
    </Box>
  );
}
