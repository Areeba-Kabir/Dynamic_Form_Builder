"use client";

import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useFormStore, Question, FormSchema, Option } from "@/store/formStore";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  MenuItem,
  IconButton,
  Paper,
  Switch,
  FormControlLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

const fieldTypes = [
  "text",
  "email",
  "password",
  "textarea",
  "date",
  "datetime",
  "dropdown",
  "checkbox",
  "radio",
  "switch",
  "button",
];

export default function CreateFormPage() {
  const addForm = useFormStore((s) => s.addForm);
  const router = useRouter();

  const [formName, setFormName] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: uuid(),
        label: "",
        name: "",
        type: "text",
        placeholder: "",
        required: false,
        defaultValue: "",
        options: [],
        colSpan: 4,
        section: "",
      },
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
              (
                value === "dropdown" ||
                value === "checkbox" ||
                value === "radio"
              ) ?
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
        q.id === questionId ?
          {
            ...q,
            options: [
              ...(q.options ?? []),
              { id: uuid(), label: "", value: "" },
            ],
          }
        : q,
      ),
    );
  };

  const updateOption = (
    questionId: string,
    optionId: string,
    key: keyof Option,
    value: string,
  ) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId ?
          {
            ...q,
            options: q.options!.map((opt) =>
              opt.id === optionId ? { ...opt, [key]: value } : opt,
            ),
          }
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
      version: 1,
      questions,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addForm(newForm);
    router.push("/forms");
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1000, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
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
          <Paper key={q.id} sx={{ p: 3 }} elevation={3}>
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
                label="Label"
                value={q.label}
                onChange={(e) => updateQuestion(q.id, "label", e.target.value)}
                fullWidth
              />
              <TextField
                label="Name"
                value={q.name}
                onChange={(e) => updateQuestion(q.id, "name", e.target.value)}
                fullWidth
              />
              <TextField
                label="Placeholder"
                value={q.placeholder}
                onChange={(e) =>
                  updateQuestion(q.id, "placeholder", e.target.value)
                }
                fullWidth
              />
              <TextField
                label="Field Name"
                value={q.name}
                onChange={(e) => updateQuestion(q.id, "name", e.target.value)}
                fullWidth
              />

              <TextField
                label="Default Value"
                value={q.defaultValue || ""}
                onChange={(e) =>
                  updateQuestion(q.id, "defaultValue", e.target.value)
                }
                fullWidth
              />
              <TextField
                select
                label="Type"
                value={q.type}
                onChange={(e) => updateQuestion(q.id, "type", e.target.value)}
                fullWidth
              >
                {fieldTypes.map((ft) => (
                  <MenuItem key={ft} value={ft}>
                    {ft}
                  </MenuItem>
                ))}
              </TextField>

              <FormControlLabel
                control={
                  <Switch
                    checked={q.required || false}
                    onChange={(e) =>
                      updateQuestion(q.id, "required", e.target.checked)
                    }
                  />
                }
                label="Required"
              />

              {/* Options for dropdown/checkbox/radio */}
              {(q.type === "dropdown" ||
                q.type === "checkbox" ||
                q.type === "radio") &&
                q.options?.map((opt) => (
                  <Stack key={opt.id} direction="row" spacing={1}>
                    <TextField
                      value={opt.label}
                      onChange={(e) =>
                        updateOption(q.id, opt.id, "label", e.target.value)
                      }
                      placeholder="Option Label"
                      fullWidth
                    />
                    <TextField
                      value={opt.value}
                      onChange={(e) =>
                        updateOption(q.id, opt.id, "value", e.target.value)
                      }
                      placeholder="Option Value"
                      fullWidth
                    />
                    <IconButton
                      onClick={() =>
                        updateQuestion(
                          q.id,
                          "options",
                          q.options!.filter((o) => o.id !== opt.id),
                        )
                      }
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                ))}

              {(q.type === "dropdown" ||
                q.type === "checkbox" ||
                q.type === "radio") && (
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
